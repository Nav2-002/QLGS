import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/admins'; // Đảm bảo URL này đúng với backend của bạn

const getAuthHeader = () => {
  const token = localStorage.getItem('adminAuthToken'); // Sử dụng key khác cho admin token nếu cần
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Lấy thông tin admin đang đăng nhập
export const getMeAdmin = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin admin hiện tại:', error);
    throw error;
  }
};

// Lấy danh sách tất cả admin (cho select hoặc list đơn giản)
export const getAllAdminsName = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tên admin:', error);
    throw error;
  }
};

// Lấy danh sách admin (có phân trang)
export const getAllAdmins = async (params) => {
  try {
    const response = await axios.get(API_BASE_URL, { params, headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách admin:', error);
    throw error;
  }
};

// Lấy thông tin một admin theo ID
export const getAdminById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin admin có ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới admin
export const createAdmin = async (adminData) => {
  try {
    const response = await axios.post(API_BASE_URL, adminData, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo admin:', error);
    throw error;
  }
};

// Cập nhật thông tin admin theo ID
export const updateAdmin = async (id, adminData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, adminData, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật admin có ID ${id}:`, error);
    throw error;
  }
};

// Xóa admin theo ID
export const deleteAdmin = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa admin có ID ${id}:`, error);
    throw error;
  }
};