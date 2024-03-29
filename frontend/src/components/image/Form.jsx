import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CreateImage, EditImage } from "../../services/image";

const Form = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({});
  const [maxFiles, setMaxFiles] = useState(1);

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
    const files = Array.from(event.target.files);
    const invalidFiles = [];
    const fileSizeLimit = 5 * 1024 * 1024;

    // Tính số lượng tệp mới có thể thêm vào
    const remainingSlots = 5 - selectedFiles.length;

    // Lấy tệp mới có thể thêm vào (tối đa là remainingSlots)
    const selectableFiles = files.slice(0, remainingSlots);

    if (props.action === "CREATE") {
      if (selectedFiles.length + files.length > 5) {
        toast.error("You can only select up to 5 files.");
        return;
      }
    }
    const newSelectedFiles = [...selectedFiles];
    files.forEach((file) => {
      if (!isImage(file)) {
        toast.error(`${file.name} is not an image`);
      } else if (file.size > fileSizeLimit) {
        toast.error(`${file.name} exceeds the size limit (5MB)`);
      } else {
        newSelectedFiles.push(file);
      }
    });

    selectableFiles.forEach((file) => {
      if (!isImage(file)) {
        toast.error(`${file.name} is not an image`);
      } else if (file.size > fileSizeLimit) {
        toast.error(`${file.name} exceeds the size limit (5MB)`);
      } else {
        // Thêm tệp mới vào danh sách đã chọn
        setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
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
      const remainingSlots =
        props.action === "CREATE" ? 5 - selectedFiles.length : 1;
      const selectableFiles = files.slice(0, remainingSlots);

      const selectedFileNames = selectedFiles.map((file) => file.name);

      const uniqueFiles = selectableFiles.filter(
        (file) => !selectedFileNames.includes(file.name)
      );

      setSelectedFiles([...selectedFiles, ...uniqueFiles]);
    }
  };

  useEffect(() => {
    if (props.action === "UPDATE" && props.data && props.data.URL) {
      setSelectedFiles([props.data.URL]);
    } else {
      setSelectedFiles([]);
    }
    setFormData(props.data || {});
    setMaxFiles(props.action === "UPDATE" ? 1 : 5);
  }, [props.action, props.data]);

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image!");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await CreateImage(formData);
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

  const renderSelectedImages = () => {
    if (selectedFiles.length === 0) {
      return <p>No images selected</p>;
    } else {
      return selectedFiles.map((file, index) => (
        <div key={index} className="relative inline-block">
          <img
            className="h-auto max-w-full rounded-lg"
            src={file instanceof File ? URL.createObjectURL(file) : file}
            alt={`Image ${index}`}
            width="200"
          />
          {props.action === "CREATE" && (
            <button
              className="absolute top-2 right-2 p-1"
              onClick={() => handleRemoveImage(index)}
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
          )}
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
                  {props.action === "CREATE" ? "CREATE IMAGE" : "EDIT IMAGE"}
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
                <div className="flex items-center justify-center w-full">
                  {renderSelectedImages()}
                </div>
                <div className="grid gap-4 mb-4 sm:grid-cols-1">
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
                      max={maxFiles}
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
                  {props.action === "CREATE" ? "UPLOAD" : "UPDATE"}
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
