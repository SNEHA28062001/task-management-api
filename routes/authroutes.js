
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const { registerUser, loginUser } = require("../controllers/authcontroller");

// Test route
router.get("/test", (req, res) => {
    res.status(200).json({
        message: "Auth route is working!"
    });
});

// Registration route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Protected route
router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Protected route accessed successfully",
        user: req.user
    });
});

module.exports = router;
