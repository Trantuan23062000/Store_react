import express from "express";
import multer from "multer"
import HomeController from "../controller/home_controller";
import BrandController from "../controller/brandController";
import ProductController from "../controller/product_controller";
import ImageController from "../controller/image_controller"


const router = express.Router();
const upload = multer({ dest: 'src/uploads/' });

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
  
  router.post("/image/create",upload.single('image'),ImageController.CreateImage)
  
  router.get("/home", HomeController.handleHello);
  return app.use("/api/v1", router);
};

export default ApiRouter;
