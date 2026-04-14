// forgot.validator.js
import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().trim().email().required().lowercase().messages({
    "string.email": "Invalid email",
    "string.empty": "Email is required"
  })
});

// Create a middleware function
export const forgotValidator = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next(); // If valid, move to the controller
};