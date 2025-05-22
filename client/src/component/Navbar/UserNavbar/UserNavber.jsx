import * as React from "react";
import img from "../../../lib/images/ubereats.png";
import profile from "../../../lib/images/Profile.png";
import * as ReactRouter from "react-router-dom";
import * as Icon from "react-icons/fa";
import { useAuth } from "../../../lib/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useApp } from "../../../lib/context/AppContext";
import debounce from "lodash/debounce";

export default function UserNavber() {
  const { user, setUser, setToken } = useAuth();
  const { setSearchTerm } = useApp();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isLogged = localStorage.getItem("islogged");
  const navigate = ReactRouter.useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    navigate("/");
  };
  const handleLogin = (e) => {
    e && e.preventDefault();
    navigate("/login");
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid JWT token:", error);
      }
    }
  }, []);

  const handleSearchChange = debounce((e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }, 500);

  return (
    <>
      {isLogged ? (
        <div className="max-w-full mx-auto flex items-center justify-between w-screen  bg-black">
          <div className="w-full ">
            <nav className=" text-white w-full flex items-center justify-between pt-2 pb-3 pl-2 pr-2">
              <div className="flex items-center justify-between gap-6 w-[60%] md:w-[30%] lg:w-[50%]">
                <img src={img} alt="#" className="bg-black w-15 h-15" />

                <div className=" w-[70%]">
                  <input
                    type="search"
                    className="outline-none text-black px-2 py-1 w-[70%] rounded bg-white"
                    placeholder="Search dishes..."
                    onChange={handleSearchChange}
                  />
                </div>
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

              <div className="flex gap-4">
                <div className="hidden md:flex  gap-5">
                  <ul className="flex items-center justify-evenly space-x-6">
                    <li className="hover:underline cursor-pointer">
                      <ReactRouter.Link to={"/"}>Home</ReactRouter.Link>
                    </li>
                    <li className="hover:underline cursor-pointer">
                      <ReactRouter.Link to={"/about"}>About</ReactRouter.Link>
                    </li>
                    <li className="hover:underline cursor-pointer">
                      <ReactRouter.Link to={"/contact"}>
                        Contact
                      </ReactRouter.Link>
                    </li>
                  </ul>
                </div>

                <div className="hidden  md:flex items-center space-x-4 ">
                  <span className="hover:underline cursor-pointer">
                    <ReactRouter.Link to={`/update-profile/${user.id}`}>
                      User Profile
                    </ReactRouter.Link>
                  </span>
                  {user.image !== null ? (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${user.image}`}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <img src={profile} className="w-12 h-12 rounded-full" />
                  )}
                  <span>{user.username}</span>
                  <ReactRouter.Link
                    to={`/cart/${user.id}`}
                    className="relative"
                  >
                    <Icon.FaShoppingCart className="text-white text-2xl" />
                    {/* {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )} */}
                  </ReactRouter.Link>
                  <button
                    className="px-3 py-2 bg-red-500 rounded hover:bg-red-600"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </nav>

            {/* Mobile menu */}
            {isMenuOpen && (
              <>
                <div className="flex flex-col items-center pb-3 pt-2 pr-2 w-[50vw] bg-black fixed right-0">
                  <div className="md:hidden  text-white ">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                      <li className="hover:underline cursor-pointer">
                        <ReactRouter.Link to={"/"}>Home</ReactRouter.Link>
                      </li>
                      <li className="hover:underline cursor-pointer">
                        <ReactRouter.Link to={"/about"}>About</ReactRouter.Link>
                      </li>
                      <li className="hover:underline cursor-pointer">
                        <ReactRouter.Link to={"/contact"}>
                          Contact
                        </ReactRouter.Link>
                      </li>
                    </ul>
                  </div>

                  {/* user,logout */}

                  <div className="  md:hidden items-center flex flex-col gap-3 text-white">
                    <span className="hover:underline cursor-pointer">
                      <ReactRouter.Link to={"updateprofile"}>
                        User Profile
                      </ReactRouter.Link>
                    </span>

                    <div className="flex items-center gap-1">
                      {user ? (
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/${
                            user.image
                          }`}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <img src={profile} className="w-12 h-12 rounded-full" />
                      )}
                    </div>
                    <ReactRouter.Link to="/" className="relative">
                      <Icon.FaShoppingCart className="text-white text-2xl" />
                      {/* {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )} */}
                    </ReactRouter.Link>
                    <button
                      className="px-2 py-2 bg-red-500 rounded hover:bg-red-600"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-full mx-auto flex items-center justify-between w-screen  bg-black">
          <div className="w-full ">
            <nav className=" text-white w-full flex items-center justify-between pt-2 pb-3 pl-2 pr-2">
              <div className="flex items-center justify-between gap-6 w-[60%] md:w-[30%] lg:w-[50%]">
                <img src={img} alt="#" className="bg-black w-15 h-15" />

                <div className=" w-[70%]">
                  <input
                    type="search"
                    className="outline-none text-black px-2 py-1 w-[70%] rounded bg-white"
                    placeholder="Search dishes..."
                    onChange={handleSearchChange}
                  />
                </div>
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

              <div className="flex gap-4">
                <div className="hidden md:flex  gap-5">
                  <ul className="flex items-center justify-evenly space-x-6">
                    <li className="hover:underline cursor-pointer">
                      <ReactRouter.Link to={"/"}>Home</ReactRouter.Link>
                    </li>
                    <li className="hover:underline cursor-pointer">
                      <ReactRouter.Link to={"/about"}>About</ReactRouter.Link>
                    </li>
                    <li className="hover:underline cursor-pointer">
                      <ReactRouter.Link to={"/contact"}>
                        Contact
                      </ReactRouter.Link>
                    </li>
                  </ul>
                </div>

                <div className="hidden  md:flex items-center space-x-4 ">
                  <img src={profile} className="w-12 h-12 rounded-full" />
                  <button
                    className="px-3 py-2 bg-blue-500 rounded hover:bg-blue-600"
                    onClick={(e) => handleLogin(e)}
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </div>
            </nav>

            {/* Mobile menu */}
            {isMenuOpen && (
              <>
                <div className="flex flex-col items-center pb-3 pt-2 pr-2 w-[50vw] bg-black fixed right-0">
                  <div className="md:hidden  text-white ">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                      <li className="hover:underline cursor-pointer">
                        <ReactRouter.Link to={"/"}>Home</ReactRouter.Link>
                      </li>
                      <li className="hover:underline cursor-pointer">
                        <ReactRouter.Link to={"/about"}>About</ReactRouter.Link>
                      </li>
                      <li className="hover:underline cursor-pointer">
                        <ReactRouter.Link to={"/contact"}>
                          Contact
                        </ReactRouter.Link>
                      </li>
                    </ul>
                  </div>

                  {/* user,logout */}

                  <div className="  md:hidden items-center flex flex-col gap-3 text-white">
                    <span className="hover:underline cursor-pointer">
                      <ReactRouter.Link to={"updateprofile"}>
                        User Profile
                      </ReactRouter.Link>
                    </span>

                    <div className="flex items-center gap-1">
                      {user ? (
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/${
                            user.image
                          }`}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <img src={profile} className="w-12 h-12 rounded-full" />
                      )}
                    </div>
                    <ReactRouter.Link to="/" className="relative">
                      <Icon.FaShoppingCart className="text-white text-2xl" />
                      {/* {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )} */}
                    </ReactRouter.Link>
                    <button
                      className="px-2 py-2 bg-red-500 rounded hover:bg-red-600"
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
