import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrangChu from "./pages/TrangChu";
import DichVu from "./pages/DichVu";
import ChiTietDichVu from "./pages/ChiTietDichVu"; // 👈 đổi tên import
import DatDichVu from "./pages/DatDichVu";
import LienHe from "./pages/LienHe";
import BangGia from "./pages/BangGia";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/dich-vu" element={<DichVu />} />
        <Route path="/dich-vu/:id" element={<ChiTietDichVu />} /> 
        <Route path="/dat-dich-vu" element={<DatDichVu />} />
        <Route path="/lien-he" element={<LienHe />} />
        <Route path="/bang-gia" element={<BangGia />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
