// src/api/invoices.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/invoices';

// Lấy danh sách hóa đơn có phân trang và tìm kiếm
export const getInvoices = async (page = 1, limit = 10, sort = 'desc', keyword = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: { page, limit, sort, keyword },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách hóa đơn:", error);
    throw error;
  }
};

// Tạo hóa đơn mới
export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, invoiceData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo hóa đơn:", error);
    throw error;
  }
};

// Lấy chi tiết hóa đơn theo ID
export const getInvoiceById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết hóa đơn với ID ${id}:`, error);
    throw error;
  }
};

// Cập nhật hóa đơn
export const updateInvoice = async (id, invoiceData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, invoiceData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật hóa đơn với ID ${id}:`, error);
    throw error;
  }
};

// Cập nhật trạng thái hóa đơn
export const updateInvoiceStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}/status?status=${status}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật trạng thái hóa đơn với ID ${id}:`, error);
    throw error;
  }
};

// Xóa hóa đơn
export const deleteInvoice = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa hóa đơn với ID ${id}:`, error);
    throw error;
  }
};