import React, { useEffect, useState } from "react";
import ShowFilter from "./showFilter";
import Filter from "./filter";
import {
  setCurrentPage,setSelectedProduct,fetchData
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

const Drawer = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.data);
  const filterData = useSelector((state) => state.filter.filterData); 
  const totalPages = useSelector((state) => state.products.totalPages);
  const currentPage = useSelector((state) => state.products.currentPage);
  useSelector((state) => state.products.selectedProduct); // Lấy selectedProduct từ Redux Store
  const currentLimit = useSelector((state) => state.products.currentLimit);

  const displayData = filterData.length > 0 ? filterData : data;
 

  const handleProductSelect = (item) => {
    dispatch(setSelectedProduct(item));
    localStorage.setItem("selectedProductDrawer", JSON.stringify(item));
  };


  const handleChangPage = (pagenumber) => {
    dispatch(setCurrentPage(pagenumber)); // Sử dụng dispatch để cập nhật trạng thái Redux
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

  useEffect(() => {
    dispatch(fetchData({ currentPage, currentLimit }));
    // eslint-disable-next-line
  }, [currentPage,currentLimit, dispatch]);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  const handleClose = () => {
    setShowModal(false);
  };
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
            {React.Children.toArray(
            displayData.length > 0 &&
            displayData.map((item) => (
                  <>
                    <div
                      key={item.id}
                      className="bg-white shadow rounded overflow-hidden group"
                    >
                      <div className="relative">
                        {item.Product.Image && item.Product.Image.URL ? (
                          <img
                            src={JSON.parse(item.Product.Image.URL)[0]} // Truy cập vào phần tử đầu tiên của mảng URL
                            alt="product 1"
                          />
                        ) : null}

                        <div
                          className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                              justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                        >
                          <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                            <CgShoppingCart />
                          </div>
                          <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                            <CgHeart />
                          </div>
                          <div
                          onClick={()=>handleProductSelect(item)}
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
                      <div className="block w-full py-1 text-center text-black font-bold bg-white border rounded-b hover:bg-transparent hover:text-red-500 transition">
                        Add to cart
                      </div>
                    </div>
                  </>
                ))
            )}
          </div>
          {totalPages > 0 && (
            <div className="flex container mx-auto  justify-center items-center sm:justify-between mt-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    handlePreviousPage();
                  }}
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
                  onClick={() => {
                    handleNextPage();
                  }}
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
