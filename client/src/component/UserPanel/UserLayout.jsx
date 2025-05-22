import * as React from "react";
import * as ReactRouter from "react-router-dom";
import UserNavber from "../Navbar/UserNavbar/UserNavber";
import Footer from "./Footer";

export default function UserLayout({ children }) {
    const token = localStorage.getItem("token");
    
  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden">
      <UserNavber /> {/* Pass counter and setCounter */}
      <div className="flex-grow w-full overflow-y-auto">
        {children} {/* Provide setCounter to Outlet */}
      </div>
      <Footer />
    </div>
  );
}
