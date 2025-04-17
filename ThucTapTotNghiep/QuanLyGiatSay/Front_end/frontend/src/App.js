import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import TrangChu from "./pages/TrangChu";
import DichVu from "./pages/DichVu";
import ChiTietDichVu from "./pages/ChiTietDichVu";
import DatDichVu from "./pages/DatDichVu";
import LienHe from "./pages/LienHe";
import BangGia from "./pages/BangGia";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminLayout from "./layout/AdminLayout";
import PromotionPage from "./pages/PromotionsPage";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/admins/login';

  return (
    <>
      {!isAdminRoute && !isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/dich-vu" element={<DichVu />} />
        <Route path="/dich-vu/:id" element={<ChiTietDichVu />} />
        <Route path="/dat-dich-vu" element={<DatDichVu />} />
        <Route path="/lien-he" element={<LienHe />} />
        <Route path="/bang-gia" element={<BangGia />} />
        <Route path="/admins/login" element={<AdminLoginPage />} />

        {/* Các route dành cho admin được bảo vệ bởi PrivateRoute và sử dụng AdminLayout */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="promotions" element={<PromotionPage />} /> {/* Trang quản lý khuyến mãi (path /admin/promotions) */}
          {/* Thêm các route admin khác tại đây (ví dụ: /admin/users, /admin/orders) */}
        </Route>
      </Routes>
      {!isAdminRoute && !isLoginPage && <Footer />}
    </>
  );
}

export default App;