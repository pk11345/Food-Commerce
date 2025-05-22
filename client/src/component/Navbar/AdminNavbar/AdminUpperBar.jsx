import axios from "axios";
import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as ReactToast from "react-toastify";
import img from "../../../lib/images/ubereats.png";
import profile from "../../../lib/images/Profile.png";
import { useAuth } from "../../../lib/context/AuthContext";

function AdminUpperBar() {
  const { setToken } = useAuth();
  const navigate = ReactRouter.useNavigate();
  const [username, setUsername] = React.useState("");
  const [image, setImage] = React.useState(null);
  const { user } = useAuth();

  const handleClick = () => {
    navigate(`/admin-update-profile/${user.id}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    navigate("/login"); // Redirect to home page
  };
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-gray-800 p-2 rounded-full">
          <img src={img} alt="Admin Logo" className="h-10 w-auto" />
        </div>
      </div>
      <div className="flex items-center mr-5">
        <span
          onClick={handleClick}
          className="hover:underline cursor-pointer text-lg mx-3 text-white font-semibold"
        >
          User Profile
        </span>
        <div className="flex items-center text-white">
          {user.image !== null ? (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${user.image}`}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <img src={profile} className="w-12 h-12 rounded-full" />
          )}
          <h2 className="text-lg mx-3">{username}</h2>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 ml-3 text-white font-semibold py-2 px-4 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminUpperBar;
