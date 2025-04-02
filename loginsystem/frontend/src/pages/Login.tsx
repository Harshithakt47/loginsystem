
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css"; // Importing CSS for styling

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // State for handling errors
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error before submitting

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);

      if (response.status === 200) {
        console.log(response.data.user, 'response.data.user');
        
        const token = response.data.token; // Assuming token is returned in response
        const user = response.data.user._id; // Assuming token is returned in response
        localStorage.setItem("authToken", token); // Save token in local storage
        localStorage.setItem("user", user); // Save token in local storage

        alert("Login successful!");
        navigate("/homepage"); // Redirect to homepage after login (make sure this matches App.tsx)
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password!");
      } else if (error.response && error.response.status === 404) {
        setError("User does not exist! Please Signup.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        {error && <p className="error-message">{error}</p>} {/* Show error if any */}
        
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button onClick={() => navigate("/signup")}>Signup</button></p>
    </div>
  );
};

export default Login;
///////////////
