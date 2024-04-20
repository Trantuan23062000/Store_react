import React, { useState } from "react";
import { CgClose } from "react-icons/cg";

const ProductImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    <div>
      <div>
      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="p-4 max-2xl">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 m-2 p-2 bg-gray-300 hover:bg-gray-400 rounded-full"
            >
              <CgClose size={24} />
            </button>
            <img src={selectedImage} alt="Selected" className="w-full" />
          </div>
        </div>
      )}
        <img
          src="images/product1.jpeg"
          alt="product"
          onClick={() => openModal("images/product1.jpeg")}
          className="w-full duration-300 ease-in-out transform hover:scale-105"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <img
            src="images/product2.jpeg"
            alt="product2"
            className="w-full cursor-pointer border border-primary duration-300 ease-in-out transform hover:scale-105"
            onClick={() => openModal("images/product2.jpeg")}
          />
          <img
            src="images/product3.jpeg"
            alt="product2"
            className="w-full cursor-pointer border duration-300 ease-in-out transform hover:scale-105"
            onClick={() => openModal("images/product3.jpeg")}
          />
          <img
            src="images/product4.jpeg"
            alt="product2"
            className="w-full cursor-pointer border duration-300 ease-in-out transform hover:scale-105"
            onClick={() => openModal("images/product4.jpeg")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
