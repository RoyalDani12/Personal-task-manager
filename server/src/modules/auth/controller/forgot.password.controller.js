import { userRepository } from "../../../infrastructure/repositories/user.repository.js"
import { forgotPassUseCase } from "../../../core/use-case/userUsecase/forgot.pass.usecase.js"
import expressAsyncHandler from "express-async-handler"
export const  forgotPassController= expressAsyncHandler( async(req,res)=>{
     const { email } = req.body
    const response = await forgotPassUseCase(userRepository,email)
    res.status(201).json({
      message:"The reset link sent successfully please check your email and processed to reset",
      statusCode:201,
      success:true,
      response
    })

})