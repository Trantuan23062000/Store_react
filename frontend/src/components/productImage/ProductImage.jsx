import React, { useEffect, useState } from "react";
import ModalCreate from "./ModalCreate";
import { GetListProduct, SearchProduct } from "../../services/productImage";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./modalDelete";

const ProductImage = () => {
  const [product, setProduct] = useState({});
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [ShowDelete, setShowDelete] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit] = useState(5);

  const [key, setKey] = useState("");

  const fetchSearch = async () => {
    if (key !== "") {
      try {
        const response = await SearchProduct(key);
        if (response.data.EC === 0) {
          setData(response.data.product);
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
    const response = await GetListProduct(currentPage, currentLimit);
    if (response && response.data && response.data.EC === 0) {
      //console.log(response.data.Product);
      setData(response.data.Product);
      setTotalPages(response.data.totalPages);
    }
  };
  useEffect(() => {
    if (key !== "") {
      fetchSearch();
    } else {
      fetchData();
    }
    // eslint-disable-next-line
  }, [currentPage, key]);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const HandleShowEdit = () => {
    setShowEdit(true);
  };

  const HandleCloseEdit = () => {
    setShowEdit(false);
  };

  const handleEdit = (data) => {
    setProduct(data);
    setShowEdit(true);
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const Delete = (data) => {
    setProduct(data);
    setShowDelete(true);
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

  return (
    <div>
      {show ? (
        <ModalCreate show={handleShow} close={handleClose} fetch={fetchData} />
      ) : null}
      {showEdit ? (
        <ModalEdit
          show={HandleShowEdit}
          close={HandleCloseEdit}
          data={product}
          fetch={fetchData}
        />
      ) : null}
      {ShowDelete ? (
        <ModalDelete
          show={handleShowDelete}
          close={handleCloseDelete}
          data={product}
          fetch={fetchData}
        />
      ) : null}
      <div className="p-6 px-0">
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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                STT
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Name
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Image
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Price
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Status
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Brand
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <>
                  <tr key={item.id}>
                    <td className="p-4 border-blue-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            {(currentPage - 1) * currentLimit + index + 1}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 flex">
                      {item.Image && item.Image.URL ? (
                        JSON.parse(item.Image.URL).map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            style={{
                              width: "30px",
                              height: "auto",
                              margin: "1px",
                            }}
                          />
                        ))
                      ) : (
                        <p>No image available</p>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="w-max">
                        {item.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </div>
                    </td>
                    <td className="p-4">{item.status}</td>
                    <td className="p-4">{item.Brand.name}</td>
                    <td className="p-4">
                      <button onClick={() => handleEdit(item)} type="button">
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
                      <button onClick={() => Delete(item)} type="button">
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
                <div> No data</div>
              </>
            )}
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
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
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
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </button>
            </div>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
