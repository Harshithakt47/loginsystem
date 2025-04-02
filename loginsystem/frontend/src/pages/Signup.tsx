

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/signup.css"; // Importing CSS for styling

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    gender: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // State for handling errors
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error before submitting

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      
      if (response.status === 201) {
        alert("Signup successful! Please login.");
        navigate("/"); // Redirect to login after signup
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setError("Username already exists! Please choose another.");
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
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
        
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/")}>Login</button>
      </p>
    </div>
  );
};

export default Signup;
