const Blog = require("../models/blog.model");

// Create a new blog post
const createBlog = async (req, res) => {
    try {
        const { title, content, category } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const blog = await Blog.create({
            title,
            content,
            author: req.user.id,
            category: category || "General"
        });

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Get all blog posts
const getBlogs = async (req, res) => {
    try {
        const { search, category, author } = req.query;
        let query = {};

        if (category && category !== "All") {
            query.category = category;
        }

        if (author) {
            query.author = author;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ];
        }

        const blogs = await Blog.find(query)
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json(blogs);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Get a single blog post by ID
const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate(
            "author",
            "name email"
        );

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Update a blog post by ID
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to update this blog"
            });
        }

        const { title, content, category } = req.body;

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.category = category || blog.category;

        await blog.save();

        res.json(blog);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Delete a blog post by ID
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this blog"
            });
        }

        await Blog.deleteOne({ _id: blog._id });

        res.json({
            message: "Blog deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog
};
