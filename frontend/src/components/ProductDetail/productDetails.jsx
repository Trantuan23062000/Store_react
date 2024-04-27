import React, { useEffect, useState } from "react";
import { GetProductDetails,SearchProductDetails } from "../../services/productDetails";
import toast from "react-hot-toast";
import CreateDetails from "./createDetails";
import EditDetails from "./editDetails";
import Delete from "./delete";
const ProductDetails = () => {
  const [data, setData] = useState([]);
  const [details, setDetais] = useState({});
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit] = useState(5);

  const [key, setKey] = useState("");

  const fetchSearch = async () => {
    if (key !== "") {
      try {
        const response = await SearchProductDetails(key);
        //console.log(response.data.Details);
        if (response.data.EC === 0) {
          setData(response.data.Details
          )
        } else {
          setData([]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setData([]);
    }
  };

  const fetchData = async () => {
    const response = await GetProductDetails(currentPage, currentLimit);
    //console.log(response);
    console.log(response);
    if (response && response.data && response.data.EC === 0) {
      setData(response.data.productDetails);
      setTotalPages(response.data.totalPages);
    } else {
      toast.error("Data not Error!");
    }
  };

  const handleChangPage = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const HandleEdit = (data) => {
    setDetais(data);
    setShowEdit(true);
  };

  const HandleDelete = (data) => {
    setDetais(data);
    setShowDelete(true);
  };

  const HandleCloseDelete = () => {
    setShowDelete(false);
  };

  useEffect(() => {
    if (key !== "") {
      fetchSearch();
    } else {
      fetchData();
    }
    // eslint-disable-next-line
  }, [currentPage,key]);

  return (
    <div>
      {show ? (
        <CreateDetails
          show={handleShow}
          close={handleClose}
          fetch={fetchData}
        />
      ) : null}
      {showEdit ? (
        <EditDetails
          show={handleShowEdit}
          close={handleCloseEdit}
          data={details}
          fetch={fetchData}
        />
      ) : null}

      {showDelete ? (
        <Delete
          show={HandleDelete}
          close={HandleCloseDelete}
          data={details}
          fetch={fetchData}
        />
      ) : null}
      
      <div className="p-2 px-0">
        <div className="flex justify-between">
          <div className="">
            <input
             value={key}
             onChange={(e) => setKey(e.target.value)}
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
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {React.Children.toArray(data && data.length > 0 ? (
              data.map((item, index) => (
                <>
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {(currentPage - 1) * currentLimit + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      {item.Product ? item.Product.name : ""}
                    </td>
                    <td className="px-6 py-4">
                      {item.productVariant ? item.productVariant.Color.color : ""}
                    </td>
                    <td className="px-6 py-4">
                      {item.productVariant ? item.productVariant.Size.size : ""}
                    </td>
                    <td className="px-6 py-4">
                      {item.productVariant ? item.productVariant.quantity : ""}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => HandleEdit(item)} type="button">
                        <svg
                          className="w-6 h-6 hover:text-amber-800 text-yellow-400 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                          />
                        </svg>
                      </button>
                      <button type="button" onClick={() => HandleDelete(item)}>
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
                    </td>
                  </tr>
                </>
                ))
            ) : (
              <>
                <tr>
                  <td className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    No data
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

        {totalPages > 0 && (
          <div className="flex items-center gap-4 p-5 float-end">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  handlePreviousPage();
                }}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
                Previous
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handleChangPage(i + 1)}
                    disabled={currentPage === i + 1}
                    class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-slate-400 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      {i + 1}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  handleNextPage();
                }}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </button>
            </div>
            <span>Page {currentPage} of {totalPages}</span>
          </div>
        
        )}
          
      </div>
    </div>
  );
};

export default ProductDetails;
