import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "./api";
import AuthForm from "./components/AuthForm";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import CreateBlog from "./components/CreateBlog";
import EditBlog from "./components/EditBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const initialUser = () => {
  const saved = localStorage.getItem("auth_user");
  return saved ? JSON.parse(saved) : null;
};

export default function App() {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="app-shell">
        <Navbar user={user} onLogout={handleLogout} />

        <main>
          <Routes>
            {/* Public Feed */}
            <Route path="/" element={<Feed user={user} token={user?.token} />} />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <LoginWrapper onLoginSuccess={handleLoginSuccess} />
                )
              }
            />
            <Route
              path="/register"
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <RegisterWrapper onLoginSuccess={handleLoginSuccess} />
                )
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard user={user} token={user?.token} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <Profile token={user?.token} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute user={user}>
                  <CreateBlog token={user?.token} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute user={user}>
                  <EditBlog token={user?.token} />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function LoginWrapper({ onLoginSuccess }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (form) => {
    setError("");
    try {
      const data = await loginUser(form);
      onLoginSuccess({
        token: data.token,
        id: data.user.id,
        email: data.user.email,
        name: data.user.name
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return <AuthForm onSubmit={handleLoginSubmit} submitLabel="Login" error={error} />;
}

function RegisterWrapper({ onLoginSuccess }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterSubmit = async (form) => {
    setError("");
    try {
      const data = await registerUser(form);
      onLoginSuccess({
        token: data.token,
        id: data.user.id,
        email: data.user.email,
        name: data.user.name
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return <AuthForm onSubmit={handleRegisterSubmit} submitLabel="Register" error={error} />;
}
