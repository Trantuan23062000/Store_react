import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { EditImage } from "../../services/image";

const FormEdit = (props) => {
  const { data } = props;
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (data && data.URL) {
      setSelectedFile(data.URL);
    }
  }, [data]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select an image!");
      return;
    }

    if (!data || !data.id) {
      toast.error("Invalid ID!");
      return;
    }

    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("image", selectedFile);

    try {
      const response = await EditImage(formData);
      console.log(response);
      if (response && response.data && response.data.EC === 0) {
        toast.success(response.data.success);
        props.onClose();
        props.fetchData();
      } else {
        toast.error(response.data.error);
        props.onShow();
      }
    } catch (error) {
      console.log(error);
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
                  UPDATE IMAGE
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

              <div className="flex items-center justify-center w-full">
                {selectedFile && (
                  <div className="relative inline-block">
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={selectedFile instanceof File ? URL.createObjectURL(selectedFile) : selectedFile}
                      alt="Selected Image"
                      width="200"
                      onError={() => setSelectedFile(null)} // Handle error loading image
                    />
                  </div>
                )}
              </div>

              <div className="grid gap-4 mb-4 sm:grid-cols-1">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Image
                  </label>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
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
                  onClick={handleSubmit}
                  type="submit"
                  className="text-blue-600 hover:text-white border border-blue-800 hover:bg-blue-600   focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-4 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                  UPDATE
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

export default FormEdit;
