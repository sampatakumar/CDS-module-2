import { useEffect, useState } from "react";
import {
  registerUser,
  loginUser,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} from "./api";
import AuthForm from "./components/AuthForm";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import "./App.css";

const initialUser = () => {
  const saved = localStorage.getItem("auth_user");
  return saved ? JSON.parse(saved) : null;
};

export default function App() {
  const [user, setUser] = useState(initialUser);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [view, setView] = useState("list");
  const [error, setError] = useState("");

  const token = user?.token;
  const userId = user?.id;

  useEffect(() => {
    loadBlogs();
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [user]);

  const loadBlogs = async () => {
    try {
      const blogsData = await getBlogs(token);
      setBlogs(blogsData);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (form) => {
    setError("");
    try {
      const data = await registerUser(form);
      setUser({ token: data.token, id: data.user.id, email: data.user.email, name: data.user.name });
      setView("list");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (form) => {
    setError("");
    try {
      const data = await loginUser(form);
      setUser({ token: data.token, id: data.user.id, email: data.user.email, name: data.user.name });
      setView("list");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView("list");
    setSelectedBlog(null);
    setError("");
  };

  const handleCreate = async (form) => {
    setError("");
    try {
      await createBlog(form, token);
      setView("list");
      setSelectedBlog(null);
      await loadBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (form) => {
    if (!selectedBlog) return;
    setError("");
    try {
      await updateBlog(selectedBlog._id, form, token);
      setView("list");
      setSelectedBlog(null);
      await loadBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (blog) => {
    setError("");
    try {
      await deleteBlog(blog._id, token);
      await loadBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  const isOwner = (blog) => blog.author?._id === userId;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>Blog API UI</h1>
          <p>Manage posts, register users, and call the backend securely.</p>
        </div>
        <div className="auth-actions">
          {user ? (
            <>
              <span>Logged in as {user.name}</span>
              <button className="button secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="button" onClick={() => setView("login")}>Login</button>
              <button className="button secondary" onClick={() => setView("register")}>Register</button>
            </>
          )}
        </div>
      </header>

      <main>
        {error && <div className="flash error">{error}</div>}

        {!user && view === "login" && (
          <AuthForm onSubmit={handleLogin} submitLabel="Login" error={error} />
        )}

        {!user && view === "register" && (
          <AuthForm onSubmit={handleRegister} submitLabel="Register" error={error} />
        )}

        {user && view === "create" && (
          <BlogForm onSubmit={handleCreate} onCancel={() => setView("list")} error={error} />
        )}

        {user && view === "edit" && selectedBlog && (
          <BlogForm
            blog={selectedBlog}
            onSubmit={handleUpdate}
            onCancel={() => {
              setSelectedBlog(null);
              setView("list");
            }}
            error={error}
          />
        )}

        <section className="content-panel">
          <div className="panel-header">
            <div>
              <h2>All Blog Posts</h2>
              <p>Browse public posts and manage your own when logged in.</p>
            </div>
            {user && (
              <button className="button" onClick={() => setView("create")}>New Post</button>
            )}
          </div>

          <BlogList blogs={blogs} onEdit={(blog) => { setSelectedBlog(blog); setView("edit"); }} onDelete={handleDelete} isOwner={isOwner} />
        </section>
      </main>
    </div>
  );
}
