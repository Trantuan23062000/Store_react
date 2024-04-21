import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/admin-navbar/navbar";
import Sidebar from "../../components/admin-sidebar/sidebar";
import Main from "../../components/admin-main/main";
import { Context } from "../../context/index";
//import Maketing from '../../components/admin-maketing/maketing'
import { useParams } from "react-router-dom";
import { Data } from "../../dates/main";
import Brand from "../../components/brand/Brand";
import ProductImage from "../../components/productImage/ProductImage";
import ProductDetails from "../../components/ProductDetail/productDetails";

const AdminDashboard = () => {
  const { category } = useParams();
  let cat = Data.find((categ) => categ.url === parseInt(category));

  let { state, dispatch } = useContext(Context);

  let [size, setSize] = useState(1000);

  window.addEventListener("resize", (e) => {
    setSize(e.currentTarget.innerWidth);
  });
  useEffect(() => {
    size < 768
      ? dispatch({ type: "SET_TOGGLE_NAVBAR", payload: true })
      : dispatch({ type: "SET_TOGGLE_NAVBAR", payload: true });
    // eslint-disable-next-line
  }, [size]);
  return (
    <div>
      <div className="">
        <Navbar />
      </div>
      <div className="main max-w-[2300px] mt-[76px] flex flex-1 justify-end">
        <Sidebar />
        <div
          className={`main ${
            state.toggle
              ? ` ${state.toggleNavbar ? "md:ml-[310px]" : "ml-0"}`
              : ` ${state.toggleNavbar ? "md:ml-[90px]" : "ml-0"}`
          } overflow-auto w-full h-full z-12`}
        >
          {category === "home" && <Main />}
          {category === "brand" && <Brand />}
          {category === "productimage" && <ProductImage/>}
          {category === "productColorSize" && <ProductDetails/>}

          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
