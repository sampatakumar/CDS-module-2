import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBlogs, deleteBlog } from "../api";
import BlogList from "./BlogList";
import { Plus, Settings, User as UserIcon, Calendar, BookOpen } from "lucide-react";

export default function Dashboard({ user, token, onLoadBlogs }) {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadMyBlogs();
  }, [token]);

  const loadMyBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch only blogs written by this user
      const data = await getBlogs(token, "", "", user.id);
      setMyBlogs(data);
    } catch (err) {
      setError(err.message || "Failed to load dashboard posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blog) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deleteBlog(blog._id, token);
      loadMyBlogs();
      if (onLoadBlogs) onLoadBlogs(); // refresh public feeds as well
    } catch (err) {
      setError(err.message || "Failed to delete post");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-card card">
        <div className="user-profile-summary">
          <div className="avatar-placeholder">
            <UserIcon size={40} />
          </div>
          <div className="user-details">
            <h2>Welcome to your Dashboard, {user.name}!</h2>
            <p className="user-email">{user.email}</p>
            <div className="profile-meta-badges">
              <span className="profile-badge">
                <BookOpen size={14} />
                {myBlogs.length} {myBlogs.length === 1 ? "Post" : "Posts"}
              </span>
              <span className="profile-badge">
                <Calendar size={14} />
                Author Account
              </span>
            </div>
          </div>
        </div>
        <div className="dashboard-quick-actions">
          <Link to="/create" className="button dashboard-create-btn">
            <Plus size={18} />
            <span>New Post</span>
          </Link>
          <Link to="/profile" className="button secondary">
            <Settings size={16} />
            <span>Profile Details</span>
          </Link>
        </div>
      </div>

      <section className="content-panel dashboard-panel">
        <div className="panel-header">
          <div>
            <h2>My Blog Posts</h2>
            <p>Manage, edit, or delete the articles you have published.</p>
          </div>
        </div>

        {error && <div className="flash error">{error}</div>}

        {loading ? (
          <div className="card empty">Loading your articles...</div>
        ) : (
          <BlogList
            blogs={myBlogs}
            onEdit={(blog) => navigate(`/edit/${blog._id}`)}
            onDelete={handleDelete}
            isOwner={() => true} // Since it's user's own dashboard, they own all displayed blogs
          />
        )}
      </section>
    </div>
  );
}
