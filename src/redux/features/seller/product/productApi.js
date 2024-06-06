import axiosInstance from "../../../../utils/axiosConfig";

export const fetchProduct = async () => {
  try {
    const response = await axiosInstance.get("/sellers/products", {
      role: "seller",
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
