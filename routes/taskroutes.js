
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const {
    taskValidationRules,
    validateTask
} = require("../validators/taskvalidators");

const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskcontroller");

// Create Task
router.post(
    "/",
    authMiddleware,
    taskValidationRules,
    validateTask,
    createTask
);

// Get All Tasks
router.get("/", authMiddleware, getAllTasks);

// Get Single Task
router.get("/:id", authMiddleware, getTaskById);

// Update Task
router.put(
    "/:id",
    authMiddleware,
    taskValidationRules,
    validateTask,
    updateTask
);

// Delete Task
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
