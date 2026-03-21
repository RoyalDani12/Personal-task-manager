import jwt from 'jsonwebtoken'


// accessToken
export const generateAccessToken =(payload)=>{
  return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"15m"})
}
 
//refresh token
export const generateRefreshToken =(payload)=>{
  return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"7d"})
}


// verify token
export const verifyToken =(token)=>{
  return jwt.verify(token,process.env.SECRET_KEY)
}