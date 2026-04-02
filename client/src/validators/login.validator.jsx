import Joi from 'joi'

 export const  loginSchema = Joi.object({
  email:Joi.string()
           .trim()
           .required()
           .email()
           .lowercase()
           .messages({
           "string.empty":"Email is required",
           "string.email":"Invalid Email"
      
    }),

  password:Joi.string()
           .trim()
           .required()
           .min(8)
           .pattern(/[A-Z]/)
           .pattern(/[a-z]/)
           .pattern(/[0-9]/)
           .pattern(/[@#$%&*?!]/)
           .messages({
            "string.min":"The password is too short",
            "string.empty":"The password is required",
            "string.pattern.base":"the Password must contain Uppercase ,Lowercase,Digit and Special Characters"

           })
})

