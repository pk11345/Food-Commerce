import * as React from "react";
import AdminSideBar from "../Navbar/AdminNavbar/AdminSideBar";
import AdminUpperBar from "../Navbar/AdminNavbar/AdminUpperBar";

export default function AdminDashBoard({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar fixed on the left */}
      <div className="w-1/4 h-full fixed top-0 left-0">
        <AdminSideBar />
      </div>

      {/* Main content area, scrollable and occupying full width */}
      <div className=" w-full h-full flex flex-col  ">
        <div className="p-0 m-0">
          <AdminUpperBar />
        </div>
        <div className=" pl-96 pt-0 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
