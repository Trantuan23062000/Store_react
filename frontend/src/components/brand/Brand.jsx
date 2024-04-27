import React, { useEffect, useState } from "react";
import ModalCreate from "./ModalCreate";
import DeteteModal from "./DeteteModal";
import { getBrands, DeletBrand, SearchBrand } from "../../services/brand";
import toast from "react-hot-toast";

const Brand = () => {
  //set modal show dataBrand
  const [showModalCreate, setShowModalCreate] = useState(false);
  //data
  const [listbrand, setListBrand] = useState([]);
  //xet deu kien bien action
  const [action, setAction] = useState("CREATE");
  //khoi tao du lieu data create
  const [data, setData] = useState({});
  //set show modal delete
  const [showDelete, setShowDelete] = useState(false);
  //set data moi

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit] = useState(3);
  //paginate

  const [key, setKey] = useState("");

  const fetch = async () => {
    if (key !== "") {
      try {
        const res = await SearchBrand(key);
        setListBrand(res.data.DT);
      } catch (error) {
        console.log(error);
      }
    } else {
      setListBrand([]);
    }
  };

  useEffect(() => {
    fetchdata();
    fetch();
    // eslint-disable-next-line
  }, [currentPage, key]);

  const cofirmModalDelete = async () => {
    let response = await DeletBrand(data.id);
    if (response && response.data.EC === 0) {
      toast.success(response.data.EM);
      setShowDelete(false);
      fetchdata();
    } else {
      toast.error(response.data.EM);
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

  const handdleShowDelete = (brand) => {
    //setDataModalDelete(brand);
    setShowDelete(true);
    setData(brand);
  };

  const closeDelete = () => {
    setShowDelete(false);
  };

  const fetchdata = async () => {
    let response = await getBrands(currentPage, currentLimit);
    //console.log(response);
    //console.log(response);
    if (response && response.data && response.data.EC === 0) {
      setTotalPages(response.data.DT.totalPages);
      setListBrand(response.data.DT.brand);
    }
  };

  const HandleShowModalCreate = () => {
    setShowModalCreate(true);
  };

  const CloseModalCreate = () => {
    setShowModalCreate(false);
    setData({});
  };

  const HandleEdit = (brand) => {
    setData(brand);
    setShowModalCreate(true);
    setAction("UPDATE");
    //console.log(setData(brand));
  }
  return (
    <div>
      <div className="p-2 px-0">
        {showDelete ? (
          <DeteteModal
            onclose={closeDelete}
            onCofirm={cofirmModalDelete}
            data={data}
          />
        ) : null}
        {showModalCreate ? (
          <ModalCreate
            HandleShowModalCreate={HandleShowModalCreate}
            CloseModalCreate={CloseModalCreate}
            fetchdata={fetchdata}
            action={action}
            data={data}
          />
        ) : null}
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
            onClick={() => {
              HandleShowModalCreate(true);
              setAction("CREATE");
            }}
            type="button"
            className="py-2.5 px-5 me-2 mb-2"
          >
            <svg
              className="w-[30px] h-[30px] text-gray-800 hover:text-slate-400 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  STT
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {listbrand && listbrand.length > 0 ? (
                <>
                  {listbrand.map((item, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {(currentPage - 1) * currentLimit + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {" "}
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              HandleEdit(item);
                            }}
                            type="button"
                          >
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
                          <button
                            type="button"
                            onClick={() => handdleShowDelete(item)}
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
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                null
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brand;
