import * as React from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const appContext = React.createContext();

export const useApp = () => {
  return React.useContext(appContext);
};

export const Appprovider = ({ children }) => {
  const { user } = useAuth();
  const [cartCount, setCartCount] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");

  const [currStateModal, setCurrStateModal] = React.useState({
    error: false,
    success: false,
    loading: false,
    message: "",
  });

  const userId = user.id;
  const role = user.role;

  React.useEffect(() => {
    (async () => {
      if (userId && role === "user") {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/cart-count`,
            {
              userId,
            }
          );
          setCartCount(res.data.count); // Use res.data.count to get the count
        } catch (error) {
          console.error("Error fetching cart count:", error); // Log any error
        }
      }
    })();
  }, [userId]);

  return (
    <appContext.Provider
      value={{
        currStateModal,
        setCurrStateModal,
        cartCount,
        setCartCount,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
