import React, { useEffect, useMemo, useState } from "react";
import ShowFilter from "./showFilter";
import Filter from "./filter";
import {
  setCurrentPage,
  setSelectedProduct,
  fetchData,setTotalPages
} from "../../redux/slices/ productSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  CgChevronRight,
  CgHeart,
  CgPushChevronLeft,
  CgPushChevronRight,
  CgSearch,
  CgShoppingCart,
} from "react-icons/cg";
import { FaHome, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


const Drawer = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const originalData = useSelector((state) => state.products.data);
  const filterData = useSelector((state) => state.filter.filterData);
  const totalPages = useSelector((state) => state.products.totalPages);
  const currentPage = useSelector((state) => state.products.currentPage);
  const currentLimit = useSelector((state) => state.products.currentLimit);

  const handleAddToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const existingItem = { ...cartItems[existingItemIndex] };
      const totalQuantity = existingItem.productVariant.quantity + 1;
      if (totalQuantity > item.productVariant.quantity) {
        toast.error(`The quantity has exceeded the limit product ${item.Product.name}: ${item.productVariant.quantity}`);
        return;
      }
      const updatedProductVariant = { ...existingItem.productVariant };
      updatedProductVariant.quantity += 1;
      const updatedItem = { ...existingItem, productVariant: updatedProductVariant };
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = updatedItem;
      setCartItems(updatedCartItems);
      saveCartToLocalStorage(updatedCartItems);
      window.location.reload()
    } else {
      const newItem = { ...item, productVariant: { ...item.productVariant, quantity: 1 } };
      const updatedCartItems = [...cartItems, newItem];
      setCartItems(updatedCartItems);
      saveCartToLocalStorage(updatedCartItems);
      window.location.reload()
    }
  };

  useEffect(() => {
    // Khôi phục dữ liệu giỏ hàng từ localStorage khi trang được tải lại
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  const saveCartToLocalStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const displayData = useMemo(() => {
    if (filterData.length === 0) {
      return originalData;
    } else {
      const intersection = originalData.filter((item) =>
        filterData.some((filterItem) => filterItem.id === item.id)
      );
      return intersection;
    }
  }, [originalData, filterData]);

  useEffect(() => {
    // Tính toán lại tổng số trang sau khi dữ liệu đã được lọc
    const totalProducts = filterData.length;
    const newTotalPages = Math.ceil(totalProducts / currentLimit);
    //console.log(totalProducts / currentLimit,totalProducts);
  
    // Chỉ cập nhật totalPages nếu filterData không rỗng
    if (filterData.length > 0) {
      dispatch(setTotalPages(newTotalPages > 0 ? newTotalPages : 1));
    }
  
    // Nếu currentPage vượt quá số trang mới, chuyển về trang cuối cùng
    if (currentPage > newTotalPages && newTotalPages > 0) {
      dispatch(setCurrentPage(newTotalPages));
    } else {
      // Ngược lại, giữ nguyên trang hiện tại
      dispatch(setCurrentPage(currentPage));
    }
    // eslint-disable-next-line
  }, [displayData, currentLimit, filterData]);


  const handleProductSelect = (item) => {
    dispatch(setSelectedProduct(item));
    localStorage.setItem("selectedProductDrawer", JSON.stringify(item));
  };

  const handleChangPage = (pagenumber) => {
    dispatch(setCurrentPage(pagenumber));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(fetchData({ currentPage, currentLimit }));
  }, [currentPage, currentLimit, filterData, dispatch]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [filterData, dispatch]);

  return (
    <div>
      <div className="py-4 flex items-center gap-3">
        <div className="text-primary text-base">
          <Link to="/">
            <FaHome />
          </Link>
        </div>
        <span className="text-sm text-gray-400">
          <CgChevronRight />
        </span>
        <p className="text-gray-600 font-medium">Shop</p>
      </div>
      {showModal && <ShowFilter close={handleClose} />}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <Filter />
        <div className="col-span-3">
          <div className="flex items-center mb-4">
            <select
              name="sort"
              id="sort"
              className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
            >
              <option value="">Default sorting</option>
              <option value="price-low-to-high">Price low to high</option>
              <option value="price-high-to-low">Price high to low</option>
              <option value="latest">Latest product</option>
            </select>

            <div className="flex gap-2 ml-auto">
              <button
                className="text-white bg-black hover:bg-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 block md:hidden"
                type="button"
                onClick={handleModalToggle}
              >
                Filter
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
            {displayData.map((item) => (
              <div key={item.id} className="bg-white shadow rounded overflow-hidden group">
                <div className="relative">
                  {item.Product.Image && item.Product.Image.URL ? (
                    <img
                      src={JSON.parse(item.Product.Image.URL)[0]}
                      alt="product 1"
                    />
                  ) : null}

                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                      <CgShoppingCart />
                    </div>
                    <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                      <CgHeart />
                    </div>
                    <div
                      onClick={() => handleProductSelect(item)}
                      className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0"
                    >
                      <Link to={{ pathname: `/product/${item.id}` }}>
                        <CgSearch />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="pt-4 pb-3 px-4">
                  <div>
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                      {item.Product.name}
                    </h4>
                  </div>
                  <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">
                      {item.Product.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                    <p className="text-sm text-gray-400 line-through">
                      $55.90
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 ml-3">
                      (150)
                    </div>
                  </div>
                </div>
                <div onClick={()=>handleAddToCart(item)} className="block w-full py-1 text-center text-black font-bold bg-white border rounded-b hover:bg-transparent hover:text-red-500 transition">
                  Add to cart
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex container mx-auto justify-center items-center sm:justify-between mt-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePreviousPage}
                  className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <CgPushChevronLeft />
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handleChangPage(i + 1)}
                      disabled={currentPage === i + 1}
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-slate-400 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        {i + 1}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleNextPage}
                  className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Next
                  <CgPushChevronRight />
                </button>
              </div>
              <span>
                page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
