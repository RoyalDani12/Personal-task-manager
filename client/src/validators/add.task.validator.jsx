import Joi, { required } from "joi";

// simple rule to detect the hml tags
const htmlRule = /<[^>]*>/;
export const addTaskValidatorSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required()
    .max(100)
    .min(3)
    .custom((value, helpers) => {
      if (htmlRule.test(value)) {
        return helpers.message(
          "SECURITY ALERT : HTML tags are strictly prohibited",
        );
      }
      return value;
    })
    .messages({
      "string.empty": "Title is required",
      "string.min": "Title is too short (min 3 characters) ",
      "any.required": "Title is  a mandatory field",
    }),

  description: Joi.string()
    .trim()
    .max(500)
    .allow("")
    .custom((value, helpers) => {
      if (htmlRule.test(value)) {
        return helpers.message(
          "SECURITY ALERT :HTML tags are strictly prohibited",
        );
      }
      return value;
    })
    .messages({
      "string.max": "Description must be under 500 characters.",
    }),

  priority: Joi.string().valid("low", "medium", "high").default("medium"),

  difficultyLevel: Joi.string()
    .valid("easy", "medium", "hard")
    .default("medium"),

  required_time: Joi.number().integer().min(1).required().messages({
    "number.min": "Task must require at least one minute effort.",
    "any.required": "Required time is missing.",
  }),

  startedDate: Joi.date().iso().required().messages({
    "date.base": "Invalid start date Format.",
    "date.format": "Please use the YYYY-MM-DD date format.",
    "any.required": "Start date is required.",
  }),

  dueDate: Joi.date().iso().min(Joi.ref("startedDate")).required().messages({
    "date.base": "Due date cannot be earlier that the start date.",
    "any.required": "Due date is required.",
    "date.min": "Due date cannot be earlier than the start date.",
    "date.format": "Please use the YYYY-MM-DD date format.",
  }),
});
