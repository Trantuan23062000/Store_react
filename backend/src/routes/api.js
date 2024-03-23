import express from "express"
import HomeController from "../controller/home_controller"
import BrandController from "../controller/brandController"


const router = express.Router()

const ApiRouter = (app) =>{
    //Brand
    router.post("/brand/createBrand",BrandController.Create)
    router.get("/brand/getBrand",BrandController.GetListBrand)
    router.put("/brand/update",BrandController.EditBrand)
    router.delete("/brand/delete/:id",BrandController.DeleteBrand)


    router.get("/home",HomeController.handleHello)


    return app.use("/api/v1",router)
}   

export default ApiRouter    