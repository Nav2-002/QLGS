import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-middle">
        <div className="footer-col">
          <h4>Giặt Sấy 24h</h4>
          <p>
            Cung cấp các dịch vụ giặt sấy, vệ sinh chuyên nghiệp, nhanh chóng, tận tâm đến khách hàng!
          </p>
        </div>

        <div className="footer-col">
          <h4>Dịch Vụ Chính</h4>
          <ul>
            <li>Giặt Sấy Nhanh</li>
            <li>Giặt Sấy Rèm</li>
            <li>Vệ Sinh Túi Xách Cao Cấp</li>
            <li>Giặt Sấy DRAP</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Chính Sách</h4>
          <ul>
            <li>Chính Sách Bảo Mật</li>
            <li>Điều Khoản Thỏa Thuận</li>
            <li>Góp Ý Báo Lỗi</li>
            <li>Chính Sách Quảng Cáo</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Liên Hệ Với Chúng Tôi</h4>
          <p>📍 123 Đường Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ</p>
          <p>📞 0123 456 789</p>
          <p>✉️ giatsay24h@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
