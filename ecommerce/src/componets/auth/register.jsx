import React from "react";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div>
      <div className="container mx-auto items-center justify-center">
        <div className="py-16">
          <div className="max-w-lg bg-gray-50 text-black mx-auto shadow px-6 py-7 rounded-xl overflow-hidden">
            <div>
              <div className="space-y-2">
                <h2 className="text-2xl text-center font-bold uppercase mb-1">
                  Register
                </h2>
                <div>
                  <label htmlFor="email" className=" text-black mb-2 block">
                    Email or phone number
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full border border-gray-300 px-4 py-3 text-black text-sm rounded-xl focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="youremail.@domain.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-black mb-2 block">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full border border-gray-300 px-4 py-3 text-black text-sm focus:ring-0 placeholder-gray-400 rounded-xl"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-black mb-2 block">
                    Password Confirm
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full border border-gray-300 px-4 py-3 text-black text-sm focus:ring-0 placeholder-gray-400 rounded-xl"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="text-black focus:ring-0 cursor-pointer rounded-xl"
                  />
                  <label
                    htmlFor="remember"
                    className="text-black ml-3 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-primary">Forgot password</div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="block w-full py-2 text-center text-white rounded-xl bg-black border border-primary hover:bg-red-500 hover:text-primary transition uppercase font-roboto font-medium"
                >
                  Login
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-center relative">
              <div className="text-black uppercase px-3 bg-white z-10 relative">
                Or login with
              </div>
              <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
            </div>
            <div className="mt-4 flex gap-4">
              <div className="w-1/2 py-2 text-center rounded-xl text-white bg-blue-800 uppercase hover:bg-black font-roboto font-medium text-sm">
                facebook
              </div>
              <div className="w-1/2 py-2 text-center rounded-xl text-white bg-red-600  uppercase font-roboto font-medium text-sm hover:bg-blue-500">
                google
              </div>
            </div>

            <div className="mt-4 text-center text-black">
              I have account?{" "}
              <div className="text-black hover:text-red-500">
                <Link to="/login">Login now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
