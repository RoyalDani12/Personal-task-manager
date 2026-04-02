import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .alphanum()
    .lowercase()
    .min(4)
    .max(30)
    .invalid("admin", "root", "support")
    // this  are reserved words
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name is too short",
      "string.max": "Name too long",
      "any.invalid": " Name is reserved can not be used",
    }),

  email: Joi.string().trim().email().required().lowercase().messages({
    "string.empty": "Email required",
    "string.email": "Invalid email",
  }),

  password: Joi.string()
    .trim()
    .required()
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[@#$%&*?]/)
    .messages({
      "string.pattern.base":
        "The password at list contain one Uppercase ,Lowercase,Digits and Special Character",
      "string.empty": "Password is required",
    }),
  confirmPassword: Joi.string()
    .trim()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "string.empty": "Confirm Password",
      "any.only": "Password Don't Match",
      "any.required": "Please confirm the Password",
    }),
  phone: Joi.string()
    .trim()
    .required()
    .pattern(/^\+?[0-9]{7,15}$/)
    .messages({
      "string.empty": "phone is required",
      "string.pattern.base": "PLease enter valid phone number",
    }),
});
