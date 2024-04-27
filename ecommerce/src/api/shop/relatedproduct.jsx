import axios from "axios"

export const relatedProduct = async()=>{
    return await axios.get("http://localhost:8000/api/v1/product/related")
}