import {GetList} from "../../services/product/getList"

const GetImageProduct = async (req,res) =>{
    const data = await GetList()
    if(data){
        res.status(200).json({
            message:"Get data",
            EC:0,
            data:data
        })
    }else{
        res.status(201).json({
            message:"Get data Eror",
            EC:1,
            data:[]
        })
    }
}
module.exports = {GetImageProduct}