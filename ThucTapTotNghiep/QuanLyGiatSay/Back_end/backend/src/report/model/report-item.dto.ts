export class ReportItemDto {
  store_id: string;  // ID của Store, sử dụng string nếu là ObjectId
  gross_sales: number;  // Tong doanh thu
  net_sales: number;    // Loi nhuan
  orders_count: number; // Tong so don hang
  date: Date;           // Ngày
}
