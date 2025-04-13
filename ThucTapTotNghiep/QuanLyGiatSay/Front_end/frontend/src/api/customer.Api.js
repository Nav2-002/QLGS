import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/customers'; // Thay đổi nếu cần

// Lấy tất cả khách hàng (cho select hoặc list đơn giản)
export const getAllCustomersName = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tên khách hàng:', error);
    throw error;
  }
};

// Lấy tất cả khách hàng (có phân trang)
export const getAllCustomers = async (params) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách khách hàng:', error);
    throw error;
  }
};

// Lấy thông tin một khách hàng theo ID
export const getCustomerById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin khách hàng có ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới khách hàng
export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(API_BASE_URL, customerData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo khách hàng:', error);
    throw error;
  }
};

// Cập nhật thông tin khách hàng theo ID
export const updateCustomer = async (id, customerData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, customerData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật khách hàng có ID ${id}:`, error);
    throw error;
  }
};

// Xóa khách hàng theo ID
export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa khách hàng có ID ${id}:`, error);
    throw error;
  }
};