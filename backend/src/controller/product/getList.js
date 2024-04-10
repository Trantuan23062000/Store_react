import ProductServiecs from "../../services/product/getList"

const GetList = async (req,res) =>{
    const Product = await ProductServiecs.GetList()
    if(Product){
        res.status(200).json({
            Product,
            EC:0,
            success:"Product get list !"
        })
    }else{
        res.status(201).json({
            Product:[],
            EC:1,
            error:"Product get list Error !"
        })
    }
}

module.exports = {
    GetList
}