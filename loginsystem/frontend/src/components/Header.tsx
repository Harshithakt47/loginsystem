
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <nav>
        
        <button onClick={() => navigate("/profile")}>Profile</button>
        {/* Other buttons can go here */}
        
      </nav>
    </header>
  );
};

export default Header;
