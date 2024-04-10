import React, { useEffect, useState } from "react";
import { GetBrands, GetListImage } from "../../services/productImage";
import toast from "react-hot-toast";

const ModalEdit = (props) => {
  const [formData, setFormData] = useState(props.data);
  const [brand, setBrand] = useState({});
  const [images, setImages] = useState([]);

  const fetchBrand = async () => {
    const response = await GetBrands();
    if (response && response.data && response.data.EC === 0) {
      // console.log(response.data.DT);
      setBrand(response.data.DT);
    } else {
      toast.error(" Get Brands Erorr");
    }
  };

  const fetchImage = async () => {
    const response = await GetListImage();
    if (response && response.data && response.data.EC === 0) {
      setImages(response.data.images.images);
    } else {
      toast.error("Get list Image error !");
    }
  };

  // Lấy đường dẫn URL từ mảng lưu trong trường URL của bảng Image
  const getImageUrl = (imageId) => {
    const image = images.find((image) => image.id === imageId);
    return image ? image.URL : null;
  };

  // Xoá hình ảnh từ mảng images và cập nhật lại URL
  const removeImage = (index) => {
    const newImages = [...images];
    const removedImageUrl = newImages.splice(index, 1)[0].URL; // Xoá phần tử và lấy URL của phần tử bị xoá
    setImages(newImages);

    // Cập nhật lại formData.imageId nếu phần tử bị xoá là phần tử được chọn
    if (formData.imageId === index) {
      const updatedImageUrl =
        newImages.length > 0
          ? JSON.stringify(newImages.map((image) => image.URL))
          : null;
      setFormData((prevData) => ({
        ...prevData,
        imageId: updatedImageUrl,
      }));
    }
  };

  useEffect(() => {
    fetchImage();
    fetchBrand();
  }, []);
  return (
    <div>
      <div>
        <div>
          <div className="overflow-x-hidden p-24 justify-center overflow-y-auto fixed inset-0 z-50 items-center">
            <div className="relative w-auto mx-auto max-w-3xl">
              <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Edit ProductImage
                  </h3>
                  <button
                    onClick={() => {
                      props.close();
                    }}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-center"></div>
                  <div className="grid gap-6 mb-4 md:grid-cols-3">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Name Product
                      </label>
                      <input
                        value={formData.name}
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter name product..."
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Price
                      </label>
                      <input
                        value={formData.price}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Price..."
                        name="price"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Quantity
                      </label>
                      <input
                        value={formData.price}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Quantity"
                        name="quantity"
                      />
                    </div>
                    <div>
                      <label
                        for="phone"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <select
                        value={formData.category}
                        name="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>Choose category</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Both men and women">
                          Both men and women
                        </option>
                      </select>
                    </div>
                    <div>
                      <label
                        for="phone"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Brand
                      </label>
                      <select
                        value={formData.brandId}
                        name="brandId"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>Choose brand</option>
                        {brand &&
                          brand.length > 0 &&
                          brand.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Image
                      </label>
                      <input
                        multiple
                        type="file"
                        accept="image/*"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Image"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 mb-1 sm:grid-cols-1">
                    <div className="flex items-center justify-center w-full">
                      {typeof getImageUrl(formData.imageId) === "string" &&
                        JSON.parse(getImageUrl(formData.imageId)).map(
                          (url, index) => (
                            <div key={index} className="relative">
                              <img
                                src={url}
                                alt={`Image Preview ${index}`}
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  marginRight: "10px",
                                }}
                              />
                              <button
                                className="absolute top-2 right-2 p-1"
                                onClick={() => removeImage(index)}
                              >
                                <svg
                                  className="w-6 h-6 hover:text-red-800 text-red-600 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          )
                        )}
                    </div>
                  </div>

                  <div className="grid gap-4 mb-4 sm:grid-cols-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Description
                    </label>
                    <textarea
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your thoughts here..."
                      name="description"
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-row-reverse p-1">
                  <button
                    onClick={() => {
                      props.close();
                    }}
                    type="button"
                    className="text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="text-blue-600 hover:text-white border border-blue-800 hover:bg-blue-600   focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                  >
                    UPLOAD
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
