import React from "react";

const Category = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="py-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          shop by category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-110 ">
            <img
              src="/images/category-1.jpg"
              alt="category 1"
              className="w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
              Bedroom
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-110 ">
            <img
              src="/images/category-2.jpg"
              alt="category 1"
              className="w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
              Mattress
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-110 ">
            <img
              src="/images/category-3.jpg"
              alt="category 1"
              className="w-full"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
            >
              Outdoor
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-110 ">
            <img
              src="/images/category-4.jpg"
              alt="category 1"
              className="w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
              Sofa
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-110 ">
            <img
              src="/images/category-5.jpg"
              alt="category 1"
              className="w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
              Living Room
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-110 ">
            <img
              src="/images/category-6.jpg"
              alt="category 1"
              className="w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
              Kitchen
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
