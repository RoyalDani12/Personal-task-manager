import Joi from "joi"

const loginSchema = Joi.object({
  email:Joi.string()
         .trim()
         .email()
         .required()
         .messages({
          "string.email":" Invalid Email ",
          "string.empty":"Email is required"
         }),
  password:Joi.string()
             .trim()
             .min(8)
             .required()
             .pattern(/[A-Z]/)
             .pattern(/[a-z]/)
             .pattern(/[0-9]/)
             .pattern(/[@#$%&*?]/)
             .messages({
              "string.empty":"Password is required",
              "string.pattern.base":" at least one special character , uppercase ,lowercase and Digits",
              "string.min":"Password must be at least 8 characters"
             })
})

export const loginValidator =(req,res,next)=>{
  try {
       const { error ,value } = loginSchema.validate(req.body)
       if(error){
              res.status(400).json({
                     errors:error.details.map(err=>err.message)
              })
              return
       }
       req.body = value // return sanitized data 
       next()
  } catch (error) {
      console.log(error) 
  }
  
}