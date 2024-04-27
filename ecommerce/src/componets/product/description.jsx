import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  selectSelectedProduct,
  setSelectedProduct, // Import action từ slice của bạn
} from "../../redux/slices/ productSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchRelated } from "../../redux/slices/relatedProduct";

const Description = () => {
  const [initialized, setInitialized] = useState(false);
  const data = useSelector(selectSelectedProduct);
  const dispatch = useDispatch(); // Lấy hàm dispatch từ Redux store
  const { dataRelated } = useSelector((state) => state.dataRelated); // Lấy trạng thái từ store

  // Khôi phục dữ liệu từ localStorage khi component được render lại sau khi reload trang
  useEffect(() => {
    if (!initialized) {
      const storedProduct = localStorage.getItem("selectedProductDrawer");
      const related = localStorage.getItem("selectedProductDrawer");
      if (related) {
        dispatch(fetchRelated(JSON.parse(related)));
      }
      if (storedProduct) {
        dispatch(setSelectedProduct(JSON.parse(storedProduct)));
      }
      setInitialized(true);
    }
    // eslint-disable-next-line
  }, [initialized]);

  useEffect(() => {
    JSON.parse(
      localStorage.getItem("selectedProductDrawer")
    );
    dispatch(fetchRelated());

    // eslint-disable-next-line
  }, [dispatch]);

  const handleProductSelect = (item) => {
    localStorage.setItem("selectedProductDrawer", JSON.stringify(item));
    window.location.reload();
  };

  if (!data || !dataRelated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="border-b sm:mx-auto border-gray-200 pb-2 pt-2 ">
        <div className="mx-auto text-center items-center justify-center">
          <h2 className="text-3xl font-medium uppercase mb-2 items-center justify-center">
            {data.Product.name}
          </h2>
          <div className="">
            <div className="flex justify-center text-yellow-400">
              <span>
                <FaStar />
              </span>
              <span>
                <FaStar />
              </span>
              <span>
                <FaStar />
              </span>
              <span>
                <FaStar />
              </span>
              <span>
                <FaStar />
              </span>
              <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              <span className="text-green-600">{data.Product.status}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">
                Brand:{data.Product.Brand.name}{" "}
              </span>
              <span className="text-gray-600"></span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Category: </span>
              <span className="text-gray-600">{data.Product.category}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">SKU: </span>
              <span className="text-gray-600">
                {data.productVariant.Size.description}
              </span>
            </p>
          </div>
          <div className="flex justify-center mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">
              ${data.Product.price}
            </p>
            <p className="text-base text-gray-400 line-through">$55.00</p>
          </div>

          <div className="flex justify-center text-center items-center gap-2 mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Size:</h3>
            {React.Children.toArray(dataRelated.map((item)=>(
                  <div onClick={() => handleProductSelect(item)} className="flex justify-center text-center items-center gap-2">
                  <div className="size-selector">
                  <Link to={{ pathname: `/product/${item.id}` }}>
                    <input
                      type="radio"
                      name="size"
                      id="size-xs"
                      className="hidden"

                    />
                    <label
                      htmlFor="size-xs"
                      className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                    >
                      {item.productVariant.Size.size.substring(2)}
                    </label>
                    </Link>
                  </div>
                 
                </div>
            )))}
          </div>
          <div className="mt-4 ">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
              Color
            </h3>
            <div className="justify-center text-center items-center flex">
              {React.Children.toArray(
                dataRelated.map((item) => (
                  <div
                    onClick={() => handleProductSelect(item)}
                    className="color-selector"
                  >
                    <Link to={{ pathname: `/product/${item.id}` }}>
                    <input
                      type="radio"
                      name="color"
                      id="red"
                      className="hidden"
                    />
                    <label
                      htmlFor="red"
                      className="border border-gray-200 rounded-full h-6 w-6  cursor-pointer shadow-sm block"
                      style={{
                        backgroundColor: `${item.productVariant.Color.codeColor}`,
                      }}
                    >
                      
                    </label>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">
              Quantity: {data.productVariant.quantity}
            </h3>
          </div>
        </div>

        <div className="flex border-b sm:mx-auto border-gray-200 pb-2 pt-2">
          <h3 className="border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
            Details:
          </h3>
          <div className="w-3/4 pt-6">
            <div className="text-gray-600">
              <p>{data.Product.description}</p>
            </div>

            <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
              <tbody>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                    Color
                  </th>
                  <th className="py-2 px-4 border border-gray-300">
                    {data.productVariant.Color.color}
                  </th>
                </tr>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                    Brand
                  </th>
                  <th className="py-2 px-4 border border-gray-300">
                    {data.Product.Brand.name}
                  </th>
                </tr>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                    Size 
                  </th>
                  <th className="py-2 px-4 border border-gray-300">
                    {data.productVariant.Size.size}
                  </th>
                </tr>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                    Size details
                  </th>
                  <th className="py-2 px-4 border border-gray-300">
                    {data.productVariant.Size.description}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3 sm:mx-auto pb-5 pt-5">
          <div className="bg-black text-white px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:bg-yellow-500 hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-120">
            <FaShoppingCart /> Add to cart
          </div>
          <div className="bg-black text-white px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:bg-yellow-500 hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-120">
            <FaHeart /> Wishlist
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
