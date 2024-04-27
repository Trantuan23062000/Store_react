import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import {
  selectSelectedProduct,
  setSelectedProduct // Import action từ slice của bạn
} from "../../redux/slices/ productSlice";
import { useSelector, useDispatch } from "react-redux";

const ProductImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const selectedProduct = useSelector(selectSelectedProduct);
  const dispatch = useDispatch(); // Lấy hàm dispatch từ Redux store

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  useEffect(() => {
    if (selectedImage) {
      localStorage.setItem("selectedProductImage", JSON.stringify(selectedImage)); // Lưu selectedProductImage vào localStorage
    }
  }, [selectedImage]);

  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProductDrawer");
    if (storedProduct) {
      dispatch(setSelectedProduct(JSON.parse(storedProduct)));
    }
  }, [dispatch]);


  // Hàm để chọn sản phẩm và dispatch vào Redux store
  const handleProductSelect = (product) => {
    dispatch(setSelectedProduct(product));
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (!selectedProduct || !selectedProduct.Product) {
    return <div>Loading...</div>;
  }

  const secondToFourthImageURLs = JSON.parse(selectedProduct.Product.Image.URL).slice(1, 4);

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
          src={JSON.parse(selectedProduct.Product.Image.URL)[0]}
          alt="product"
          style={{ width: "800px", height: "600px" }}
          onClick={() => {
            handleProductSelect(selectedProduct);
            openModal(JSON.parse(selectedProduct.Product.Image.URL)[0]);
          }}
          className="w-full duration-300 ease-in-out transform hover:scale-105"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {secondToFourthImageURLs.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`product${index + 2}`}
               // Tên alt có thể cần được chỉnh sửa tùy thuộc vào yêu cầu của bạn
              className="w-full cursor-pointer border border-primary duration-300 ease-in-out transform hover:scale-105"
              onClick={() => {
                handleProductSelect(selectedProduct);
                openModal(url);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
