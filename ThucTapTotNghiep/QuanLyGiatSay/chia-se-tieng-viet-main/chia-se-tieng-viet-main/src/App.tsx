
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Index from './pages/Index';
import StoreManagement from './pages/StoreManagement';
import OrderManagement from './pages/OrderManagement';
import StoreDetail from './pages/StoreDetail';
import ShelfManagement from './pages/ShelfManagement';
import CustomerManagement from './pages/CustomerManagement';
import Login from './pages/Login';
import { Toaster } from "@/components/ui/toaster";

// Bảo vệ các route yêu cầu đăng nhập
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        } />
        
        <Route path="/stores" element={
          <ProtectedRoute>
            <StoreManagement />
          </ProtectedRoute>
        } />
        
        <Route path="/stores/:storeId" element={
          <ProtectedRoute>
            <StoreDetail />
          </ProtectedRoute>
        } />
        
        <Route path="/orders" element={
          <ProtectedRoute>
            <OrderManagement />
          </ProtectedRoute>
        } />
        
        <Route path="/shelves" element={
          <ProtectedRoute>
            <ShelfManagement />
          </ProtectedRoute>
        } />
        
        <Route path="/customers" element={
          <ProtectedRoute>
            <CustomerManagement />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<div>Trang không tồn tại</div>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
