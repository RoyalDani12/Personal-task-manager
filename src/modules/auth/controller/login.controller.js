import expressAsyncHandler from "express-async-handler";
import loginUseCase from '../../../core/use-case/login.usecase.js'
import { userRepository } from "../../../infrastructure/repositories/user.repository.js";
import { generateAccessToken,generateRefreshToken,verifyToken } from "../../../shared/utils/jwt.js";
import bcrypt from 'bcrypt'

const loginController = expressAsyncHandler( async(req,res)=>{
   
  const result = await loginUseCase(req.body,userRepository)

  // generate accesstoken
  const accessToken = generateAccessToken({
    id:result._id,
    role:result.role,
    email:result.email
  })

  //  genrate refreshtoken 
  const refreshToken = generateRefreshToken({
    id:result._id,
    role:result.role,
    email:result.email
  })


   // save rfrshe toekn to the cookie
   res.cookie('refreshToken',refreshToken,{
    httpOnly:true,
    sameSite:"strict",
    secure:process.env.NODE_ENV ==='production',
    maxAge:7*24*60*60*1000 
   })
   //   hash  refresh token  
   const hashedToken = await bcrypt.hash(refreshToken,10)
     // save refresh token to the database 
     await userRepository.saveRefreshToken(result._id,hashedToken)


  res.status(201).json({
    sucess:true,
    message:'Login Successfully',
    data:result,
    accessToken
  })
})

export default loginController