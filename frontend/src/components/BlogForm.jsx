import { useState, useEffect } from "react";

const CATEGORIES = ["General", "Technology", "Lifestyle", "Travel", "Business", "Food"];

export default function BlogForm({ blog, onSubmit, onCancel, error }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setContent(blog.content || "");
      setCategory(blog.category || "General");
    }
  }, [blog]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, content, category });
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
          required
        />
      </label>
      <label>
        Category
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="form-select"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>
      <label>
        Content
        <textarea
          value={content}
          rows="6"
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your post content here"
          required
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

