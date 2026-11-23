
const { body, validationResult } = require("express-validator");

// Task validation rules
const taskValidationRules = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Task title is required"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),

    body("status")
        .optional()
        .isIn(["Pending", "In Progress", "Completed"])
        .withMessage("Invalid task status"),

    body("dueDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid due date")
];

// Validate task input
const validateTask = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array()
        });
    }

    next();
};

// Export middleware
module.exports = {
    taskValidationRules,
    validateTask
};
