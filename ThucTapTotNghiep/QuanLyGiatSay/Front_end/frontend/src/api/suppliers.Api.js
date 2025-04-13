import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/suppliers'; // Đảm bảo URL này đúng với backend của bạn

// Lấy danh sách nhà cung cấp (có phân trang và tìm kiếm)
export const getAllSuppliers = async (params) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nhà cung cấp:', error);
    throw error;
  }
};

// Lấy thông tin một nhà cung cấp theo ID
export const getSupplierById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin nhà cung cấp có ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới nhà cung cấp
export const createSupplier = async (supplierData) => {
  try {
    const response = await axios.post(API_BASE_URL, supplierData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo nhà cung cấp:', error);
    throw error;
  }
};

// Cập nhật thông tin nhà cung cấp theo ID
export const updateSupplier = async (id, supplierData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, supplierData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật nhà cung cấp có ID ${id}:`, error);
    throw error;
  }
};

// Xóa nhà cung cấp theo ID
export const deleteSupplier = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa nhà cung cấp có ID ${id}:`, error);
    throw error;
  }
};