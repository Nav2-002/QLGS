// src/api/laundryOrders.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/laundry_orders';

// Lấy tất cả tên đơn hàng (endpoint: GET /laundry_orders/names)
export const getAllLaundryOrderNames = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/laundry_orders/names`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tên đơn hàng:", error);
    throw error;
  }
};
// Lấy danh sách đơn hàng
export const getLaundryOrders = async (page = 1, limit = 10, sort = 'desc', keyword = '') => {
    try {
      const response = await axios.get(`${API_BASE_URL}`, { // Lưu ý: không thêm `/laundry_orders` nữa
        params: { page, limit, sort, keyword },
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      throw error;
    }
  };

// Tạo đơn hàng mới (endpoint: POST /laundry_orders)
export const createLaundryOrder = async (orderData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, orderData); // Lưu ý: không thêm `/laundry_orders` nữa
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      throw error;
    }
  };

// Lấy chi tiết đơn hàng theo ID
export const getLaundryOrderById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`); // Chỉ cần thêm `/${id}`
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy chi tiết đơn hàng với ID ${id}:`, error);
      throw error;
    }
  };

// Cập nhật thông tin đơn hàng
export const updateLaundryOrder = async (id, orderData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}`, orderData); // Chỉ cần thêm `/${id}`
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật đơn hàng với ID ${id}:`, error);
      throw error;
    }
  };

// Cập nhật trạng thái đơn hàng
export const updateLaundryOrderStatus = async (id, status) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/status?status=${status}`); // Chỉ cần thêm `/${id}/status`
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật trạng thái đơn hàng với ID ${id}:`, error);
      throw error;
    }
  };

// Xóa đơn hàng
export const deleteLaundryOrder = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`); // Chỉ cần thêm `/${id}`
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa đơn hàng với ID ${id}:`, error);
      throw error;
    }
};