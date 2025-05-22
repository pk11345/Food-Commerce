import axios from "axios";
import * as React from "react";
import * as ReactToast from "react-toastify";
import * as Router from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";

export default function ResetPassword() {
  const [data, setData] = React.useState({});
  const [otpSent, setOtpSent] = React.useState(false); // State to track if OTP has been sent
  const [validationError, setValidationError] = React.useState({});
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

  const handleResetPasswordSubmit = async (e) => {
    e && e.preventDefault();

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/resert-password`,
        { data }
      );
      if (res.data.message === "Password chage successfully") {
        ReactToast.toast.success("The password is change successfuly");
        setTimeout(() => {
          navigate(`/adminhome`);
        }, 2000);
      }
    } catch (error) {
      if (error.response.data.error === "Wrong Otp") {
        setValidationError({ otp: "Wrong Otp filled" });
      }
    }
  };

  const handleSendOtp = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/generate-otp/${
          userId.id
        }`
      );

      if (res.data.data) {
        console.log("hello");

        setOtpSent(res.data.data.otp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white mt-8 p-8 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
          {!otpSent ? (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={(data && data.email) || ""}
                onChange={(e) => handleChange(e)}
                className="mb-4 p-2 w-full border rounded"
                required
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors mb-4"
              >
                Send OTP
              </button>
            </>
          ) : (
            <form>
              <input
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={(data && data.newPassword) || ""}
                onChange={(e) => handleChange(e)}
                className="mb-4 p-2 w-full border rounded"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={(data && data.confirmPassword) || ""}
                onChange={(e) => handleChange(e)}
                className="mb-4 p-2 w-full border rounded"
                required
              />
              <input
                type="text"
                placeholder="Enter OTP"
                name="otp"
                className={`mb-b p-2 w-full border rounded ${
                  validationError.otp ? "border-red-500" : ""
                }`}
                value={(data && data.otp) || ""}
                onChange={(e) => handleChange(e)}
                required
              />
              {validationError.otp && (
                <p className="text-red-500 text-sm mb-2">
                  {validationError.otp}
                </p>
              )}
              <button
                type="submit"
                className="w-full mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={(e) => handleResetPasswordSubmit(e)}
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
      <ReactToast.ToastContainer />
    </>
  );
}
