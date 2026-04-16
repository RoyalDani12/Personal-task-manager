import Joi from 'joi'

export const forgotSchema = Join.object({
   email:Joi.string()
   .trim()
   .email()
   .required()
   .lowercase()
   .messages({
    "string.email":"Please Enter A valid Email ?",
    "string.empty":"Email is required.",
   })
   
})