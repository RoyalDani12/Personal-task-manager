import Joi from 'joi'

export const forgotSchema = Joi.object({
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