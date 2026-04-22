import { verifyToken } from "../utils/jwt.js";

const  authMiddleware =(roles =[])=>{

  return(req,res,next)=>{

    try {

      const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
          const error = new Error('No token provided')
          error.statusCode =401
          throw error
        }

          const token = authHeader.split(' ')[1]
          const decoded = verifyToken(token)
          req.user = decoded

        if(roles.length && !roles.includes(decoded.role)){
          const error = new Error("Not authorized ? authorization dined")
          error.statusCode=403
          throw error
        }

      next()
    } catch (err) {

      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ 
          success: false, 
          message: "Token expired", 
          code: "TOKEN_EXPIRED" 
        });
      }
     next(err) 
    }
  }
}

export default authMiddleware