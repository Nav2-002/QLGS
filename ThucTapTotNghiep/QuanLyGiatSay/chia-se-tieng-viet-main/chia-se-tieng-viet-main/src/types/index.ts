
// Định nghĩa các kiểu dữ liệu

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
  status: 'active' | 'inactive';
}

export interface Shelf {
  id: string;
  storeId: string;
  name: string; // Tên kệ (VD: A1, B2, C3)
  capacity: number; // Số lượng đồ tối đa có thể chứa
  currentItems: number; // Số lượng đồ hiện tại
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  storeId: string;
  serviceId: string;
  serviceName: string;
  status: 'pending' | 'processing' | 'completed' | 'delivered' | 'cancelled';
  createdAt: string;
  completedAt?: string;
  deliveredAt?: string;
  shelfId?: string; // ID của kệ chứa đồ sau khi giặt
  shelfPosition?: string; // Vị trí cụ thể trên kệ
  price: number;
  note?: string; // Ghi chú cho đơn hàng
  deliveryAddress?: string; // Địa chỉ giao hàng nếu có
  deliveryPhone?: string; // Số điện thoại giao hàng
  isOnlineOrder?: boolean; // Đơn hàng online hay tại cửa hàng
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  membershipType?: 'regular' | 'vip' | 'premium';
  joinDate: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedTime: number; // Thời gian ước tính (phút)
  available: boolean;
}

// Thêm mới: Nhân viên
export interface Employee {
  id: string;
  name: string;
  email: string;
  password: string; // Trong thực tế, đây sẽ là mật khẩu đã được mã hóa
  role: 'admin' | 'manager' | 'staff';
  storeId: string; // ID cửa hàng mà nhân viên làm việc
  phone: string;
  status: 'active' | 'inactive';
}

// Thêm mới: Sản phẩm kho
export interface Inventory {
  id: string;
  name: string;
  storeId: string;
  type: 'detergent' | 'machine' | 'supplies' | 'other'; // Loại sản phẩm
  quantity: number;
  unit: string; // Đơn vị (lít, kg, cái, v.v.)
  status: 'available' | 'low' | 'out_of_stock';
  price: number;
  expiryDate?: string; // Hạn sử dụng nếu có
  supplier: string; // Nhà cung cấp
  lastRestockedDate: string; // Ngày nhập kho gần nhất
}

// Thêm mới: Giao dịch kho
export interface InventoryTransaction {
  id: string;
  inventoryId: string;
  storeId: string;
  type: 'in' | 'out'; // Nhập kho hay xuất kho
  quantity: number;
  date: string;
  employeeId: string; // Nhân viên thực hiện
  note?: string;
}

// Thêm mới: Khuyến mãi
export interface Promotion {
  id: string;
  name: string;
  description: string;
  discount: number; // Giá trị giảm giá (%)
  startDate: string;
  endDate: string;
  serviceIds: string[]; // Áp dụng cho dịch vụ nào
  status: 'active' | 'inactive';
}

// Thêm mới: Hóa đơn
export interface Invoice {
  id: string;
  orderId: string;
  customerId: string;
  storeId: string;
  employeeId: string;
  date: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'transfer'; // Phương thức thanh toán
  status: 'paid' | 'unpaid';
}

// Thêm mới: Chi tiết hóa đơn
export interface InvoiceDetail {
  id: string;
  invoiceId: string;
  serviceId: string;
  serviceName: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}
