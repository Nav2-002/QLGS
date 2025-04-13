import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/deliverys'; // Đảm bảo URL này đúng với backend của bạn

// Lấy danh sách giao hàng (có phân trang)
export const getAllDeliveries = async (params) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách giao hàng:', error);
    throw error;
  }
};

// Lấy thông tin một giao hàng theo ID
export const getDeliveryById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin giao hàng có ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới giao hàng
export const createDelivery = async (deliveryData) => {
  try {
    const response = await axios.post(API_BASE_URL, deliveryData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo giao hàng:', error);
    throw error;
  }
};

// Cập nhật thông tin giao hàng theo ID
export const updateDelivery = async (id, deliveryData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, deliveryData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật giao hàng có ID ${id}:`, error);
    throw error;
  }
};

// Xóa giao hàng theo ID
export const deleteDelivery = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa giao hàng có ID ${id}:`, error);
    throw error;
  }
};

// Cập nhật trạng thái giao hàng theo ID
export const updateDeliveryStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}/status?status=${status}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật trạng thái giao hàng có ID ${id}:`, error);
    throw error;
  }
};