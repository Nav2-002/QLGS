import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/membership_cards'; // Đảm bảo URL này đúng với backend của bạn

// Lấy danh sách tất cả thẻ thành viên (cho select hoặc list đơn giản)
export const getAllMembershipCardsName = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tên thẻ thành viên:', error);
    throw error;
  }
};

// Lấy danh sách thẻ thành viên (có phân trang)
export const getAllMembershipCards = async (params) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách thẻ thành viên:', error);
    throw error;
  }
};

// Lấy thông tin một thẻ thành viên theo ID
export const getMembershipCardById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin thẻ thành viên có ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới thẻ thành viên
export const createMembershipCard = async (membershipCardData) => {
  try {
    const response = await axios.post(API_BASE_URL, membershipCardData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo thẻ thành viên:', error);
    throw error;
  }
};

// Cập nhật thông tin thẻ thành viên theo ID
export const updateMembershipCard = async (id, membershipCardData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, membershipCardData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật thẻ thành viên có ID ${id}:`, error);
    throw error;
  }
};

// Xóa thẻ thành viên theo ID
export const deleteMembershipCard = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa thẻ thành viên có ID ${id}:`, error);
    throw error;
  }
};

// Cập nhật trạng thái thẻ thành viên theo ID
export const updateMembershipCardStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}/status?status=${status}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật trạng thái thẻ thành viên có ID ${id}:`, error);
    throw error;
  }
};