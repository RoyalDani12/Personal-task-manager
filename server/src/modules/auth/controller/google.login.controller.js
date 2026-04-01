import { response } from "express";
import googleLoginUseCase from "../../../core/use-case/google.login.usecase.js";

import expressAsyncHandler from "express-async-handler";
import { userRepository } from "../../../infrastructure/repositories/user.repository.js";
import { generateAccessToken,generateRefreshToken } from "../../../shared/utils/jwt.js";

const googleLoginController = expressAsyncHandler(async(req,res)=>{

const user = await googleLoginUseCase(userRepository,req.body)

const accessToken = generateAccessToken({
  id:user._id,
  email:user.email
})

const  refreshToken = generateRefreshToken({
  id:user._id,
  email:user.email
})

// save refresh token to the cookie
 res.cookie("refreshToken",refreshToken,{
  httpOnly:true,
  maxAge:7 * 24 * 60 * 60 * 1000,
  sameSite:"strict",
  secure:process.env.NODE_ENV === "production",

 })
 res.status(200).json({
  success:true,
  message:"login successfully",
  accessToken,
  user
 })
})

export default googleLoginController