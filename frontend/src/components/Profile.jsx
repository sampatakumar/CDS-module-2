import { useState, useEffect } from "react";
import { getUserProfile } from "../api";
import { User, Mail, ShieldAlert, Key, Calendar } from "lucide-react";

export default function Profile({ token }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, [token]);

  const loadProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getUserProfile(token);
      setProfile(data);
    } catch (err) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="card empty">Loading profile details...</div>;
  }

  if (error) {
    return <div className="flash error">{error}</div>;
  }

  return (
    <div className="profile-container form">
      <h2>My Account Profile</h2>
      <p style={{ color: "var(--text)", marginBottom: "20px" }}>
        Your personal credentials and account metadata.
      </p>

      <div className="profile-details-card">
        <div className="detail-item">
          <div className="detail-icon">
            <User size={18} />
          </div>
          <div className="detail-content">
            <span className="detail-label">Full Name</span>
            <span className="detail-value">{profile?.name}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <Mail size={18} />
          </div>
          <div className="detail-content">
            <span className="detail-label">Email Address</span>
            <span className="detail-value">{profile?.email}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <Key size={18} />
          </div>
          <div className="detail-content">
            <span className="detail-label">Account Identification</span>
            <span className="detail-value mono">{profile?._id}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <ShieldAlert size={18} />
          </div>
          <div className="detail-content">
            <span className="detail-label">Authentication Method</span>
            <span className="detail-value">JSON Web Token (Secure JWT)</span>
          </div>
        </div>
      </div>
      
      <div className="profile-info-banner">
        <p>
          Need to change your password or security details? Contact your system administrator or database management utility.
        </p>
      </div>
    </div>
  );
}
