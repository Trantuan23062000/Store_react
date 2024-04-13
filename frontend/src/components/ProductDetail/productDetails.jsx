import React, { useEffect, useState } from "react";
import { GetProductDetails } from "../../services/productDetails";
import toast from "react-hot-toast";
import CreateDetails from "./createDetails";
const ProductDetails = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const fetchData = async () => {
    const response = await GetProductDetails();
    if (response && response.data && response.data.EC === 0) {
      setData(response.data.details);
    } else {
      toast.error("Data not Error!");
    }
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {show ? <CreateDetails show={handleShow} close={handleClose} /> : null}
      <div className="p-6 px-0">
        <div className="flex justify-between">
          <div className="">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mx-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search...  "
            />
          </div>
          <button
            onClick={() => handleShow()}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Create Product
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Size
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <>
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">
                      {item.Product ? item.Product.name : ""}
                    </td>
                    <td className="px-6 py-4">
                      {item.productVariant ? item.productVariant.color : ""}
                    </td>
                    <td className="px-6 py-4">
                      {item.productVariant ? item.productVariant.codeColor : ""}
                    </td>
                    <td className="px-6 py-4">
                      {item.productVariant
                        ? item.productVariant.description
                        : ""}
                    </td>
                    <td className="px-6 py-4">
                      {item.productVariant ? item.productVariant.quantity : ""}
                    </td>
                    <td className="px-6 py-4">Edit </td>
                  </tr>
                </>
              ))
            ) : (
              <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  No data
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetails;
