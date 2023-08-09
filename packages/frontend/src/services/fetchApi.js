import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchPromotionsData = async () => {
  try {
    const response = await api.get("/promotions");
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updatePromotion = async (promotionId) => {
  try {
    await api.put(`/promotion/update/${promotionId}`, {
      outdated: true,
    });
    return Promise.resolve();
  } catch (error) {
    console.error("Error updating promotion:", error);
    return Promise.reject(error);
  }
};
