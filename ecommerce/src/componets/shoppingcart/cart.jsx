import React from "react";
import { CgChevronRight,CgPushChevronRight,CgPushChevronLeft } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";


const Cart = () => {
  return (
    <div className="container mx-auto">
      <div className="py-4 flex items-center gap-3">
        <div className="text-primary text-base">
          <Link to="/">
            <FaHome />
          </Link>
        </div>
        <span className="text-sm text-gray-400">
          <CgChevronRight />
        </span>
        <p className="text-gray-600 font-medium">Cart</p>
      </div>

      <div className="col-span-9 space-y-4">
        <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
          <div className="w-28">
            <img
              src="images/product1.jpeg"
              alt="product 6"
              className="w-full"
            />
          </div>
          <div className="w-1/3">
            <h2 className="text-gray-800 text-xl font-medium uppercase">
              Nike air 1
            </h2>
            <p className="text-gray-500 text-sm">
              Availability: <span className="text-green-600">In Stock</span>
            </p>
          </div>
          <div className="text-primary text-lg font-semibold">$320.00</div>
          <div className=" flex justify-center mx-auto">
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  -
                </div>
                <div className="h-8 w-8 text-base flex items-center justify-center">
                  4
                </div>
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  +
                </div>
              </div>

          <div className="text-gray-600 cursor-pointer hover:text-primary">
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>

        <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
          <div className="w-28">
            <img
              src="images/product5.jpeg"
              alt="product 6"
              className="w-full"
            />
          </div>
          <div className="w-1/3">
            <h2 className="text-gray-800 text-xl font-medium uppercase">
              Adidas
            </h2>
            <p className="text-gray-500 text-sm">
              Availability: <span className="text-green-600">In Stock</span>
            </p>
          </div>
          <div className="text-primary text-lg font-semibold">$320.00</div>
          <div className=" flex justify-center mx-auto">
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  -
                </div>
                <div className="h-8 w-8 text-base flex items-center justify-center">
                  4
                </div>
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  +
                </div>
              </div>

          <div className="text-gray-600 cursor-pointer hover:text-primary">
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>

        <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
          <div className="w-28">
            <img
              src="images/product10.jpeg"
              alt="product 6"
              className="w-full"
            />
          </div>
          <div className="w-1/3">
            <h2 className="text-gray-800 text-xl font-medium uppercase">Luis Vuiton</h2>
            <p className="text-gray-500 text-sm">
              Availability: <span className="text-red-600">Out of Stock</span>
            </p>
          </div>
          <div className="text-primary text-lg font-semibold">$320.00</div>
          <div className=" flex justify-center mx-auto">
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  -
                </div>
                <div className="h-8 w-8 text-base flex items-center justify-center">
                  4
                </div>
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  +
                </div>
              </div>

          <div className="text-gray-600 cursor-pointer hover:text-primary">
            <i className="fa-solid fa-trash"></i>
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

export default Cart;
