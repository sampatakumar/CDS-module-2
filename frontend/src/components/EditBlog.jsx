import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../api";
import BlogForm from "./BlogForm";

export default function EditBlog({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");

  useEffect(() => {
    loadBlog();
  }, [id, token]);

  const loadBlog = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getBlogById(id, token);
      setBlog(data);
    } catch (err) {
      setError(err.message || "Failed to load blog post details");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (form) => {
    setUpdateError("");
    try {
      await updateBlog(id, form, token);
      navigate("/dashboard");
    } catch (err) {
      setUpdateError(err.message || "Failed to update blog post");
    }
  };

  if (loading) {
    return <div className="card empty">Loading post data...</div>;
  }

  if (error) {
    return <div className="flash error">{error}</div>;
  }

  return (
    <BlogForm
      blog={blog}
      onSubmit={handleUpdate}
      onCancel={() => navigate("/dashboard")}
      error={updateError}
    />
  );
}
