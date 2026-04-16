import Joi from 'joi';

const resetSchema = Joi.object({
  password: Joi.string()
    .trim()
    .required()
    .min(8)
    .max(30)
    .pattern(/[a-z]/)
    .pattern(/[A-Z]/)
    .pattern(/[0-9]/)
    .pattern(/[!@#$%&*?]/)
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password is too short (min: 8).",
      "string.pattern.base": "Password must contain: Uppercase, Lowercase, Digit, and Special Character",
    }),
  
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      "any.only": "Passwords do not match",
      "string.empty": "Confirm password is required"
    })
});

export const resetPasswordValidator = (req, res, next) => {
  const { error } = resetSchema.validate(req.body, { 
    abortEarly: false,
    allowUnknown: true 
  });

  if (error) {
    
    const errorMessages = error.details.map((detail) => detail.message);
    
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: errorMessages
    });
  }

  next();
};