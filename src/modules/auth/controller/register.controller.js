import expressAsyncHandler from "express-async-handler";
import registerUseCase from '../../../core/use-case/register.usecase.js'
import { userRepository } from "../../../infrastructure/repositories/user.repository.js";

const registerController = expressAsyncHandler( async(req ,res)=>{
  const result = await registerUseCase(req.body,userRepository)

  res.status(201).json({
    success:true,
    message:"User register Succefully",
    data:result
  })

})


export default registerController