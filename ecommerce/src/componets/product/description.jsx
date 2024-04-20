import React from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';

const Description = () => {
    return (
        <div>
            <div className="border-b sm:mx-auto border-gray-200 pb-2 pt-2 ">
          <div className="mx-auto text-center items-center justify-center">
            <h2 className="text-3xl font-medium uppercase mb-2 items-center justify-center">
              Nike Air 1
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
                <span className="text-green-600">In Stock</span>
              </p>
              <p className="space-x-2">
                <span className="text-gray-800 font-semibold">Brand: </span>
                <span className="text-gray-600">Nike</span>
              </p>
              <p className="space-x-2">
                <span className="text-gray-800 font-semibold">Category: </span>
                <span className="text-gray-600">Men</span>
              </p>
              <p className="space-x-2">
                <span className="text-gray-800 font-semibold">SKU: </span>
                <span className="text-gray-600">BE45VGRT</span>
              </p>
            </div>
            <div className="flex justify-center mb-1 space-x-2 font-roboto mt-4">
              <p className="text-xl text-primary font-semibold">$45.00</p>
              <p className="text-base text-gray-400 line-through">$55.00</p>
            </div>

            <div className="flex justify-center text-center items-center gap-2 mt-4">
              <h3 className="text-sm text-gray-800 uppercase mb-1">Size:</h3>
              <div className="flex justify-center text-center items-center gap-2">
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
                    XS
                  </label>
                </div>
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-sm"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-sm"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    S
                  </label>
                </div>
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-m"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-m"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    M
                  </label>
                </div>
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-l"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-l"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    L
                  </label>
                </div>
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-xl"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-xl"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    XL
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4 ">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Color
              </h3>
              <div className="justify-center text-center items-center flex">
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id="red"
                    className="hidden"
                  />
                  <label
                    htmlFor="red"
                    className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                    style={{ backgroundColor: "#fc3d57" }}
                  ></label>
                </div>
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id="black"
                    className="hidden"
                  />
                  <label
                    htmlFor="black"
                    className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                    style={{ backgroundColor: "#000" }}
                  ></label>
                </div>
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id="white"
                    className="hidden"
                  />
                  <label
                    htmlFor="white"
                    className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                    style={{ backgroundColor: "#fff" }}
                  ></label>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
              <div className=" flex justify-center mx-auto">
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  -
                </div>
                <div className="h-8 w-8 text-base flex items-center justify-center">
                  4
                </div>
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  +
                </div>
              </div>
            </div>
          </div>

          <div className="flex border-b sm:mx-auto border-gray-200 pb-2 pt-2">
            <h3 className="border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
              Details:
            </h3>
            <div className="w-3/4 pt-6">
              <div className="text-gray-600">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Tenetur necessitatibus deleniti natus dolore cum maiores
                  suscipit optio itaque voluptatibus veritatis tempora iste
                  facilis non aut sapiente dolor quisquam, ex ab.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum, quae accusantium voluptatem blanditiis sapiente
                  voluptatum. Autem ab, dolorum assumenda earum veniam eius illo
                  fugiat possimus illum dolor totam, ducimus excepturi.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  quia modi ut expedita! Iure molestiae labore cumque nobis
                  quasi fuga, quibusdam rem? Temporibus consectetur corrupti
                  rerum veritatis numquam labore amet.
                </p>
              </div>

              <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
                <tbody>
                  <tr>
                    <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                      Color
                    </th>
                    <th className="py-2 px-4 border border-gray-300">
                      Blank, Brown, Red
                    </th>
                  </tr>
                  <tr>
                    <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                     Brand
                    </th>
                    <th className="py-2 px-4 border border-gray-300">Nike</th>
                  </tr>
                  <tr>
                    <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                      Weight
                    </th>
                    <th className="py-2 px-4 border border-gray-300">55kg</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3 border-b sm:mx-auto border-gray-200 pb-5 pt-5">
            <div className="bg-black text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-yellow-500 hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-120">
              <FaShoppingCart /> Add to cart
            </div>
            <div className="bg-black text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-yellow-500 hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-120">
              <FaHeart /> Wishlist
            </div>
          </div>
        </div>
        </div>
    );
}

export default Description;
