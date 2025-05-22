import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as ReactToast from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [data, setData] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const navigate = ReactRouter.useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          payload: { ...data },
          image: image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data", // Tell axios to send a file
          },
        }
      );
      if(response)
      {
        navigate(`/login`)
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={data.fullname || ""}
            onChange={(e) => handleChange(e)}
            className="mb-4 p-2 w-full border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email || ""}
            onChange={(e) => handleChange(e)}
            className="mb-4 p-2 w-full border rounded"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username || ""}
            onChange={(e) => handleChange(e)}
            className="mb-4 p-2 w-full border rounded"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={data.password || ""}
              onChange={(e) => handleChange(e)}
              className="mb-4 p-2 w-full border rounded pr-12"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.5C6.478 4.5 1.943 8.239.5 12c1.443 3.761 5.978 7.5 11.5 7.5s10.057-3.739 11.5-7.5C22.057 8.239 17.522 4.5 12 4.5z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.5C6.478 4.5 1.943 8.239.5 12c1.443 3.761 5.978 7.5 11.5 7.5s10.057-3.739 11.5-7.5C22.057 8.239 17.522 4.5 12 4.5z"
                  />
                </svg>
              )}
            </span>
          </div>
          <input
            type="file"
            name="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-4 p-2 w-full border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Signup
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Already have an account? Login
          </button>
        </form>
      </div>
      <ReactToast.ToastContainer />
    </div>
  );
}

export default Signup;
