import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/stock-transactions'; // Đảm bảo URL này đúng với backend của bạn

// Lấy danh sách giao dịch kho (có phân trang và tìm kiếm)
export const getAllStockTransactions = async (params) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách giao dịch kho:', error);
    throw error;
  }
};

// Lấy thông tin một giao dịch kho theo ID
export const getStockTransactionById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin giao dịch kho có ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới giao dịch kho
export const createStockTransaction = async (stockTransactionData) => {
  try {
    const response = await axios.post(API_BASE_URL, stockTransactionData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo giao dịch kho:', error);
    throw error;
  }
};

// Cập nhật thông tin giao dịch kho theo ID
export const updateStockTransaction = async (id, stockTransactionData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, stockTransactionData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật giao dịch kho có ID ${id}:`, error);
    throw error;
  }
};

// Xóa giao dịch kho theo ID
export const deleteStockTransaction = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa giao dịch kho có ID ${id}:`, error);
    throw error;
  }
};