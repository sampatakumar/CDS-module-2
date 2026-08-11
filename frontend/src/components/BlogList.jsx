export default function BlogList({ blogs, onEdit, onDelete, isOwner }) {
  if (!blogs?.length) {
    return <div className="card empty">No blogs available yet.</div>;
  }

  return (
    <div className="blog-grid">
      {blogs.map((blog) => (
        <article key={blog._id} className="card blog-card">
          <div className="blog-header">
            <h3>{blog.title}</h3>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
          <p>{blog.content}</p>
          <div className="blog-meta">
            <small>By {blog.author?.name || blog.author?.email || "Unknown"}</small>
          </div>
          {isOwner(blog) && (
            <div className="blog-actions">
              <button onClick={() => onEdit(blog)} className="button small">
                Edit
              </button>
              <button onClick={() => onDelete(blog)} className="button small secondary">
                Delete
              </button>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
