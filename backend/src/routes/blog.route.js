const express = require("express");

const {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog
} = require("../controllers/blog.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

// Public routes
router.get("/", getBlogs);

router.get("/:id", getBlog);

// Protected routes
router.post("/", protect, createBlog);

router.put("/:id", protect, updateBlog);

router.delete("/:id", protect, deleteBlog);

module.exports = router;