import axios from "axios"
export const getProduct = (page,limit) =>{
    //return axios.get("http://localhost:8000/api/v1/product/getProduct")
    return axios.get(`http://localhost:8000/api/v1/product/getProduct/?page=${page}&limit=${limit}`)
}

export const CreateProduct = (data) =>{
    return axios.post("http://localhost:8000/api/v1/product/create",data)
}

export const GetBrand = () =>{
    return axios.get("http://localhost:8000/api/v1/product/getBrand")
}

export const UpdateProduct = (data) =>{
    return axios.put("http://localhost:8000/api/v1/product/update",{...data})
}

export const DeleteProduct = (id) =>{
    return axios.delete(`http://localhost:8000/api/v1/product/delete/${id}`)
}

export const SearchProduct = (name) =>{
    return axios.get(`http://localhost:8000/api/v1/product/search/?name=${name}`)
}