import axios from "axios";
import * as React from "react";
import * as ReactToast from "react-toastify";
import * as Router from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";

export default function UserProfile() {
  const { setUser, setToken, user } = useAuth();

  const [data, setData] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const navigate = Router.useNavigate();
  const userId = Router.useParams();

  React.useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile/userInfo/${
            userId.id
          }`
        );
        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        ReactToast.toast.error(
          error.response?.data?.message || "Unable to connect to the database"
        );
      }
    })();
  }, [userId.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    const sequlize = {
      ...data,
    };
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/update-profile/`,
        {
          payload: { ...sequlize, id: userId.id },
          image: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.data) {
        setUser(response.data.data);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        ReactToast.toast.success("Profile is Update");
        if (response.data.data.role === "admin") {
          setTimeout(() => {
            navigate("/adminhome");
          }, 2000);
        } else if (response.data.data.role === "superadmin") {
          setTimeout(() => {
            navigate("/adminhome");
          }, 2000);
        } else {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPassword = (e) => {
    e && e.preventDefault();
    user.role !== "user"
      ? navigate(`/admin-reset-password/${userId.id}`)
      : navigate(`/reset-password/${userId.id}`);
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Update Profile</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-lg space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={(data && data.username) || ""}
            onChange={(e) => handleChange(e)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={(data && data.email) || ""}
            onChange={(e) => handleChange(e)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Image
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            ref={fileInputRef}
            className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="text-center space-x-8">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update
          </button>
          <button
            onClick={(e) => handleResetPassword(e)}
            className="bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Reset Password
          </button>
        </div>
      </form>
      <ReactToast.ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
