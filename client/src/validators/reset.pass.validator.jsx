import Joi, { ref } from 'joi'

export const resetPassSchema = Joi.object({
  password:Joi.string()
  .trim()
  .pattern(/[a-z]/)
  .pattern(/[A-Z]/)
  .pattern(/[0-9]/)
  .pattern(/[@#$%&*?!]/)
  .min(8)
  .max(30)
  .required()
  .messages(
    {
   "string.empty":"Password is required",
   "string.min":"The password is too short (min 8 ).",
   "string.max":"the password is too long .",
   "string.pattern.base":"the password must contain at least letters , digits and special characters"
    }
  ),
  confirmPassword:Joi.string()
  .required()
  .trim()
  .valid(Joi.ref('password'))
  .messages({
    "string.empty":"Please confirm password",
    "any.only":"Password Don't Match"
  })
})