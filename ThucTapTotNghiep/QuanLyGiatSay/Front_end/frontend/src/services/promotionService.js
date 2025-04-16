import axios from 'axios';

const API_URL = 'http://localhost:3000/promotions'; // Adjust the API URL if needed

export const getAllPromotions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách khuyến mãi:', error);
    throw error;
  }
};

export const createPromotion = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo khuyến mãi:', error);
    throw error;
  }
};

export const updatePromotion = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật khuyến mãi:', error);
    throw error;
  }
};

export const deletePromotion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa khuyến mãi:', error);
    throw error;
  }
};

export const getPromotionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin khuyến mãi theo ID:', error);
    throw error;
  }
};