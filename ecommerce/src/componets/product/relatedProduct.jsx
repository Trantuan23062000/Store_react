import React from "react";
import { CgHeart, CgSearch, CgShoppingCart } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const RelatedProduct = () => {
  return (
    <div>
      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          Related products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
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
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-fullflex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <CgShoppingCart />
                  </div>
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <CgHeart />
                  </div>
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-fullflex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <Link to="/product">
                      <CgSearch />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 pb-3 px-4">
              <div>
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-black transition">
                Nike air
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
            <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent hover:text-red-500 transition">
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
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="text-white hover:text-red-600 text-lg w-9 h-8 rounded-full bg-black flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <CgShoppingCart />
                  </div>
                  <div className="text-white hover:text-red-600 text-lg w-9 h-8 rounded-full bg-black flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <CgHeart />
                  </div>
                  <div className="text-white  hover:text-red-600 text-lg w-9 h-8 rounded-full bg-black flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <Link to="/product">
                      <CgSearch />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 pb-3 px-4">
              <div>
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-black transition">
                  Nike best Saller
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
            <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent  hover:text-red-500 transition">
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
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <CgShoppingCart />
                  </div>
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full  flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <CgHeart />
                  </div>
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full  flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <Link to="/product">
                      <CgSearch />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 pb-3 px-4">
              <div>
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-black transition">
                  Nike limit
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
            <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent hover:text-red-500 transition">
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
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full  flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <CgShoppingCart />
                  </div>
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full  flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <CgHeart />
                  </div>
                  <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full  flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                    <Link to="/product">
                      <CgSearch />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 pb-3 px-4">
              <div>
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-black transition">
                  Mattrass X
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
            <div className="block w-full py-1 text-center text-black font-bold bg-white border border-primary rounded-b hover:bg-transparent  hover:text-red-500 transition">
              Add to cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
