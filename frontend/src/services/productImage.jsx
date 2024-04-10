import axios from "axios"

export const  GetBrands = async () => {
    return await axios.get('http://localhost:8000/api/v1/brand/getBrand')

}
export const GetListProduct = async () =>{
    return await axios.get("http://localhost:8000/api/v1/productImage/getList")
} 
export const CreateProductImage = async (formData) =>{
    return await axios.post('http://localhost:8000/api/v1/productImage/create',formData)
}
   
export const GetListImage = async () =>{
   return await axios.get("http://localhost:8000/api/v1/image/getImage")
}