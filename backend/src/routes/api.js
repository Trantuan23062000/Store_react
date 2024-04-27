import express from "express";
import multer from "multer";
import BrandController from "../controller/brand/brandController";
import Getlist from "../controller/images/getlist";
import productController from "../controller/product/create";
import UpdateProductImag from "../controller/product/updateProductImage";
import ProductGetList from "../controller/product/getList";
import DeleteImage from "../controller/product/delete";
import createColorSize from "../controller/productSizeColor/create"
import get from "../controller/productSizeColor/get"
import getProduct from "../controller/productSizeColor/getProduct"
import getVariant from "../controller/productSizeColor/getVariants"
import getimage from "../controller/productSizeColor/getImageById"
import update from "../controller/productSizeColor/update"
import DeleteDetails from "../controller/productSizeColor/delete"
import Search from "../controller/product/search"
import SearchDetails from "../controller/productSizeColor/seacrh"
import product from "../controller/productSizeColor/getall"
import size from "../controller/size/get"
import color from "../controller/color/get"
import related from "../controller/productSizeColor/related"

import index from "../controller/filter/index"

const router = express.Router();
const upload = multer({
  dest: "src/uploads/",
  fileFilter: (req, file, cb) => {
    if (file) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        req.fileValidationError = "Only image files are allowed!";
        return cb(new Error("Only image files are allowed!"));
      }
    }
    cb(null, true);
  },
});

const ApiRouter = (app) => {
  //Brand
  router.post("/brand/createBrand", BrandController.Create);
  router.get("/brand/getBrand", BrandController.GetListBrand);
  router.put("/brand/update", BrandController.EditBrand);
  router.delete("/brand/delete/:id", BrandController.DeleteBrand);
  router.get("/brand/search", BrandController.Search);

  //Images
  router.get("/image/getImage", Getlist.listImages);

  // productSizeColor
  router.post("/productDetails/create",createColorSize.addProductDataController)
  router.get("/productDetails/get",get.getProductDetailsController)
  router.get("/product/get",getProduct.GetPorduct)
  router.get("/variant/get",getVariant.getVariant)
  router.get("/image/getById/:id",getimage.GetimageById)
  router.put("/productDetails/update/:detailId",update.updateProductDataController);
  router.delete("/productDetails/delete/:detailId",DeleteDetails.Delete)
  router.get("/productDetails/search",SearchDetails.searchProduct)

  //getall
  router.get("/productDetails/getall",product.GetAll);

  //productImage

  router.post(
    "/productImage/create",
    upload.array("images", 10),
    productController.addProduct
  );

  router.put(
    "/productImage/update/:id",
    upload.array("images", 10),
    UpdateProductImag.updateProducts
  );
  router.get("/productImage/getList", ProductGetList.GetList);
  router.delete("/productImage/delete/:id", DeleteImage.deleteProduct);
  router.get('/productImage/search',Search.SearchProductdata)
  router.get("/product/related",related.getRelatedProducts)


  router.get("/size",size.getAllSize)
  router.get("/color",color.getAllColor)

  router.post("/products/filter", index.filterController);

  return app.use("/api/v1", router);
};

export default ApiRouter;
