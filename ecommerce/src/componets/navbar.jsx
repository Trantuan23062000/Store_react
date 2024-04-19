import React, { useEffect, useReducer } from "react";
import { FaBars, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const initialState = {
  isOpen: false,
  isMobile: false,
  isSearchOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_OPEN":
      return { ...state, isOpen: !state.isOpen, isSearchOpen: false }; // Đóng dropdown tìm kiếm nếu mở dropdown khác
    case "CHECK_MOBILE":
      return { ...state, isMobile: window.innerWidth <= 430 };
    case "TOGGLE_SEARCH":
      return { ...state, isSearchOpen: !state.isSearchOpen, isOpen: false }; // Đóng dropdown chính nếu mở dropdown tìm kiếm
    default:
      return state;
  }
};

const Navbar = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const checkWindowSize = () => {
      dispatch({ type: "CHECK_MOBILE" });
    };

    checkWindowSize();

    window.addEventListener("resize", checkWindowSize);
    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  const { isOpen, isMobile, isSearchOpen } = state;

  return (
    <nav className="bg-black p-3 px-4 py-8 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <div className="text-white hover:text-yellow-300 text-lg font-semibold">
              <Link to = "/"> <img src="/images/logo.svg" alt="logo" className="w-30" /></Link>
            </div>
          </div>
          {!isMobile && (
            <div className="hidden md:flex justify-center w-full">
              <div className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-lg font-semibold">
                <Link to= "/shop"> SHOP</Link>
              </div>
              <div className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-lg font-semibold">
                ABOUT
              </div>
              <div className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-lg font-semibold">
                CONTACT
              </div>
            </div>
          )}
          <div
            className={`flex items-center ${isMobile ? "md:hidden" : "hidden"}`}
          >
             <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => dispatch({ type: "TOGGLE_SEARCH" })}
                  type="button"
                  className="text-white hover:text-yellow-300 focus:outline-none"
                >
                  <FaSearch size={24} />
                </button>
              </div>
              {isSearchOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="search-menu"
                  >
                    <input
                      type="text"
                      placeholder="Search"
                      className="block w-full px-4 py-2 text-sm text-black borde rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="text-white hover:text-yellow-300">
              <FaShoppingCart size={24} />
            </div>
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => dispatch({ type: "TOGGLE_OPEN" })}
                  type="button"
                  className="text-white hover:text-white focus:outline-none"
                >
                  <FaBars size={24} />
                </button>
              </div>
              {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white">
                      HOME
                    </div>
                    <div className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white">
                      ABOUT
                    </div>
                    <div className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white">
                      CONTACT
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={`flex items-center ${isMobile ? "hidden" : "md:flex"}`}
          >
             <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => dispatch({ type: "TOGGLE_SEARCH" })}
                  type="button"
                  className="text-white hover:text-yellow-300 focus:outline-none"
                >
                  <FaSearch size={24} />
                </button>
              </div>
              {isSearchOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="search-menu"
                  >
                    <input
                      type="text"
                      placeholder="Search"
                      className="block w-full px-4 py-2 text-sm text-black borde rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="text-white hover:text-yellow-300 ml-4">
              <FaShoppingCart size={24} />
            </div>
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => dispatch({ type: "TOGGLE_OPEN" })}
                  type="button"
                  className="text-white hover:text-yellow-300 focus:outline-none"
                >
                  <FaBars size={24} />
                </button>
              </div>
              {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition">
                      Login
                    </div>
                    <div className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition">
                      Register
                    </div>
                    <div className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition">
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
