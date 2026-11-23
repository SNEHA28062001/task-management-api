
const Task = require("../models/task");
const mongoose = require("mongoose");

// 1. Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            dueDate,
            user: req.user.id
        });

        return res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Task validation failed",
                error: error.message
            });
        }

        return res.status(500).json({
            message: "Failed to create task",
            error: error.message
        });
    }
};

// 2. Get all tasks with pagination, filtering, sorting and search
const getAllTasks = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 5));
        const skip = (page - 1) * limit;

        // Base filter
        const filter = {
            user: req.user.id
        };

        // Status filtering
        const status = req.query.status;
        console.log("STATUS RECEIVED:", status);

        if (status) {
            if (!["Pending", "In Progress", "Completed"].includes(status)) {
                return res.status(400).json({
                    message: "Invalid task status"
                });
            }

            filter.status = status;
        }

        // Search by title
        const search = req.query.search;

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        // Sorting
        const sort = req.query.sort || "newest";
        console.log("SORT RECEIVED:", sort);

        const sortOptions = {
            newest: { createdAt: -1 },
            oldest: { createdAt: 1 },
            dueDate: { dueDate: 1 }
        };

        if (!Object.prototype.hasOwnProperty.call(sortOptions, sort)) {
            return res.status(400).json({
                message: "Invalid sorting option"
            });
        }

        const totalTasks = await Task.countDocuments(filter);

        const tasks = await Task.find(filter)
            .sort(sortOptions[sort])
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            message: "Tasks retrieved successfully",
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks,
            tasks
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve tasks",
            error: error.message
        });
    }
};

// 3. Get a single task
const getTaskById = async (req, res) => {
    try {
        // Validate task ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task retrieved successfully",
            task
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve task",
            error: error.message
        });
    }
};

// 4. Update a task
const updateTask = async (req, res) => {
    try {
        // Validate task ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const { title, description, status, dueDate } = req.body;

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            {
                title,
                description,
                status,
                dueDate
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Task validation failed",
                error: error.message
            });
        }

        return res.status(500).json({
            message: "Failed to update task",
            error: error.message
        });
    }
};

// 5. Delete a task
const deleteTask = async (req, res) => {
    try {
        // Validate task ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete task",
            error: error.message
        });
    }
};

// Export all functions
module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
