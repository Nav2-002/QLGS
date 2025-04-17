import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DatDichVu.css";

function DatDichVu() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    serviceId: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/services/list", {
        params: {
          page: 1,
          limit: 100,
        },
      })
      .then((res) => setServices(res.data.data || []))
      .catch((err) => console.error("Lỗi khi tải dịch vụ:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📅 Dữ liệu lịch hẹn:", formData);
    setSubmitted(true);
  };

  return (
    <div className="order-container">
      <h2>Đặt Lịch Hẹn Giặt Ủi</h2>

      {submitted ? (
        <p className="success-message">
          Lịch hẹn của bạn đã được ghi nhận! Chúng tôi sẽ liên hệ sớm! Xin cảm ơn!
        </p>
      ) : (
        <form className="order-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Tên khách hàng"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder=" Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder=" Địa chỉ giao nhận"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <select
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn dịch vụ --</option>
            {services
              .filter((s) => s && s._id && s.name)
              .map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} 
                </option>
              ))}
          </select>
          <textarea
            name="note"
            placeholder="Ghi chú thêm (nếu có)..."
            rows="3"
            value={formData.note}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Xác Nhận Lịch Hẹn</button>
        </form>
      )}
    </div>
  );
}

export default DatDichVu;