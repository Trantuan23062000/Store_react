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

  return app.use("/api/v1", router);
};

export default ApiRouter;
