import crypto from "crypto"
// import sendEmail from "../../../shared/utils/send.email.js"
import sendEmail from "../../../infrastructure/services/email.service.js"
export const forgotPassUseCase =async(userRepository,email)=>{
   const user = await userRepository.findUserByEmail(email)
   if(!user){
      const error = new Error("Invalid email Please check you email again")
      error.statusCode = 404
      throw error
   }
      // prepare token

   const resetPassToken =  crypto.randomBytes(20).toString('hex')
    user.resetPasswordToken = crypto.createHash('sha256').update(resetPassToken).digest('hex')
    user.resetPasswordExpires = Date.now() + 3600000

    await user.save()
    //  prepare email
    const resetUrl = `http://localhost:5173/reset-pass?token=${resetPassToken}`

const htmlContent = `<div>
    <h1>Hello Daniel</h1>
    <h3>Press the link and reset your email. If you didn't ask to reset, ignore and delete this email.</h3>
    <p>Reset link: <a href="${resetUrl}">${resetUrl}</a></p>
</div>`


   await sendEmail({
    email: user.email,
    // email title
    subject: "Password Reset Request",
    html: htmlContent,
    message: `Reset link: ${resetUrl}`, // Fallback
  });

  return true; 
}