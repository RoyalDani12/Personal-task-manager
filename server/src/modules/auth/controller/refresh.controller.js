import expressAsyncHandler from "express-async-handler"
import { generateAccessToken,verifyToken } from "../../../shared/utils/jwt.js"

const refreshController = expressAsyncHandler( async(req,res)=>{
   //check refresh token to the request
   //verify the refresh token
   // generate new accesstoken

   const refreshToken = req.cookies.refreshToken


   if(!refreshToken){
    const error = new Error("No refresh token provided")
    error.statusCode=404
    throw error
   }

   let decoded
   try {
    decoded =  verifyToken(refreshToken)
   } catch (err) {
    const error = new Error('Invali refresh token')
    error.statusCode= 403
    throw error
   }


   //generat accesstoken
   const accessToken = generateAccessToken({
    id:decoded.id,
    email:decoded.email,
    role:decoded.role
   })
   res.status(200).json({
    success:true,
    message:"Access token refreshed",
    accessToken
   })
})

export default refreshController