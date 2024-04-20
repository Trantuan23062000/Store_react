import React from "react";
const Forgot = () => {
  return (
    <div className="container mx-auto items-center justify-center">
      <div className="py-16">
     
        <div className="max-w-lg bg-gray-50 text-black mx-auto shadow px-6 py-7 rounded-xl overflow-hidden">
          <div>
            <div className="space-y-2">
            <h2 className="text-2xl text-center font-bold uppercase mb-1">Forgot password</h2>
              <div>
                <label htmlFor="email" className=" text-black mb-2 block">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full border border-gray-300 px-4 py-3 text-black text-sm rounded-xl focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="youremail.@domain.com"
                />
              </div>
            </div>
           
            <div className="mt-4">
              <button
                type="submit"
                className="block w-full py-2 text-center text-white rounded-xl bg-black border border-primary hover:bg-red-500 hover:text-primary transition uppercase font-roboto font-medium"
              >
                Send mail
              </button>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Forgot;
