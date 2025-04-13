import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/services'; // Đảm bảo URL này đúng với backend của bạn

// Lấy danh sách tất cả dịch vụ (không phân trang)
export const getAllServicesList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list`);
    return response.data.data; // Backend trả về { data: [...] }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách dịch vụ:', error);
    throw error;
  }
};

// Lấy danh sách tên tất cả dịch vụ (cho select hoặc list đơn giản)
export const getAllServicesName = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tên dịch vụ:', error);
    throw error;
  }
};

// Lấy danh sách dịch vụ (có phân trang)
export const getAllServices = async (params) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách dịch vụ (phân trang):', error);
    throw error;
  }
};

// Lấy thông tin một dịch vụ theo ID
export const getServiceById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin dịch vụ có ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới dịch vụ
export const createService = async (serviceData) => {
  try {
    const response = await axios.post(API_BASE_URL, serviceData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo dịch vụ:', error);
    throw error;
  }
};

// Cập nhật thông tin dịch vụ theo ID
export const updateService = async (id, serviceData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, serviceData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật dịch vụ có ID ${id}:`, error);
    throw error;
  }
};

// Xóa dịch vụ theo ID
export const deleteService = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa dịch vụ có ID ${id}:`, error);
    throw error;
  }
};