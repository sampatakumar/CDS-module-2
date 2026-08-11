import { useState, useEffect } from "react";

export default function BlogForm({ blog, onSubmit, onCancel, error }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setContent(blog.content || "");
    }
  }, [blog]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{blog ? "Edit Blog" : "Create Blog"}</h2>
      <label>
        Title
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Blog title"
        />
      </label>
      <label>
        Content
        <textarea
          value={content}
          rows="6"
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your post content here"
        />
      </label>
      {error && <div className="form-error">{error}</div>}
      <div className="form-actions">
        <button type="submit" className="button">
          {blog ? "Save" : "Publish"}
        </button>
        <button type="button" className="button secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
