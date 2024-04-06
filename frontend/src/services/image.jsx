import axios from "axios";
export const CreateImage = async (formData) => {
  return await axios.post(
    "http://localhost:8000/api/v1/image/create",
    formData
  );
};
export const GetImage = async (page,pageSize) => {
  return await axios.get(`http://localhost:8000/api/v1/image/getImage/?page=${page}&pageSize=${pageSize}`);
};
export const EditImage = async(id,data) =>{
  return await axios.put(`http://localhost:8000/api/v1/image/update/${id}`,data,{
    
  })
}
export const DeleteImage = async(id) =>{
  return await axios.delete(`http://localhost:8000/api/v1/image/delete/${id}`)
}

export const SearchImage = async(id) =>{
  return await axios.get(`http://localhost:8000/api/v1/image/search/?id=${id}`)
}

export const getProduct = (page,limit) =>{
  return axios.get("http://localhost:8000/api/v1/product/getProduct")
}
