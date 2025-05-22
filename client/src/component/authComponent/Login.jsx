import axios from "axios";
import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as ReactToast from "react-toastify";
import { useAuth } from "../../lib/context/AuthContext";

export default function Login() {
  const { setUser } = useAuth();
  const [dataLocal, setDataLocal] = React.useState();
  const navigate = ReactRouter.useNavigate();

  const handleSubmit = async (e) => {
    e && e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          payload: { ...dataLocal },
        }
      );

      if (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("islogged", true);
        const role = response.data.emailCheck.role;
        setUser(response.data.emailCheck);
        if (role === "user") {
          navigate("/");
        } else {
          navigate("/adminhome");
        }
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataLocal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg w-80 text-center">
        <h1 className="text-3xl mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none"
          />
          {/* {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )} */}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none"
          />
          {/* {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )} */}
          <button
            type="submit"
            className="w-full p-2 mb-4 bg-gradient-to-r from-blue-600 to-pink-600 text-white text-lg rounded-md cursor-pointer"
          >
            Submit
          </button>
        </form>
        <div>
          <p>
            Don't have an account?
            <ReactRouter.Link to={"/signup"} className="text-blue-600">
              Sign up
            </ReactRouter.Link>
          </p>
        </div>
      </div>
      <ReactToast.ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
