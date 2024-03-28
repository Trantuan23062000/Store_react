import React, { useState } from "react";
import toast from "react-hot-toast";
import { CreateImage } from "../../services/image";

const Form = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const isImage = (file) => {
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    return acceptedImageTypes.includes(file.type);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const HandleFileChange = (event) => {
    const invalidFiles = [];
    const fileSizeLimit = 5 * 1024 * 1024;
    const files = Array.from(event.target.files);
  
    if (selectedFiles.length >= 5) {
      toast.error("You can only select up to 5 files.");
      return;
    }
  
    files.forEach((file) => {
      if (!isImage(file)) {
        invalidFiles.push(file);
      } else if (file.size > fileSizeLimit) {
        invalidFiles.push(file);
      }
    });
  
    if (invalidFiles.length > 0) {
      invalidFiles.forEach((file) => {
        if (!isImage(file)) {
          toast.error(`${file.name} is not an image`);
        } else {
          toast.error(`${file.name} exceeds the size limit (5MB)`);
        }
      });
    } else {
      const remainingSlots = 5 - selectedFiles.length;
      const selectableFiles = files.slice(0, remainingSlots);
  
      // Tạo một mảng tên tệp đã chọn
      const selectedFileNames = selectedFiles.map((file) => file.name);
  
      // Loại bỏ tệp trùng lặp từ danh sách các tệp mới được chọn
      const uniqueFiles = selectableFiles.filter(
        (file) => !selectedFileNames.includes(file.name)
      );
  
      setSelectedFiles([...selectedFiles, ...uniqueFiles]);
    }
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image!");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("URL", file);
    });

    try {
      const response = await CreateImage(formData);
      console.log(response);
      if (response && response.data && response.data.EC === 0) {
        toast.success(response.data.EM);
        props.onClose();
      } else {
        toast.error(response.data.EM);
        props.onShow();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderSelectedImages = () => {
    if (selectedFiles.length === 0) {
      return <p>No images selected</p>;
    } else {
      return selectedFiles.map((file, item) => (
        <div key={item} className="relative inline-block">
          <img
            className="h-auto max-w-full rounded-lg"
            src={URL.createObjectURL(file)}
            alt={`Image ${item}`}
            width="200"
          />
          <button
            className="absolute top-2 right-2 p-1"
            onClick={() => handleRemoveImage(item)}
          >
            <svg
              className="w-6 h-6 hover:text-red-800 text-red-500 dark:text-white"
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
      ));
    }
  };

  return (
    <div>
      <div>
        <div className="overflow-x-hidden p-60 justify-center overflow-y-auto fixed inset-0 z-50 items-center">
          <div className="relative w-auto mx-auto max-w-3xl">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  CREATE Image
                </h3>
                <button
                  onClick={props.onClose}
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
                <div class="flex items-center justify-center w-full">
                  {renderSelectedImages()}
                </div>
                <div className="grid gap-4 mb-4 sm:grid-cols-1" metho>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      ImageURL
                    </label>
                    <input
                      multiple
                      onChange={HandleFileChange}
                      type="file"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Brand..."
                      value={selectedFiles.length === 0 ? "" : null}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row-reverse p-5">
                <button
                  onClick={props.onClose}
                  type="button"
                  className="text-red-600 hover:text-white border border-red-800 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-4 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                  Close
                </button>
                <button
                  onClick={() => handleSubmit()}
                  type="submit"
                  className="text-blue-600 hover:text-white border border-blue-800 hover:bg-blue-600   focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-4 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
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
  );
};

export default Form;
