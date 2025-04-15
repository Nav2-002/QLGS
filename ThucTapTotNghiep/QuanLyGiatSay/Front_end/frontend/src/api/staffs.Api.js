import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/staffs'; // Đảm bảo URL này đúng với backend của bạn

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken'); // Lấy token từ local storage hoặc nơi bạn lưu trữ
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getMe = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng hiện tại:', error);
    throw error;
  }
};
// Lấy danh sách tất cả nhân viên (cho select hoặc list đơn giản)
export const getAllStaffsName = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tên nhân viên:', error);
    throw error;
  }
};

// Lấy danh sách nhân viên (có phân trang)
export const getAllStaffs = async (params) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nhân viên:', error);
    throw error;
  }
};

// Lấy thông tin một nhân viên theo ID
export const getStaffById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin nhân viên có ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới nhân viên
export const createStaff = async (staffData) => {
  try {
    const response = await axios.post(API_BASE_URL, staffData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo nhân viên:', error);
    throw error;
  }
};

// Cập nhật thông tin nhân viên theo ID
export const updateStaff = async (id, staffData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, staffData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật nhân viên có ID ${id}:`, error);
    throw error;
  }
};

// Xóa nhân viên theo ID
export const deleteStaff = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa nhân viên có ID ${id}:`, error);
    throw error;
  }
};

// Cập nhật trạng thái nhân viên theo ID
export const updateStaffStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}/status?status=${status}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật trạng thái nhân viên có ID ${id}:`, error);
    throw error;
  }
};