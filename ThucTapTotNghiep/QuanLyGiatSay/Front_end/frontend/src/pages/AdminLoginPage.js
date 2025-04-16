import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/admins/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = await response.text(); // Lấy response body dưới dạng text (JWT token)
        localStorage.setItem('adminToken', token);
        navigate('/admin'); // Điều hướng đến trang /admin sau khi đăng nhập
      } else {
        const errorData = await response.json(); // Cố gắng parse lỗi JSON từ backend
        setError(errorData.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập admin:', error);
      setError('Lỗi kết nối hoặc lỗi server');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Đăng nhập Admin</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="admin-login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Đăng nhập</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;