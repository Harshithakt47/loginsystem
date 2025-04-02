
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/homepage.css";  // Assuming you still have your original CSS file

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header with only Profile aligned to the right */}
      <header style={{ display: "flex", justifyContent: "flex-end", padding: "10px 20px", backgroundColor: "#296" }}>
        <button onClick={() => navigate("/profile")} style={{ padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
          Profile
        </button>
      </header>

      {/* Homepage content */}
      <div className="homepage-content" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
        <h1>Welcome to the Homepage</h1>
        <div className="card-container" style={{ maxWidth: "400px", margin: "20px auto", padding: "15px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <button onClick={() => navigate("/form")} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Click here to open the form
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
