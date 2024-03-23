import React, { useEffect, useState } from "react";
import ModalCreate from "./ModalCreate";
import DeteteModal from "./DeteteModal";
import { getBrands, DeletBrand } from "../../services/brand";
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
  const [dataModalDelete, setDataModalDelete] = useState({});
  //set show modal delete
  const [showDelete, setShowDelete] = useState(false);
  //set data moi
  //const [dataDele,setDataDele] = useState({})

  //paginate

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit] = useState(3);

  const cofirmModalDelete = async () => {
    let response = await DeletBrand(dataModalDelete.id);
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
    setDataModalDelete(brand);
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
  useEffect(() => {
    fetchdata();
    // eslint-disable-next-line
  }, [currentPage]);

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
  };

 

  return (
    <div>
      <div className=" p-6 mb-1 bg-gray-200 min-h-48 m-24 items-center rounded-lg shadow-md">
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

        <div className="m-4 flex justify-end">
          <div className="flex items-center max-w-sm mx-auto">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                placeholder="Search...  "
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
          <button
            onClick={() => {
              HandleShowModalCreate(true);
              setAction("CREATE");
            }}
            type="button"
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Create Brand
          </button>
          <button
            type="button"
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Resest
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <table className="table-auto min-w-full divide-y divide-gray-200">
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
                              className="w-6 h-6 hover:text-red-800 text-red- dark:text-white"
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
                <tr>
                  <div></div>
                </tr>
              )}
            </tbody>
          </table>
          {totalPages > 0 && (
            <div className="flex items-center gap-4 p-5 float-end">
              <div className="flex items-center gap-4">
                <button onClick={()=>{handlePreviousPage()}}
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
                      stroke-linejoin="round"
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
                      class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        {i + 1}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                 onClick={()=>{handleNextPage()}}
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
                      stroke-linejoin="round"
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
