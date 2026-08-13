import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../api";
import BlogForm from "./BlogForm";

export default function CreateBlog({ token }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleCreate = async (form) => {
    setError("");
    try {
      await createBlog(form, token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to create blog post");
    }
  };

  return (
    <BlogForm
      onSubmit={handleCreate}
      onCancel={() => navigate("/dashboard")}
      error={error}
    />
  );
}
