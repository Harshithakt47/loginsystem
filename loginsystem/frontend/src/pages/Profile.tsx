



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed
import "../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("user");
      console.log(user, "token"); // Logs the stored token

      // Call the backend API to change the password
      const response = await axios.put("http://localhost:5000/api/auth/change-password", {
        oldPassword: currentPassword,
        newPassword: newPassword,
        userId: user,
      });

      if (response.status === 200) {
        alert("Password reset successful!");
        setCurrentPassword(""); // Clear current password field
        setNewPassword(""); // Clear new password field
        setConfirmPassword(""); // Clear confirm password field
      } else {
        alert("Error resetting password: " + response.data.msg);
      }
    } catch (error) {
      alert("Error while changing password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Example: remove auth token
    alert("Logged out successfully!");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>
      <form onSubmit={handlePasswordReset}>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>

        {/* Button container for alignment */}
        <div className="button-container">
          <button type="submit" className="reset">
            Reset Password
          </button>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
