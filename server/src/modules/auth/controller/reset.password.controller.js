import expressAsyncHandler from "express-async-handler";
import { userRepository } from "../../../infrastructure/repositories/user.repository.js";
import { resetPassUseCase } from "../../../core/use-case/userUsecase/reset.password.usecase.js";

export const resetPassController = expressAsyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { token }  = req.params
  const response = await resetPassUseCase(
    userRepository,
    password,
    token,
   // don't needed but for remember
  );

  res.status(200).json({
    success:true,
    message:"Password reset successfully",
    response
  });
});
