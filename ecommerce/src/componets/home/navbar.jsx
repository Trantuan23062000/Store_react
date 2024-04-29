import React, { useEffect, useReducer, useState } from "react";
import { FaBars, FaShoppingCart, FaSearch, FaTrash } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateCartdata, selectCartItems } from "../../redux/slices/cartSlice";

const initialState = {
  isOpen: false,
  isMobile: false,
  isSearchOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_OPEN":
      return { ...state, isOpen: !state.isOpen, isSearchOpen: false };
    case "CHECK_MOBILE":
      return { ...state, isMobile: window.innerWidth <= 430 };
    case "TOGGLE_SEARCH":
      return { ...state, isSearchOpen: !state.isSearchOpen, isOpen: false };
    case "HIDE_DROPDOWN":
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

const Navbar = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [initialized, setInitialized] = useState(false);
  const location = useLocation();
  const cartItems = useSelector(selectCartItems);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    const newTotalQuantity = cartItems.reduce(
      (total, item) => total + item.productVariant.quantity,
      0
    );
    setTotalQuantity(newTotalQuantity);
  }, [cartItems]); // Lưu trữ dữ liệu vào Local Storage mỗi khi cartItems thay đổi và tính toán lại totalQuantity

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      dispatch(updateCartdata(JSON.parse(storedCartItems)));
    }
  }, [dispatch, cartItems]);

  const toggleCartDropdown = () => {
    setIsCartDropdownOpen(!isCartDropdownOpen);
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems && !initialized) {
      dispatch(updateCartdata(JSON.parse(storedCartItems)));
      setInitialized(true);
    }
    // eslint-disable-next-line
  }, []);

  const hideDropdown = () => {
    dispatch({ type: "HIDE_DROPDOWN" });
  };

  useEffect(() => {
    hideDropdown();
    const checkWindowSize = () => {
      dispatch({ type: "CHECK_MOBILE" });
    };

    checkWindowSize();

    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, [location]);

  const { isOpen, isMobile, isSearchOpen } = state;

  // Hàm xử lý sự kiện để mở dropdown
  const handleDropdownOpen = () => {
    dispatch({ type: "TOGGLE_OPEN" });
  };

  return (
    <nav className="bg-black p-3 px-4 py-8 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <div className="text-white hover:text-yellow-300 text-lg font-semibold">
              <Link to="/">
                {" "}
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className="w-20 h-10 rounded-lg"
                />
              </Link>
            </div>
          </div>
          {!isMobile && (
            <div className="hidden md:flex justify-center w-full">
              <div className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-lg font-semibold">
                <Link to="/shop"> SHOP</Link>
              </div>
              <div className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-lg font-semibold">
                ABOUT
              </div>
              <div className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-lg font-semibold">
                <Link to="/contact">CONTACT</Link>
              </div>
              <div className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-lg font-semibold">
                MY ORDER
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
                  <div className="py-1">
                    <input
                      type="text"
                      placeholder="Search"
                      className="block w-full px-4 py-2 text-sm text-black border rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="text-white hover:text-yellow-300">
              <Link to="/cart">
                <FaShoppingCart size={24} />
                <span>({totalQuantity})</span>
              </Link>
            </div>
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={handleDropdownOpen} // Gọi hàm xử lý khi click
                  type="button"
                  className="text-white hover:text-white focus:outline-none"
                >
                  <FaBars size={24} />
                </button>
              </div>
              {/* Chỉ hiển thị dropdown khi isOpen === true */}
              {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className="flex mr-2 px-4 py-2 text-sm text-black hover:bg-black hover:text-white">
                      <Link to="/">HOME</Link>
                    </div>
                    <div className="flex mr-2 px-4 py-2 text-sm text-black hover:bg-black hover:text-white">
                      <Link to="/about">ABOUT</Link>
                    </div>
                    <div className="flex mr-2 px-4 py-2 text-sm text-black hover:bg-black hover:text-white">
                      <Link to="/contact">CONTACT</Link>
                    </div>
                    <div className="flex mr-2 px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition">
                      <Link to="/checkout">My order</Link>
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
                      className="block w-full px-4 py-2 text-sm text-black border rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="text-white ml-4 relative">
              <FaShoppingCart size={24} onClick={toggleCartDropdown} />
              {totalQuantity > 0 && (
                <span className="bg-yellow-300 text-red-500 rounded-full h-5 w-5 flex items-center justify-center absolute -top-3 -right-2 font-bold">
                  {totalQuantity}
                </span>
              )}
              {isCartDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-4 ml-3 font-semibold justify-between">
                    {cartItems.map((item) => (
                      <div key={item.id}>
                        <div className="flex justify-around">
                          <div className="text-black">
                            {item.Product.name} X {item.productVariant.quantity}{" "}
                          </div>
                          <img
                            src={JSON.parse(item.Product.Image.URL)[0]}
                            alt="product 1"
                            className="w-8 h-8"
                          />
                          <div className="text-black">
                            <FaTrash />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="ml-3 relative">
              <div>
                <button
                  onClick={handleDropdownOpen} // Gọi hàm xử lý khi click
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
                    <div className="flex px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition">
                      <Link to="/login">Login</Link>
                    </div>
                    <div className="flex px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition">
                      <Link to="/register">Register</Link>
                    </div>
                    {/* <div className="flex px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition">
                      Logout
                    </div> */}
                    <div className="flex px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition">
                      <Link to="/checkout">My order</Link>
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
