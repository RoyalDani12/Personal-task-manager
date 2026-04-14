import expressAsyncHandler from "express-async-handler";
import { generateAccessToken, verifyToken } from "../../../shared/utils/jwt.js";
import crypto from "crypto";
import { userRepository } from "../../../infrastructure/repositories/user.repository.js";

const refreshController = expressAsyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    const error = new Error("No refresh token provided");
    error.statusCode = 404;
    throw error;
  }

  let decoded;
  try {
    decoded = verifyToken(refreshToken);
  } catch (err) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 403;
    throw error;
  }

  // check the data base if the user is real and refresh token
  const user = await userRepository.findUserById(decoded.id);

  if (!user || !user.refreshToken) {
    const error = new Error("User is not found or token revoked");
    error.statusCode = 403;
    throw error;
  }

  // 3. Compare SHA-256 Hashes
 const incomingTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  if(incomingTokenHash !== user.refreshToken){
   const error = new Error('Invalid token session')
   error.statusCode = 403;
    throw error;
  }
  // 4. Generate new Access Token
  const accessToken = generateAccessToken({
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  });
  res.status(200).json({
    success: true,
    message: "Access token refreshed",
    accessToken,
  });
});

export default refreshController;
