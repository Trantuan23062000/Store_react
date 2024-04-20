import React from "react";

const Checkout = () => {
  return (
    <div className="mx-auto max-w-4xl p-4 border border-gray-200 rounded mb-12">
          <h3 className="text-xl font-medium capitalize mb-4 border-b border-gray-200">Checkout</h3>
          <div className="space-y-4">
            <div>
              <div className="grid gap-6 mb-6 md:grid-cols-1">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Flowbite"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="123-45-678"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="website"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="flowbite.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="visitors"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Unique visitors (per month)
                  </label>
                  <input
                    type="number"
                    id="visitors"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder="john.doe@company.com"
                  required
                />
              </div>
              <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase border-b border-gray-200">
                order summary
              </h4>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h5 className="text-gray-800 font-medium">
                      Nike air 1
                    </h5>
                    <div className="text-sm text-gray-600">Size: 29</div>
                  </div>
                  <div className="text-gray-600">x3</div>
                  <div className="text-gray-800 font-medium">$320</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h5 className="text-gray-800 font-medium">
                      Adidas onstart
                    </h5>
                    <div className="text-sm text-gray-600">Size: 32</div>
                  </div>
                  <div className="text-gray-600">x3</div>
                  <div className="text-gray-800 font-medium">$320</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h5 className="text-gray-800 font-medium">
                      Balenciara
                    </h5>
                    <div className="text-sm text-gray-600">Size: 31</div>
                  </div>
                  <div className="text-gray-600">x3</div>
                  <div className="text-gray-800 font-medium">$320</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h5 className="text-gray-800 font-medium">
                     Puma
                    </h5>
                    <div className="text-sm text-gray-600">Size: 29</div>
                  </div>
                  <div className="text-gray-600">x3</div>
                  <div className="text-gray-800 font-medium">$320</div>
                </div>
              </div>

              <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                <div>subtotal</div>
                <div>$1280</div>
              </div>

              <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                <div>shipping</div>
                <div>Free</div>
              </div>

              <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
                <div className="font-semibold">Total</div>
                <div>$1280</div>
              </div>

              <div className="flex items-center mb-4 mt-2">
                <input
                  type="checkbox"
                  name="aggrement"
                  id="aggrement"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
                />
                <label
                  htmlFor="aggrement"
                  className="text-gray-600 ml-3 cursor-pointer text-sm"
                >
                  I agree to the terms & conditions
                </label>
              </div>

              <div
                className="block w-xl py-3 px-4 text-center text-white bg-black border rounded-xl transition font-medium hover:text-yellow-500 transform hover:scale-110"
              >
                Place order
              </div>
            </div>
          </div>
        </div>
  );
};

export default Checkout;
