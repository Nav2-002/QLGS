import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ChiTietDichVu.css";

function ChiTietDichVu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/services/${id}`)
      .then((res) => {
        setService(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi lấy chi tiết dịch vụ:", err);
        setError("Không thể tải thông tin dịch vụ.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Đang tải thông tin...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!service) return <p>Không tìm thấy dịch vụ.</p>;

  return (
    <div className="detail-container">
      <div className="detail-image-section">
        <img
          src={service.image || "/default-service.jpg"}
          alt={service.name}
          className="detail-image"
        />
      </div>

      <div className="detail-content">
        <h2 className="detail-title">{service.name}</h2>
        <p className="detail-description">{service.description}</p>


        <button
          className="detail-button"
          onClick={() => navigate(`/dat-dich-vu?serviceId=${service._id}`)}
        >
          Đặt Ngay
        </button>
      </div>
    </div>
  );
}

export default ChiTietDichVu;
