import React, { useEffect, useState } from "react";
import { GetBrands } from "../../api/shop/getproduct";
import { GetSize } from "../../api/shop/getsize";
import { GetColor } from "../../api/shop/getcolor";

const Filter = () => {
  const [dataBrand, setDataBrand] = useState([]);
  const [size, setSize] = useState([]);
  const [color,setColor] = useState([])
  
  const fetchBrand = async () => {
    const response = await GetBrands();
    if(response && response.data && response.data.EC === 0){
      setDataBrand(response.data.DT)
    }
  };

  const fetchSize = async () => {
    const response = await GetSize();
    if(response && response.data && response.data.EC === 0){
      setSize(response.data.size)
    }
  };

  const fetchColor = async()=>{
    const response = await GetColor()
    if(response && response.data && response.data.EC === 0){
      setColor(response.data.color)
    }
  }
 
  useEffect(()=>{
    fetchBrand()
    fetchSize();
    fetchColor()
    // eslint-disable-next-line
  },[])
  return (
    <div>
      <div className="text-center">
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
          <div className="divide-y divide-gray-200 space-y-5">
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="cat-1"
                    id="cat-1"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-1"
                    className="text-gray-600 ml-3 cusror-pointer"
                  >
                    Men
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(15)</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="cat-2"
                    id="cat-2"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-2"
                    className="text-gray-600 ml-3 cusror-pointer"
                  >
                    Wonman
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(9)</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="cat-3"
                    id="cat-3"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-3"
                    className="text-gray-600 ml-3 cusror-pointer"
                  >
                    Men & Wonmen
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(21)</div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Brands
              </h3>
              <div className="space-y-2">
              {React.Children.toArray(dataBrand.map((item)=>(
                <>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="brand-1"
                    id="brand-1"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="brand-1"
                    className="text-gray-600 ml-3 cusror-pointer"
                  >
                    {item.name}
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(15)</div>
                </div>
                </>
              )))}
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Price
              </h3>
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  name="min"
                  id="min"
                  className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                  placeholder="min"
                />
                <span className="mx-3 text-gray-500">-</span>
                <input
                  type="text"
                  name="max"
                  id="max"
                  className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                  placeholder="max"
                />
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                size
              </h3>
              <div className="flex justify-center text-center gap-2">
                {React.Children.toArray(
                  size.map((item)=>(
                    <div className="size-selector">
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
                     {item.size.substring(2)}
                    </label>
                  </div>
                  )))
                }
               
               </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Color
              </h3>
              <div className="flex justify-center items-center gap-2">
                {React.Children.toArray(color.map((item)=>(

                 <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id="red"
                    className="hidden"
                  />
                  <label
                    htmlFor="red"
                    className="border border-gray-200 rounded-full h-6 w-6  cursor-pointer shadow-sm block"
                    style={{ backgroundColor: `${item.codeColor}` }}
                  ></label>
                </div>

                )))}
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Filter;
