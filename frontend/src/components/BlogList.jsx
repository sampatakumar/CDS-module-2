import { Edit2, Trash2 } from "lucide-react";

export default function BlogList({ blogs, onEdit, onDelete, isOwner }) {
  if (!blogs?.length) {
    return <div className="card empty">No blogs available yet.</div>;
  }

  return (
    <div className="blog-grid">
      {blogs.map((blog) => (
        <article key={blog._id} className="card blog-card">
          <div className="blog-card-top">
            <span className="category-badge">{blog.category || "General"}</span>
            <span className="blog-date">{new Date(blog.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</span>
          </div>
          
          <div className="blog-header">
            <h3>{blog.title}</h3>
          </div>
          
          <p className="blog-content-text">{blog.content}</p>
          
          <div className="blog-footer">
            <div className="blog-meta">
              <small>By <span className="author-name">{blog.author?.name || blog.author?.email || "Unknown"}</span></small>
            </div>
            
            {isOwner(blog) && (
              <div className="blog-actions">
                <button onClick={() => onEdit(blog)} className="button small icon-btn" title="Edit Post">
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
                <button onClick={() => onDelete(blog)} className="button small secondary icon-btn" title="Delete Post">
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

