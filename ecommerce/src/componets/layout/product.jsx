import React from "react";
import { CgChevronRight } from "react-icons/cg";
import {  FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Description from "../product/description";
import ProductImage from "../product/productImage";
import RelatedProduct from "../product/relatedProduct";

const Product = () => {
  
  return (
    <div className="container mx-auto flex flex-col">
     
      <div className="py-4 flex items-center gap-3">
        <div className="text-black text-base">
          <Link to="/">
            <FaHome size={24} />
          </Link>
        </div>
        <span className="text-sm text-gray-400">
          <CgChevronRight />
        </span>
        <p className="text-gray-600 font-medium">Product</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ProductImage/>

        <Description/>
      </div>

         <RelatedProduct/>
    </div>
  );
};

export default Product;
