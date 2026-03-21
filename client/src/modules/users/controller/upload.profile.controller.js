 import { userRepository } from "../../../infrastructure/repositories/user.repository.js";
 import uploadProfileUseCase from "../../../core/use-case/userUsecase/update.profile.usecase.js";
import expressAsyncHandler from "express-async-handler"

const updateProfileController = expressAsyncHandler(async (req,res,next)=>{

  try {

    const userId = req.user.id;

    let profileData = {
      ...req.body
    }

    // only add avatar if image exists
    if(req.file){
      const avatarPath = `/uploads/${req.file.filename}`
      profileData.avatar = avatarPath
    }

    const updateProfile = await uploadProfileUseCase(
      userId,
      profileData,
      userRepository
    )

    res.status(200).json({
      success:true,
      message:"Profile updated successfully",
      data:updateProfile
    })

  } catch (error) {
    next(error)
  }

})

export default updateProfileController