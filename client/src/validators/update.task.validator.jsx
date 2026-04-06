import Joi from "joi";

// Security rule to detect HTML tags
const htmlRule = /<[^>]*>/;

export const updateTaskValidation = Joi.object({
  title: Joi.string()
    .trim()
    .required()
    .max(100)
    .min(3)
    .custom((value, helpers) => {
      if (htmlRule.test(value)) {
        return helpers.message("SECURITY ALERT: HTML tags are prohibited in the title");
      }
      return value;
    })
    .messages({
      "string.empty": "Title cannot be empty",
      "string.min": "Title must be at least 3 characters",
      "any.required": "Title is required for update",
    }),

  description: Joi.string()
    .trim()
    .max(500)
    .allow("")
    .custom((value, helpers) => {
      if (htmlRule.test(value)) {
        return helpers.message("SECURITY ALERT: HTML tags are prohibited in the description");
      }
      return value;
    })
    .messages({
      "string.max": "Description must be under 500 characters",
    }),

  priority: Joi.string()
    .valid("low", "medium", "high")
    .required(),

  difficultyLevel: Joi.string()
    .valid("easy", "medium", "hard")
    .required(),

  required_time: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.min": "Required time must be at least 1 minute",
      "any.required": "Required time is missing",
    }),

  startedDate: Joi.date()
    .iso()
    .required()
    .messages({
      "date.format": "Invalid start date format",
      "any.required": "Start date is required",
    }),

  dueDate: Joi.date()
    .iso()
    .min(Joi.ref("startedDate"))
    .required()
    .messages({
      "date.min": "Due date cannot be earlier than the start date",
      "any.required": "Due date is required",
    }),
});