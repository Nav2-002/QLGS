import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/warehouse'; // Đảm bảo URL này đúng với backend của bạn

// Lấy danh sách tất cả kho hàng (cho select hoặc list đơn giản)
export const getAllWarehousesName = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tên kho hàng:', error);
    throw error;
  }
};

// Lấy danh sách kho hàng (có phân trang)
export const getAllWarehouses = async (params) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách kho hàng:', error);
    throw error;
  }
};

// Lấy thông tin một kho hàng theo ID
export const getWarehouseById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin kho hàng có ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới kho hàng
export const createWarehouse = async (warehouseData) => {
  try {
    const response = await axios.post(API_BASE_URL, warehouseData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo kho hàng:', error);
    throw error;
  }
};

// Cập nhật thông tin kho hàng theo ID
export const updateWarehouse = async (id, warehouseData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, warehouseData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật kho hàng có ID ${id}:`, error);
    throw error;
  }
};

// Xóa kho hàng theo ID
export const deleteWarehouse = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa kho hàng có ID ${id}:`, error);
    throw error;
  }
};

// Cập nhật trạng thái kho hàng theo ID
export const updateWarehouseStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}/status?status=${status}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật trạng thái kho hàng có ID ${id}:`, error);
    throw error;
  }
};