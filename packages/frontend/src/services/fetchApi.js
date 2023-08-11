import axios from "axios";

const API_BASE_URL = "https://drink-deals.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchPromotionsData = async () => {
  try {
    const response = await api.get("/promotions");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updatePromotion = async (promotionId) => {
  try {

     const update = await api.put(`/promotions/update/${promotionId}`, {
      outdated: true,
    });   
    return update;
  } catch (error) {
    console.error("Error updating promotion:", error);
    return Promise.reject(error);
  }
};
