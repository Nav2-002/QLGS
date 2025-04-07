
import { Store, Shelf, Order, Customer, Service, Employee, Inventory, InventoryTransaction, Promotion, Invoice, InvoiceDetail } from '../types';

// Dữ liệu mẫu cho cửa hàng
export const stores: Store[] = [
  {
    id: 'store1',
    name: 'Cửa hàng Giặt Là Trung Tâm',
    address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
    phone: '0901234567',
    manager: 'Nguyễn Văn A',
    status: 'active',
  },
  {
    id: 'store2',
    name: 'Cửa hàng Giặt Là Quận 1',
    address: '456 Lê Lợi, Quận 1, TP.HCM',
    phone: '0907654321',
    manager: 'Trần Thị B',
    status: 'active',
  },
  {
    id: 'store3',
    name: 'Cửa hàng Giặt Là Thủ Đức',
    address: '789 Võ Văn Ngân, TP. Thủ Đức, TP.HCM',
    phone: '0909876543',
    manager: 'Lê Văn C',
    status: 'active',
  },
];

// Dữ liệu mẫu cho kệ hàng
export const shelves: Shelf[] = [
  {
    id: 'shelf1',
    storeId: 'store1',
    name: 'A1',
    capacity: 20,
    currentItems: 5,
  },
  {
    id: 'shelf2',
    storeId: 'store1',
    name: 'B1',
    capacity: 15,
    currentItems: 10,
  },
  {
    id: 'shelf3',
    storeId: 'store2',
    name: 'A1',
    capacity: 25,
    currentItems: 8,
  },
  {
    id: 'shelf4',
    storeId: 'store3',
    name: 'A1',
    capacity: 30,
    currentItems: 12,
  },
];

// Dữ liệu mẫu cho khách hàng
export const customers: Customer[] = [
  {
    id: 'customer1',
    name: 'Nguyễn Văn Khách',
    phone: '0912345678',
    email: 'khach@example.com',
    address: '123 Lê Duẩn, Quận 1, TP.HCM',
    membershipType: 'regular',
    joinDate: '2023-01-15',
  },
  {
    id: 'customer2',
    name: 'Trần Thị Khách',
    phone: '0898765432',
    email: 'khach2@example.com',
    address: '456 Nguyễn Huệ, Quận 1, TP.HCM',
    membershipType: 'vip',
    joinDate: '2022-11-20',
  },
];

// Dữ liệu mẫu cho dịch vụ
export const services: Service[] = [
  {
    id: 'service1',
    name: 'Giặt Thường',
    description: 'Giặt thông thường, không bao gồm sấy',
    price: 50000,
    estimatedTime: 120,
    available: true,
  },
  {
    id: 'service2',
    name: 'Giặt & Sấy',
    description: 'Giặt và sấy khô hoàn chỉnh',
    price: 80000,
    estimatedTime: 180,
    available: true,
  },
  {
    id: 'service3',
    name: 'Giặt Hấp',
    description: 'Giặt bằng phương pháp hấp, phù hợp với quần áo cao cấp',
    price: 120000,
    estimatedTime: 240,
    available: true,
  },
];

// Dữ liệu mẫu cho đơn hàng
export const orders: Order[] = [
  {
    id: 'order1',
    customerId: 'customer1',
    customerName: 'Nguyễn Văn Khách',
    storeId: 'store1',
    serviceId: 'service2',
    serviceName: 'Giặt & Sấy',
    status: 'processing',
    createdAt: '2023-09-15T08:30:00',
    price: 80000,
    shelfId: 'shelf1',
    shelfPosition: 'A1-3', // Vị trí cụ thể trên kệ A1, ngăn số 3
    note: 'Chú ý không dùng nước nóng',
  },
  {
    id: 'order2',
    customerId: 'customer2',
    customerName: 'Trần Thị Khách',
    storeId: 'store2',
    serviceId: 'service3',
    serviceName: 'Giặt Hấp',
    status: 'completed',
    createdAt: '2023-09-14T14:20:00',
    completedAt: '2023-09-15T10:30:00',
    price: 120000,
    shelfId: 'shelf3',
    shelfPosition: 'A1-5',
    isOnlineOrder: true,
    deliveryAddress: '456 Nguyễn Huệ, Quận 1, TP.HCM',
    deliveryPhone: '0898765432',
  },
];

// Dữ liệu mẫu cho nhân viên
export const employees: Employee[] = [
  {
    id: 'employee1',
    name: 'Nguyễn Văn Admin',
    email: 'admin@example.com',
    password: 'admin123', // Trong thực tế, đây sẽ là mật khẩu đã mã hóa
    role: 'admin',
    storeId: '', // Admin không gắn với cửa hàng cụ thể
    phone: '0912345678',
    status: 'active',
  },
  {
    id: 'employee2',
    name: 'Trần Thị Manager',
    email: 'manager1@example.com',
    password: 'manager123',
    role: 'manager',
    storeId: 'store1',
    phone: '0923456789',
    status: 'active',
  },
  {
    id: 'employee3',
    name: 'Lê Văn Staff',
    email: 'staff1@example.com',
    password: 'staff123',
    role: 'staff',
    storeId: 'store1',
    phone: '0934567890',
    status: 'active',
  },
  {
    id: 'employee4',
    name: 'Phạm Thị Staff',
    email: 'staff2@example.com',
    password: 'staff123',
    role: 'staff',
    storeId: 'store2',
    phone: '0945678901',
    status: 'active',
  },
];

// Dữ liệu mẫu cho kho
export const inventory: Inventory[] = [
  {
    id: 'inventory1',
    name: 'Bột giặt OMO',
    storeId: 'store1',
    type: 'detergent',
    quantity: 50,
    unit: 'kg',
    status: 'available',
    price: 40000,
    expiryDate: '2024-12-31',
    supplier: 'Công ty ABC',
    lastRestockedDate: '2023-08-01',
  },
  {
    id: 'inventory2',
    name: 'Nước xả vải Comfort',
    storeId: 'store1',
    type: 'detergent',
    quantity: 30,
    unit: 'lít',
    status: 'available',
    price: 60000,
    expiryDate: '2024-10-15',
    supplier: 'Công ty XYZ',
    lastRestockedDate: '2023-08-15',
  },
  {
    id: 'inventory3',
    name: 'Máy giặt công nghiệp LG',
    storeId: 'store1',
    type: 'machine',
    quantity: 3,
    unit: 'cái',
    status: 'available',
    price: 15000000,
    supplier: 'LG Việt Nam',
    lastRestockedDate: '2023-06-10',
  },
];

// Dữ liệu mẫu cho giao dịch kho
export const inventoryTransactions: InventoryTransaction[] = [
  {
    id: 'transaction1',
    inventoryId: 'inventory1',
    storeId: 'store1',
    type: 'in',
    quantity: 20,
    date: '2023-08-01',
    employeeId: 'employee2',
    note: 'Nhập kho định kỳ',
  },
  {
    id: 'transaction2',
    inventoryId: 'inventory1',
    storeId: 'store1',
    type: 'out',
    quantity: 5,
    date: '2023-08-10',
    employeeId: 'employee3',
    note: 'Sử dụng cho dịch vụ giặt',
  },
];

// Dữ liệu mẫu cho khuyến mãi
export const promotions: Promotion[] = [
  {
    id: 'promotion1',
    name: 'Khuyến mãi Tháng 9',
    description: 'Giảm 10% cho tất cả các dịch vụ',
    discount: 10,
    startDate: '2023-09-01',
    endDate: '2023-09-30',
    serviceIds: ['service1', 'service2', 'service3'],
    status: 'active',
  },
  {
    id: 'promotion2',
    name: 'Ưu đãi Giặt Hấp',
    description: 'Giảm 15% cho dịch vụ Giặt Hấp',
    discount: 15,
    startDate: '2023-09-15',
    endDate: '2023-10-15',
    serviceIds: ['service3'],
    status: 'active',
  },
];

// Dữ liệu mẫu cho hóa đơn
export const invoices: Invoice[] = [
  {
    id: 'invoice1',
    orderId: 'order1',
    customerId: 'customer1',
    storeId: 'store1',
    employeeId: 'employee3',
    date: '2023-09-15',
    subtotal: 80000,
    discount: 8000, // Giảm 10%
    tax: 7200, // 10% VAT sau khi giảm giá
    total: 79200,
    paymentMethod: 'cash',
    status: 'paid',
  },
  {
    id: 'invoice2',
    orderId: 'order2',
    customerId: 'customer2',
    storeId: 'store2',
    employeeId: 'employee4',
    date: '2023-09-15',
    subtotal: 120000,
    discount: 18000, // Giảm 15%
    tax: 10200, // 10% VAT sau khi giảm giá
    total: 112200,
    paymentMethod: 'card',
    status: 'paid',
  },
];

// Dữ liệu mẫu cho chi tiết hóa đơn
export const invoiceDetails: InvoiceDetail[] = [
  {
    id: 'detail1',
    invoiceId: 'invoice1',
    serviceId: 'service2',
    serviceName: 'Giặt & Sấy',
    quantity: 1,
    price: 80000,
    discount: 8000,
    total: 72000,
  },
  {
    id: 'detail2',
    invoiceId: 'invoice2',
    serviceId: 'service3',
    serviceName: 'Giặt Hấp',
    quantity: 1,
    price: 120000,
    discount: 18000,
    total: 102000,
  },
];
