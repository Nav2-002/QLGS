// src/api/invoiceDetails.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/invoice-details';

// Lấy danh sách chi tiết hóa đơn có phân trang và tìm kiếm
export const getInvoiceDetails = async (page = 1, limit = 10, sort = 'desc', keyword = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: { page, limit, sort, keyword },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách chi tiết hóa đơn:", error);
    throw error;
  }
};

// Lấy chi tiết hóa đơn theo ID
export const getInvoiceDetailById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết hóa đơn với ID ${id}:`, error);
    throw error;
  }
};

// Tạo chi tiết hóa đơn mới
export const createInvoiceDetail = async (invoiceDetailData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, invoiceDetailData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo chi tiết hóa đơn:", error);
    throw error;
  }
};

// Cập nhật chi tiết hóa đơn
export const updateInvoiceDetail = async (id, invoiceDetailData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, invoiceDetailData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật chi tiết hóa đơn với ID ${id}:`, error);
    throw error;
  }
};

// Xóa chi tiết hóa đơn
export const deleteInvoiceDetail = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa chi tiết hóa đơn với ID ${id}:`, error);
    throw error;
  }
};

// Lấy tất cả chi tiết hóa đơn theo ID hóa đơn
export const getInvoiceDetailsByInvoiceId = async (id_invoice) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/invoice/${id_invoice}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết hóa đơn theo ID hóa đơn ${id_invoice}:`, error);
    throw error;
  }
};