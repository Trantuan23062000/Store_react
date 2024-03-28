import axios from "axios";
export const CreateImage = async (formData) => {
  return await axios.post(
    "http://localhost:8000/api/v1/image/create",
    formData
  );
};
export const GetImage = async () => {
  return await axios.get("http://localhost:8000/api/v1/image/getImage");
};
