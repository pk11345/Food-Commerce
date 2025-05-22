import axios from "axios";
import * as React from "react";
import { toast } from "react-toastify";

export const authContext = React.createContext();

export const useAuth = () => React.useContext(authContext);

export const Myprovider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  React.useEffect(() => {
    if (token) {

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/context/auth`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.data) {
            setUser(response.data.data);
          }
        } catch (error) {
          // Ensure the error structure is correct, and check the message
           console.log(error);
          if (
            error?.response?.data?.message===
            "Session expired Please Login again"
          ) {
           
            
            toast.error("Session expired. Please login again.");
            localStorage.clear(); // Clear localStorage
            setTimeout(() => {
              window.location.href = "/login"; // Redirect to login
            }, 2000); // Redirect after a delay
          } else {
            console.error("An error occurred. Please try again later.");
          }
        }
      };

      fetchData();
    }
  }, [token]); // Add token as a dependency in useEffect

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
