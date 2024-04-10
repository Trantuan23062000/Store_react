import express from "express";
import multer from "multer"
import HomeController from "../controller/home_controller";
import BrandController from "../controller/brandController";
import ProductController from "../controller/product_controller";
import Create from "../controller/images/create"
import Getlist from "../controller/images/getlist"
import Update from "../controller/images/update"
import Delete from "../controller/images/delete"

import productController from "../controller/product/create"
import UpdateproductImage from "../controller/product/editImage"
import UpdateProduct from "../controller/product/editProduct"
import UpdateProductImag from "../controller/product/updateProductImage"
import ProductGetList from "../controller/product/getList"



const router = express.Router();
const upload = multer({ dest: 'src/uploads/',
fileFilter: (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'));
  }
  cb(null, true);
}
 });

const ApiRouter = (app) => {
  //Brand
  router.post("/brand/createBrand", BrandController.Create);
  router.get("/brand/getBrand", BrandController.GetListBrand);
  router.put("/brand/update", BrandController.EditBrand);
  router.delete("/brand/delete/:id", BrandController.DeleteBrand);
  router.get("/brand/search", BrandController.Search);

  //Product
  router.post("/product/create", ProductController.CreateProduct);
  router.get("/product/getProduct", ProductController.getListProduct);
  router.get("/product/getBrand",ProductController.getBrands)
  router.put("/product/update",ProductController.UpdateProduct)
  router.delete("/product/delete/:id",ProductController.deleteProduct)
  router.get("/product/search",ProductController.Search)

  //Images
  router.post("/image/create",upload.array('images',10),Create.CreateImage)
  router.get("/image/getImage",Getlist.listImages)
  router.put("/image/update/:id",upload.single('images'),Update.updateImageById)
  router.delete("/image/delete/:id",Delete.DeleteImage)
  router.get("/image/search",Getlist.Search)


  //productImage

  router.post("/productImage/create",upload.array('images',10),productController.addProduct)
  router.put("/productImage/updateImage/:id",upload.array('images',10),UpdateproductImage.updateProduct)
  router.put("/productImage/updateProduct/:id",UpdateProduct.updateProductController)
  router.put("/productImage/update/:id",upload.array('images',10),UpdateProductImag.updateProducts)
  router.get("/productImage/getList",ProductGetList.GetList)



  router.get("/home", HomeController.handleHello);
  return app.use("/api/v1", router);

};

export default ApiRouter;