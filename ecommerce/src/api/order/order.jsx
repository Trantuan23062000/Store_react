import axios from "axios"

export const Oders = async(orderData,orderDetailData)=>{
    return await axios.post("http://localhost:8000/api/v1/oders",orderData,orderDetailData)
}
