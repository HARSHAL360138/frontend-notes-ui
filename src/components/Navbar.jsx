import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between fixed top-0 left-0 right-0">
      <div className="font-bold text-lg">NoteApp</div>
      <div>
        {!token ? (
          <>
            <Link className="mx-2" to="/login">
              Login
            </Link>
            <Link className="mx-2" to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="mx-2 font-medium"> {user?.fname || ""}</span>
            <button className="mx-2 bg-red-500 px-2 rounded hover:bg-red-600 pb-1 " onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
