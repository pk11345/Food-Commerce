import * as React from "react";
import img from "../../../lib/images/ubereats.png";
import * as ReactRouter from "react-router-dom";
import * as Icon from "react-icons/fa";

function AdminSideBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className="h-screen ">
      <div className=" bg-gray-800 h-screen text-white flex flex-col items-center py-6">
        <div className="flex flex-col">
          <div className="mb-10">
            <img
              src={img}
              alt="Logo"
              className="h-16 w-16 object-contain rounded-full"
            />
          </div>
          <button
            className="md:hidden fixed right-0 pr-5 ml-4"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <Icon.FaTimes className="text-white" />
            ) : (
              <Icon.FaBars className="text-white" />
            )}
          </button>
        </div>
        <div className="flex gap-4">
          <div className="hidden md:flex  gap-5">
            <nav className="space-y-6 w-full">
              {/* <ReactRouter.Link to="home" className="block text-lg hover:bg-gray-700 px-4 py-2 transition duration-200">
                        <h2>Home</h2>
                    </ReactRouter.Link> */}

              <ReactRouter.Link
                to="/adminhome"
                className="block text-lg hover:bg-gray-700 px-4 py-2 transition duration-200"
              >
                <h2>Create New Product</h2>
              </ReactRouter.Link>

              <ReactRouter.Link
                to="/all-product"
                className="block text-lg hover:bg-gray-700 px-4 py-2 transition duration-200"
              >
                <h2>All Products</h2>
              </ReactRouter.Link>

              <ReactRouter.Link
                to="/order-request"
                className="block text-lg hover:bg-gray-700 px-4 py-2 transition duration-200"
              >
                <h2>Order Request</h2>
              </ReactRouter.Link>
              <ReactRouter.Link
                to="/user-request"
                className="block text-lg hover:bg-gray-700 px-4 py-2 transition duration-200"
              >
                <h2>User Request</h2>
              </ReactRouter.Link>
              <ReactRouter.Link
                to="/download-pdf"
                className="block text-lg hover:bg-gray-700 px-4 py-2 transition duration-200"
              >
                <h2>Download Pdf</h2>
              </ReactRouter.Link>

              <ReactRouter.Link
                to="/login"
                className="block text-lg hover:bg-gray-700 px-4 py-2 transition duration-200"
              >
                <h2>Logout</h2>
              </ReactRouter.Link>
            </nav>
          </div>
        </div>
        {/* {isMenuOpen && (
              <>
                <div className="flex flex-col items-center pb-3 pt-2 pr-2 w-[50vw] bg-black fixed right-0">
                  <div className="md:hidden  text-white ">
                    </div>
                    </div>
                    </>
        )} */}
      </div>
    </div>
  );
}

export default AdminSideBar;
