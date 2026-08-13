import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs, deleteBlog } from "../api";
import BlogList from "./BlogList";
import { Search, Filter, RefreshCw } from "lucide-react";

const CATEGORIES = ["All", "General", "Technology", "Lifestyle", "Travel", "Business", "Food"];

export default function Feed({ user, token }) {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBlogs();
  }, [category, token]);

  const loadBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getBlogs(token, search, category);
      setBlogs(data);
    } catch (err) {
      setError(err.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadBlogs();
  };

  const handleDelete = async (blog) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deleteBlog(blog._id, token);
      loadBlogs();
    } catch (err) {
      setError(err.message || "Failed to delete post");
    }
  };

  const isOwner = (blog) => {
    if (!user) return false;
    return blog.author?._id === user.id || blog.author === user.id;
  };

  return (
    <div className="feed-container">
      <div className="feed-controls card">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search posts by title or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <button type="submit" className="button">
            Search
          </button>
        </form>

        <div className="category-filters-wrapper">
          <div className="filter-title">
            <Filter size={14} />
            <span>Filter by Category:</span>
          </div>
          <div className="category-badges">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`category-badge-btn ${category === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="content-panel">
        <div className="panel-header">
          <div>
            <h2>All Blog Posts</h2>
            <p>Browse public posts and manage your own when logged in.</p>
          </div>
          <button
            onClick={loadBlogs}
            className="button secondary icon-btn"
            title="Refresh Feed"
            disabled={loading}
          >
            <RefreshCw size={14} className={loading ? "spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>

        {error && <div className="flash error">{error}</div>}

        {loading ? (
          <div className="card empty">Loading articles...</div>
        ) : (
          <BlogList
            blogs={blogs}
            onEdit={(blog) => navigate(`/edit/${blog._id}`)}
            onDelete={handleDelete}
            isOwner={isOwner}
          />
        )}
      </section>
    </div>
  );
}
