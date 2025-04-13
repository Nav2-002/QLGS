import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/stores'; // Đảm bảo URL này đúng với backend của bạn

// Lấy danh sách tất cả cửa hàng (cho select hoặc list đơn giản)
export const getAllStoresName = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tên cửa hàng:', error);
    throw error;
  }
};

// Lấy danh sách cửa hàng (có phân trang)
export const getAllStores = async (params) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách cửa hàng:', error);
    throw error;
  }
};

// Lấy thông tin một cửa hàng theo ID
export const getStoreById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin cửa hàng có ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới cửa hàng
export const createStore = async (storeData) => {
  try {
    const response = await axios.post(API_BASE_URL, storeData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo cửa hàng:', error);
    throw error;
  }
};

// Cập nhật thông tin cửa hàng theo ID
export const updateStore = async (id, storeData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, storeData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật cửa hàng có ID ${id}:`, error);
    throw error;
  }
};

// Xóa cửa hàng theo ID
export const deleteStore = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa cửa hàng có ID ${id}:`, error);
    throw error;
  }
};

// Cập nhật trạng thái cửa hàng theo ID
export const updateStoreStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}/status?status=${status}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật trạng thái cửa hàng có ID ${id}:`, error);
    throw error;
  }
};