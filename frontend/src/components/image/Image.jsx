import React, { useEffect, useState } from "react";
import Form from "./Form";
import { GetImage } from "../../services/image";
import toast from "react-hot-toast";

const Image = () => {
  const [show, SetShow] = useState(false);
  const [image, setImage] = useState([]);
  const[action,setAction] = useState('CREATE')
  const [data,setData] = useState({})

  const [page, setPage] = useState(1);
  const [pageSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);


  const fetchImage = async () => {
    const respone = await GetImage(page,pageSize);
   // console.log(respone.data.images.totalImages);
   //console.log(respone.data.images.images);
    if (respone && respone.data && respone.data.EC === 0) {
      //console.log(respone);
      setImage(respone.data.images.images);
      setTotalPages(Math.ceil(respone.data.images.totalImages / pageSize));
    } else {
      toast.error(respone.data.EM);
    }
  };

  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line
  }, [page,pageSize]);

  const handleShow = () => {
    SetShow(true);
  };

  const handleClose = () => {
    SetShow(false);
    setData({})
    
  };

  const handleEdit = (image) =>{
    setData(image)
    SetShow(true)
    setAction("UPDATE")
  }

  return (
    <div>
      {show ? <Form onClose={handleClose} data={data} onShow={handleShow} fetchData = {fetchImage} action={action} /> : null}
      <div>
        <div className=" p-6 mb-1 bg-gray-200 min-h-48 m-24 items-center rounded-lg shadow-md">
          <div className="flex justify-between">
            <div className="">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mx-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search...  "
              />
            </div>
            <button
              onClick={() => {SetShow(true); setAction("CREATE")}}
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
                  fillRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                  clipRule="evenodd"
                />
              </svg>
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
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image
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
                {image && image.length > 0 ? (
                  <>
                    {image.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                          {item.URL.length > 30 ? `${item.id.substring(0, 30)}...` : item.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <img
                              class="rounded-lg w-20 h-20"
                              src={item.URL}
                              alt=""
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button type="button" onClick={()=>{handleEdit(item)}}>
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
                            <button type="button">
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
                  <tr>
                    <div></div>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex items-center gap-4 p-5 float-end">
              <div className="flex items-center gap-4">
                <button
                disabled={page === 1} onClick={() => setPage(prevPage => prevPage - 1)}
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
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                 
                    className="relative h-5 max-h-[40px] w-5 max-w-[40px] select-none rounded-full bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-50 hover:bg-slate-100 hover:text-black transition-all hover:shadow-gray-200 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.5] active:bg-white focus:outline-none focus:ring focus:ring-yellow-600"
                    type="button"
                  >
                    <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{index+1}</span>
                  </button>
                ))}
                </div>
                <button
                disabled={page === totalPages} onClick={() => setPage(prevPage => prevPage + 1)}
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
              <span>Page {page} of {totalPages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
