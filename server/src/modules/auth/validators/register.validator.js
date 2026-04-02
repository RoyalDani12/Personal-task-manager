import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().trim().required().min(3).messages({
    "string.empty": "name is required",
    "string.min": " please correct Name",
  }),
  email: Joi.string().trim().lowercase().required().email().messages({
    "string.empty": "Email is required",
    "string.email": "Enter a valid Email Please ?",
  }),
  phone: Joi.string()
    .trim()
    .required()
    .pattern(/^\+?[0-9]{10,15}/)
    .messages({
      "string.empty": "Phone Number is required",
      "string.base.pattern": "Please Enter Valid Phone Number",
    }),
  password: Joi.string()
    .trim()
    .min(8)
    .required()
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[@#$%&*?]/)
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":
        " at least one special character , uppercase ,lowercase and Digits",
      "string.min": "Password must be at least 8 characters",
    }),
  confirmPassword: Joi.string()
    .trim()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Confirm Password is required",
      "any.only": "Password Is Not Match",
    }),
}).options({
  abortEarly: true,
  //  allowUnknown:false,
  //  stripUnknown:true
});

export const registerValidator = (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        errors: error.details.map((err) => err.message),
      });
    }

    req.body = value; // clean data or sanitized
    next();
  } catch (error) {
    console.log(error);
  }
};
