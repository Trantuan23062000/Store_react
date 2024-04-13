import axios from "axios"

export const GetProductDetails = async () =>{
   return await axios.get("http://localhost:8000/api/v1/productDetails/get")
}

export const getProduct = async() =>{
   return await axios.get("http://localhost:8000/api/v1/product/get")
}

export const getVariant = async() =>{
   return await axios.get("http://localhost:8000/api/v1/variant/get")
}

export const getImageDetail = async (id) =>{
   return await axios.get(`http://localhost:8000/api/v1/image/getById/${id}`)
}