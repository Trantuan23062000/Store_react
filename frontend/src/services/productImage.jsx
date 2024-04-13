import axios from "axios";

export const GetBrands = async () => {
  return await axios.get("http://localhost:8000/api/v1/brand/getBrand");
};
export const GetListProduct = async () => {
  return await axios.get("http://localhost:8000/api/v1/productImage/getList");
};
export const CreateProductImage = async (formData) => {
  return await axios.post(
    "http://localhost:8000/api/v1/productImage/create",
    formData
  );
};

export const GetListImage = async () => {
  return await axios.get("http://localhost:8000/api/v1/image/getImage");
};



export const UpdateProduct = async (id, formData) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/v1/productImage/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteProduct = async (id) =>{
  return await axios.delete(`http://localhost:8000/api/v1/productImage/delete/${id}`)
}
