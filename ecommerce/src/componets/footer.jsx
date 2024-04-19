import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="pt-9 bg-black pb-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
          <div className="md:col-span-1 flex flex-col justify-center items-center md:items-start space-y-4">
            <img src="/images/logo.svg" alt="logo" className="w-30" />
            <div className="flex justify-center md:justify-start space-x-5">
              <div className="text-white hover:text-yellow-300">
                <FaFacebook size={24} />
              </div>
              <div className="text-white hover:text-yellow-300">
                <FaInstagram size={24} />
              </div>
              <div className="text-white hover:text-yellow-300">
                <FaTwitter size={24} />
              </div>
              <div className="text-white hover:text-yellow-300">
                <FaGithub size={24} />
              </div>
            </div>
          </div>

          <div className="container mx-auto md:col-span-2 space-y-12 justify-center">
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider text-center md:text-left">
                  Support
                </h3>
                <div className="mt-4 space-y-4 text-center md:text-left">
                  <div className="font-bold text-white hover:text-yellow-300">
                    Pricing
                  </div>
                  <div className="font-bold text-white hover:text-yellow-300">
                    Documentation
                  </div>
                  <div className="font-bold text-white hover:text-yellow-300">
                    Guides
                  </div>
                  <div className="font-bold text-white hover:text-yellow-300">
                    API Status
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider text-center md:text-left">
                  Solutions
                </h3>
                <div className="mt-4 space-y-4 text-center md:text-left">
                  <div className="font-bold text-white hover:text-yellow-300">
                    Marketing
                  </div>
                  <div className="font-bold text-white hover:text-yellow-300">
                    Analytics
                  </div>
                  <div className="font-bold text-white hover:text-yellow-300">
                    Commerce
                  </div>
                  <div className="font-bold text-white hover:text-yellow-300">
                    Insights
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider text-center md:text-left">
                  Solutions
                </h3>
                <div className="mt-4 space-y-4 text-center md:text-left">
                  <div className="font-bold text-white hover:text-yellow-300">
                    Marketing
                  </div>
                  <div className="font-bold text-white hover:text-yellow-300">
                    Analytics
                  </div>
                  <div className="font-bold text-white hover:text-yellow-300">
                    Commerce
                  </div>
                  <div className="font-bold text-white hover:text-yellow-300">
                    Insights
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
