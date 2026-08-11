const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./src/db/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home/Test route
app.get("/", (req, res) => {
    res.json({
        message: "Blog API is running successfully"
    });
});

// Authentication routes
app.use("/api/auth", require("./src/routes/auth.route"));

// Blog routes
app.use("/api/blogs", require("./src/routes/blog.route"));

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Server port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});