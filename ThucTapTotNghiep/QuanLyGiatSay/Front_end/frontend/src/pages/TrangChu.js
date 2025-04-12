import React from "react";
import { useNavigate } from "react-router-dom";
import "./TrangChu.css";

// Banner + Process images
import bannerImg from "../assets/banner.jpg";
import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import step4 from "../assets/step4.png";

// Why Choose Us images (ảnh thật bạn cung cấp)
import tantamImg from "../assets/tantam.png";
import riengbietImg from "../assets/riengbiet.png";
import chatluongImg from "../assets/chatluong.png";
import giaonhanImg from "../assets/giaonhan.png";
import tienloiImg from "../assets/tienloi.png";
import moitruongImg from "../assets/moitruong.png";

import gioithieuImg from "../assets/gioithieu.jpg";

function TrangChu() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dich-vu");
  };

  return (
    <div className="home-container">
      {/* Banner */}
      <div className="hero-banner">
        <img src={bannerImg} alt="Giặt sấy chuyên nghiệp" className="hero-image" />
        <div className="hero-text">
          <h1>
            Giặt Ủi <span className="highlight">247</span>
          </h1>
          <p className="slogan">Giặt ủi nhanh hơn | Dịch vụ tiện lợi hơn cho bạn!</p>
          <p className="description">
            Giặt Ủi 247 mang đến dịch vụ giặt sấy và vệ sinh quần áo chuyên nghiệp. Dễ dàng đặt tại tiệm gần nhất hoặc online – tiện lợi, tiết kiệm thời gian!
          </p>
          <button className="cta-button" onClick={handleClick}>
            Đặt dịch vụ ngay
          </button>
        </div>
      </div>

      {/* Giới thiệu về chúng tôi */}
<section className="about-us">
  <h2>
    Giới Thiệu Về <span className="highlight">Giặt Ủi 247</span>
  </h2>
  <div className="about-content">
    <div className="about-text">
      <p>
        Giặt Ủi 24h là hệ thống giặt sấy chuyên nghiệp, hiện đại và uy tín hàng đầu tại Việt Nam. 
        Với sứ mệnh mang lại sự tiện lợi và chất lượng cho từng bộ trang phục, chúng tôi luôn không ngừng cải tiến dịch vụ và đầu tư vào công nghệ mới.
      </p>
      <p>
        Chúng tôi cung cấp nhiều hình thức giặt đa dạng: từ giặt hấp, giặt khô, đến vệ sinh các loại đồ chuyên biệt như áo dạ, đồ da, chăn ga gối... 
        Mạng lưới tiệm phủ khắp các khu vực, cùng dịch vụ giao nhận tận nơi nhanh chóng giúp khách hàng tiết kiệm thời gian và an tâm tuyệt đối.
      </p>
    </div>
    <div className="about-image">
      <img src={gioithieuImg} alt="Giới thiệu Giặt Ủi 24h" />
    </div>
  </div>
</section>


      {/* Tại sao chọn chúng tôi */}
      <section className="why-choose-us">
        <h2>
          Tại Sao Chọn <span className="highlight">Giặt Sấy 24h</span>
        </h2>
        <p className="why-subtitle">
          Những ưu điểm vượt trội giúp hệ thống Giặt Sấy Thông Minh luôn là sự lựa chọn hàng đầu của khách hàng.
        </p>
        <div className="why-content">
          <div className="why-left">
            <div className="why-item">
              <img src={tantamImg} alt="Tận tâm" />
              <div>
                <h4>Tận Tâm</h4>
                <p>Quy trình chuyên nghiệp và nhân sự được đào tạo kỹ lưỡng mang đến sự hài lòng cho khách hàng.</p>
              </div>
            </div>
            <div className="why-item">
              <img src={riengbietImg} alt="Riêng biệt" />
              <div>
                <h4>Riêng Biệt</h4>
                <p>Mỗi khách được giặt riêng, đảm bảo vệ sinh tuyệt đối và không thất lạc.</p>
              </div>
            </div>
            <div className="why-item">
              <img src={chatluongImg} alt="Chất lượng" />
              <div>
                <h4>Cẩn Thận & Chất Lượng</h4>
                <p>Trang phục được chăm sóc bằng máy móc hiện đại và chất tẩy chuyên biệt.</p>
              </div>
            </div>
          </div>

          <div className="why-right">
            <div className="why-item">
              <img src={giaonhanImg} alt="Giao nhận" />
              <div>
                <h4>Miễn Phí Giao Nhận</h4>
                <p>Không mất thêm chi phí khi sử dụng dịch vụ tại hệ thống Giặt Sấy Thông Minh.</p>
              </div>
            </div>
            <div className="why-item">
              <img src={tienloiImg} alt="Tiện lợi" />
              <div>
                <h4>Tiện Lợi</h4>
                <p>Hoàn thành đơn hàng trong 12 giờ kể từ khi nhận, nhanh chóng và chính xác.</p>
              </div>
            </div>
            <div className="why-item">
              <img src={moitruongImg} alt="Môi trường" />
              <div>
                <h4>Môi Trường</h4>
                <p>Thân thiện với bao bì xanh và nguyên liệu giặt tẩy sinh học.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* Quy trình */}
      <section className="process-section">
        <h2>
          Quy Trình Làm Việc Tại <span className="highlight">Giặt Sấy 24h</span>
        </h2>
        <p className="process-desc">
          Quy trình dịch vụ đạt chuẩn, chuyên nghiệp giúp đảm bảo chất lượng tốt nhất đến khách hàng.
        </p>
        <div className="process-steps">
          <div className="process-item">
            <img src={step1} alt="Đặt dịch vụ" />
            <h4>ĐẶT DỊCH VỤ</h4>
            <p>Đặt qua hotline hoặc website.</p>
          </div>
          <div className="process-item">
            <img src={step2} alt="Nhận đồ" />
            <h4>NHẬN ĐỒ</h4>
            <p>Nhân viên đến nhận đồ và viết phiếu giao nhận.</p>
          </div>
          <div className="process-item">
            <img src={step3} alt="Giặt sạch" />
            <h4>GIẶT VÀ LÀM SẠCH</h4>
            <p>Đồ được giặt và sấy đúng quy trình.</p>
          </div>
          <div className="process-item">
            <img src={step4} alt="Giao tận nơi" />
            <h4>VẬN CHUYỂN TẬN NƠI</h4>
            <p>Giao đồ đến tận nhà hoặc địa điểm yêu cầu.</p>
          </div>
        </div>
      </section>


      
    </div>
  );
}

export default TrangChu;
