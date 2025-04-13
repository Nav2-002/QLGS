import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/promotions'; // Đảm bảo URL này đúng với backend của bạn

// Lấy danh sách tất cả khuyến mãi (cho select hoặc list đơn giản)
export const getAllPromotionsName = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tên khuyến mãi:', error);
    throw error;
  }
};

// Lấy danh sách khuyến mãi (có thể có phân trang và tìm kiếm nếu backend hỗ trợ)
export const getAllPromotions = async (params) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách khuyến mãi:', error);
    throw error;
  }
};

// Lấy thông tin một khuyến mãi theo ID
export const getPromotionById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin khuyến mãi có ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới khuyến mãi
export const createPromotion = async (promotionData) => {
  try {
    const response = await axios.post(API_BASE_URL, promotionData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo khuyến mãi:', error);
    throw error;
  }
};

// Cập nhật thông tin khuyến mãi theo ID
export const updatePromotion = async (id, promotionData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, promotionData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật khuyến mãi có ID ${id}:`, error);
    throw error;
  }
};

// Xóa khuyến mãi theo ID
export const deletePromotion = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa khuyến mãi có ID ${id}:`, error);
    throw error;
  }
};