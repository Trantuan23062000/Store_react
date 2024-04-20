import React, { useState } from "react";
import ShowFilter from "./showFilter";
import Filter from "./filter";
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
            <div className="bg-white shadow rounded overflow-hidden group">
              <div className="relative">
                <img
                  src="images/product1.jpeg"
                  alt="product 1"
                  className="w-full"
                />
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
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <Link to="/product"><CgSearch /></Link> 
                  </div>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <div href="#">
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                  Nike air
                  </h4>
                </div>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-primary font-semibold">$45.00</p>
                  <p className="text-sm text-gray-400 line-through">$55.90</p>
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
                  <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
              </div>
              <div className="block w-full py-1 text-center text-black font-bold bg-white border rounded-b hover:bg-transparent hover:text-red-500 transition">
                Add to cart 
              </div>
            </div>

            <div className="bg-white shadow rounded overflow-hidden group">
              <div className="relative">
                <img
                  src="images/product2.jpeg"
                  alt="product 1"
                  className="w-full"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                        justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                >
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <CgShoppingCart />
                  </div>
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <CgHeart />
                  </div>
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <Link to="/product"><CgSearch /></Link> 
                  </div>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <div href="#">
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                    Nike limit
                  </h4>
                </div>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-primary font-semibold">$45.00</p>
                  <p className="text-sm text-gray-400 line-through">$55.90</p>
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
                  <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
              </div>
              <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent hover:text-primary hover:text-red-500 transition">
                Add to cart 
              </div>
            </div>

            <div className="bg-white shadow rounded overflow-hidden group">
              <div className="relative">
                <img
                  src="images/product3.jpeg"
                  alt="product 1"
                  className="w-full"
                />
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
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <Link to="/product"><CgSearch /></Link> 
                  </div>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <div href="#">
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 transition">
                   Nike Blue
                  </h4>
                </div>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-black font-semibold">$45.00</p>
                  <p className="text-sm text-gray-400 line-through">$55.90</p>
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
                  <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
              </div>
              <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent hover:text-primary hover:text-red-500 transition">
                Add to cart 
              </div>
            </div>

            <div className="bg-white shadow rounded overflow-hidden group">
              <div className="relative">
                <img
                  src="images/product4.jpeg"
                  alt="product 1"
                  className="w-full"
                />
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
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <Link to="/product"><CgSearch /></Link> 
                  </div>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <div href="#">
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 transition">
                    Nike jodan 2024
                  </h4>
                </div>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-primary font-semibold">$45.00</p>
                  <p className="text-sm text-gray-400 line-through">$55.90</p>
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
                  <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
              </div>
              <div className="block w-full py-1 text-center text-black font-bold bg-white border rounded-b hover:bg-transparent hover:text-red-500 transition">
                Add to cart 
              </div>
            </div>

            <div className="bg-white shadow rounded overflow-hidden group">
              <div className="relative">
                <img
                  src="images/product5.jpeg"
                  alt="product 1"
                  className="w-full"
                />
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
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <Link to="/product"><CgSearch /></Link> 
                  </div>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <div href="#">
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                   Nike air
                  </h4>
                </div>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-primary font-semibold">$45.00</p>
                  <p className="text-sm text-gray-400 line-through">$55.90</p>
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
                  <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
              </div>
              <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent hover:text-primary hover:text-red-500 transition">
                Add to cart 
              </div>
            </div>

            <div className="bg-white shadow rounded overflow-hidden group">
              <div className="relative">
                <img
                  src="images/product8.jpeg"
                  alt="product 1"
                  className="w-full"
                />
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
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                  <Link to="/product"><CgSearch /></Link> 
                  </div>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <div href="#">
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 transition">
                    Nike black
                  </h4>
                </div>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl font-semibold">$45.00</p>
                  <p className="text-sm text-gray-400 line-through">$55.90</p>
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
                  <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
              </div>
              <div className="block w-full py-1 text-center text-black font-bold bg-white border rounded-b hover:bg-transparent hover:text-red-500 transition">
                Add to cart 
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center sm:justify-between mt-6">
        <button
          disabled
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
          type="button"
        >
          <CgPushChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <button
            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              1
            </span>
          </button>
          {/* Các nút phân trang tiếp theo ở đây */}
          <button
            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              2
            </span>
          </button>
          {/* Thêm các nút phân trang khác ở đây */}
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          type="button"
        >
          <CgPushChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Drawer;
