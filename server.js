
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authroutes = require("./routes/authroutes");
const taskRoutes = require("./routes/taskroutes");
const errorMiddleware = require("./middleware/errormiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

// 1. Middleware
app.use(cors({
    origin: process.env.CLIENT_ORIGIN
}));

app.use(express.json());

// 2. Request Logger
app.use((req, res, next) => {
    console.log("Request received:", req.method, req.url);
    next();
});

// 3. Authentication Routes
app.use("/api/auth", authroutes);

// 4. Task Route Debugging
app.use("/api/tasks", (req, res, next) => {
    console.log("TASK ROUTE REACHED");
    next();
});

// 5. Task Routes
app.use("/api/tasks", taskRoutes);

// 6. Home API
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Task Management API!");
});

// 7. Global Error Handler
app.use(errorMiddleware);

// 8. Handle Invalid Routes
app.use((req, res) => {
    return res.status(404).json({
        message: "Route not found"
    });
});

// 9. Start Server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
