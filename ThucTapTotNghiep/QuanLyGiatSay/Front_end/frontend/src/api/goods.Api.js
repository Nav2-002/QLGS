import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/goods'; // Đảm bảo URL này đúng với backend của bạn

// Lấy danh sách tên tất cả hàng hóa (cho select hoặc list đơn giản)
export const getAllGoodsName = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`); // Backend của bạn có thể cần điều chỉnh endpoint này
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tên hàng hóa:', error);
    throw error;
  }
};

// Lấy danh sách hàng hóa (có phân trang)
export const getAllGoods = async (params) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hàng hóa:', error);
    throw error;
  }
};

// Lấy thông tin một hàng hóa theo ID
export const getGoodsById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin hàng hóa có ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới hàng hóa
export const createGoods = async (goodsData) => {
  try {
    const response = await axios.post(API_BASE_URL, goodsData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo hàng hóa:', error);
    throw error;
  }
};

// Cập nhật thông tin hàng hóa theo ID
export const updateGoods = async (id, goodsData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, goodsData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật hàng hóa có ID ${id}:`, error);
    throw error;
  }
};

// Xóa hàng hóa theo ID
export const deleteGoods = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa hàng hóa có ID ${id}:`, error);
    throw error;
  }
};

// Cập nhật trạng thái hàng hóa theo ID
export const updateGoodsStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}?status=${status}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật trạng thái hàng hóa có ID ${id}:`, error);
    throw error;
  }
};