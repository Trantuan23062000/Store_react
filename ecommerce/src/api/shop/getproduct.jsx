import axios from axios

export default GetProduct = async() =>{
    return await axios.get("http://localhost:8000/api/v1/productDetails/getall")
}