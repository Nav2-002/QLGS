import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/shelfs'; // Đảm bảo URL này đúng với backend của bạn

// Lấy danh sách tất cả kệ đồ
export const getAllShelves = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách kệ đồ:', error);
    throw error;
  }
};

// Lấy thông tin kệ đồ theo ID
export const getShelfById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin kệ đồ có ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới kệ đồ
export const createShelf = async (shelfData) => {
  try {
    const response = await axios.post(API_BASE_URL, shelfData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo kệ đồ:', error);
    throw error;
  }
};

// Cập nhật thông tin kệ đồ theo ID
export const updateShelf = async (id, shelfData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, shelfData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật kệ đồ có ID ${id}:`, error);
    throw error;
  }
};