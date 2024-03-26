import React, { useEffect, useState } from "react";
import { GetBrand, CreateProduct } from "../../services/product";
import _ from "lodash";
import toast from "react-hot-toast";
import { UpdateProduct } from "../../services/product";

const ModalCreate = (props) => {
  const [dataBrand, setDataBrand] = useState({});
  const [brandGroup,setBrandGroup] = useState([])
  const dataProduct = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    brand: "",
  };

  const { action, dataPr } = props;

  const [data, setData] = useState(dataProduct);

  const validInput = {
    name: true,
    description: true,
    price: true,
    quantity: true,
    category: true,
    brand: true,
  };

  const [valid, setValid] = useState(validInput);

  const handleChangeInput = (value, name) => {
    let _data = _.cloneDeep(data);
    _data[name] = value;
    setData(_data);
  };

  const checkInput = () => {
    setValid(validInput);
    let arr = ["name", "description", "price", "quantity", "category", "brand"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!data[arr[i]]) {
        let _valid = _.cloneDeep(validInput);
        _valid[arr[i]] = false;
        setValid(_valid);
        toast.error(`${arr[i]} is required !`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleSubmit = async () => {
    let check = checkInput();
    if (check === true) {
      let response = action === "CREATE"?  await CreateProduct({
        ...data,
        brandId: data["brand"],
      }):await UpdateProduct({
        ...data,
        brandId: data["brand"],
      }) 
      if(response.data && response.data.EC === 0){
        props.onClose()
         setData({...data,brand:brandGroup && brandGroup.length>0?brandGroup[0].id:''})
      }
      if (response.data && response.data.EC !== 0) {
        let _valid = _.cloneDeep(valid);
        _valid[response.data.DT] = false;
        setValid(_valid);
        props.onShow()
        toast.error(response.data.EM);
      } else {
        toast.success(response.data.EM);
        props.onClose();
      }
      props.fectch();
    }
  };

  const fectchBrand = async () => {
    const response = await GetBrand();
    if (response && response.data && response.data.EC === 0) {
      setDataBrand(response.data.DT);
      //console.log(response.data.DT);
    }
  };
  useEffect(() => {
    if (action === "UPDATE") {
      setData({ ...dataPr,brand:dataPr.brandId, brand: dataPr.Brand.name ? dataPr.Brand.id : "" })
    }
    //console.log({brand:dataPr.brandId});

    fectchBrand();
    // eslint-disable-next-line
    //console.log(data);
    // eslint-disable-next-line
  }, [dataPr]);

  return (
    <div>
      <div className="overflow-x-hidden p-60 justify-center overflow-y-auto fixed inset-0 z-50 items-center">
        <div className="relative w-auto mx-auto max-w-4xl">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {action === "CREATE" ? "Create new Product" : "Edit Product"}
              </h3>
              <button
                onClick={() => {
                  props.onClose();
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
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    disabled={action === 'CREATE'?false:true}
                    value={data.name}
                    onChange={(event) =>
                      handleChangeInput(event.target.value, "name") || ''
                    }
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Name product..."
                  />
                  {action === "UPDATE" ? <span className="align-center text-red-500 m-2 p-1">No edit name</span> :null}
                </div>
               
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    onChange={(event) =>
                      handleChangeInput(event.target.value, "description")
                    }
                    value={data.description}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Description..."
                  />
                </div>
              </div>
              <div className="grid gap-4 mb-4 sm:grid-cols-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    onChange={(event) =>
                      handleChangeInput(event.target.value, "price")
                    }
                    value={data.price}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Price..."
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quantity
                  </label>
                  <input
                    onChange={(event) =>
                      handleChangeInput(event.target.value, "quantity")
                    }
                    value={data.quantity}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Brand..."
                  />
                </div>
                <tr>
                  <div className="max-w-sm mx-auto">
                    <label
                      for="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select an option
                    </label>
                    <select
                      onChange={(event) =>
                        handleChangeInput(event.target.value, "category")
                      }
                      value={data.category}
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Choose a Category</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Both men and women">
                        Both men and women
                      </option>
                    </select>
                  </div>
                </tr>
                <div>
                  <div className="max-w-sm mx-auto">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Select name brand
                    </label>
                    <select
                      value={data.brand}
                      onChange={(event) =>
                        handleChangeInput(event.target.value, "brand")
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {dataBrand &&
                        dataBrand.length > 0 &&
                        dataBrand.map((item, index) => {
                          return (
                            <option
                              key={`group-${index}`}
                              value={item.id}
                              selected
                            >
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse p-5">
              <button
                onClick={() => {
                  props.onClose();
                }}
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
                {action === "CREATE" ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default ModalCreate;
