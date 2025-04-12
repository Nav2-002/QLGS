import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DichVu.css";
import { useNavigate, useLocation } from "react-router-dom";

function DichVu() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const keyword = new URLSearchParams(location.search).get("keyword")?.toLowerCase() || "";

  useEffect(() => {
    axios
      .get("http://localhost:3000/services/list", {
        params: { page: 1, limit: 100 },
      })
      .then((res) => {
        const allServices = res.data.data || [];
        const filteredServices = keyword
          ? allServices.filter((s) => s.name?.toLowerCase().includes(keyword))
          : allServices;

        setServices(filteredServices);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi lấy dịch vụ:", err);
        setError("Không thể tải dữ liệu.");
        setLoading(false);
      });
  }, [keyword]);

  const handleDetailClick = (id) => {
    navigate(`/dich-vu/${id}`);
  };

  return (
    <div className="service-page">
      <h2 className="service-title">Dịch Vụ Của Chúng Tôi</h2>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="service-list">
        {services.length > 0 ? (
          services.map((service) => (
            <div className="service-card" key={service._id}>
              <img
                src={service.image || "/default-service.jpg"}
                alt={service.name}
                className="service-img"
              />
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <button
                className="service-btn"
                onClick={() => handleDetailClick(service._id)}
              >
                Tìm Hiểu Thêm
              </button>
            </div>
          ))
        ) : (
          <p>Không tìm thấy dịch vụ phù hợp.</p>
        )}
      </div>
    </div>
  );
}

export default DichVu;
