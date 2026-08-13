import { Link, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, User, BookOpen } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="topbar">
      <div className="brand">
        <Link to="/" className="brand-link">
          <BookOpen className="brand-icon" size={28} />
          <div>
            <h1>SleekBlog</h1>
            <p>Share your ideas with the world.</p>
          </div>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Feed
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            <Link to="/profile" className="nav-link">
              <User size={18} />
              <span>Profile</span>
            </Link>
            <div className="auth-actions">
              <span>Logged in as {user.name}</span>
              <button className="button secondary logout-btn" onClick={handleLogoutClick}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </>
        ) : (
          <div className="auth-actions">
            <Link to="/login" className="button secondary">
              Login
            </Link>
            <Link to="/register" className="button">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
