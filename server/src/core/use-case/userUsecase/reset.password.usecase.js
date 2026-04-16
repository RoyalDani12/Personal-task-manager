import bcrypt from "bcrypt";
import crypto from 'crypto'
export const resetPassUseCase = async (userRepository, password, token) => {
  if (!password || !token) {
    const error = new Error("Required filed missing");
    error.statusCode = 400;
    throw error;
  }
  // check the token expire or not
  // find user by token
   const  hashToken =  crypto.createHash('sha256').update(token).digest("hex")
  const user = await userRepository.findUserByResetToken(hashToken);

  if (!user) {
    const error = new Error("token expired or Invalid ");
    error.statusCode = 401; // unAuthorized
    throw error;
  }

  if (Date.now() > user.resetPasswordExpires) {
    const error = new Error("Token expired");
    error.statusCode = 401;
    throw error;
  }

  // if the token is not expire update the password filed
  // has the password
  const hashedPass =  await bcrypt.hash(password, 10);
  await userRepository.resetPasswordAndClearToken(hashToken, hashedPass);

  return {
    success: true,
    message: "Password updated successfully",
  };
};
