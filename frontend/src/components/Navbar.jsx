import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <div className="navbar">
      <Link to="/" style={{ marginRight: "10px" }}>Dashboard</Link>
      <Link to="/customers" style={{ marginRight: "10px" }}>Customers</Link>
      {user && (
        <span style={{ float: "right" }}>
          {user.name} |
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </span>
      )}
      </div>
    </nav>
  );
}

export default Navbar;