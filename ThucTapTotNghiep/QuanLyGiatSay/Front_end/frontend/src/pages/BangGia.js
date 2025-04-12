import React from "react";
import "./BangGia.css"; // Hoặc dùng Tailwind nếu bạn đang dùng

const BangGia = () => {
  return (
    <div className="price-list-container">
      <h2 className="title">Dịch vụ giặt ủi Giá tham khảo (ĐV: vnd/kg)</h2>

      <div className="category">
        <h3 className="category-title green">Dịch vụ giặt sấy nhà hàng, khách sạn, Spa:</h3>
        <ul>
          <li>• Giặt sấy chăn-ga-drap: 20.000/kg</li>
          <li>• Giặt sấy khăn phủ bàn-áo ghế: 15.000/kg</li>
          <li>• Giặt rèm cửa: 12.000–15.000/kg</li>
        </ul>
      </div>

      <div className="category">
        <h3 className="category-title green">Giặt sấy quần áo, mền:</h3>
        <ul>
          <li>• Giặt sấy dưới 5kg: 10.000/kg</li>
          <li>• Giặt sấy 5kg – 7kg: 9.000/kg</li>
          <li>• Giặt sấy trên 7kg: 8.000/kg</li>
          <li>• Giặt sấy chăn–Mùng–Mền: 12.000/kg</li>
          <li>• Ủi quần – áo: 10.000/cái</li>
        </ul>
      </div>

      <div className="category">
        <h3 className="category-title green">Giặt hấp đồ cao cấp:</h3>
        <ul>
          <li>• Hấp bộ Vest Nam: 95.000/cái</li>
          <li>• Hấp bộ Vest Nữ: 90.000/cái</li>
          <li>• Hấp áo Vest Nam: 65.000/cái</li>
          <li>• Hấp áo Vest Nữ: 60.000/cái</li>
        </ul>
      </div>

      
    </div>
  );
};

export default BangGia;
