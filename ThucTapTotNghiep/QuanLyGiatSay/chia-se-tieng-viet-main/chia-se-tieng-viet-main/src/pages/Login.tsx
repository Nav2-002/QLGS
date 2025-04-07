
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Email hoặc mật khẩu không đúng');
      }
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại sau');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-vietnam-red">Đăng Nhập</h1>
            <p className="text-gray-600 mt-2">Hệ thống quản lý giặt sấy</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                className="w-full"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Mật khẩu
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu của bạn"
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <Button
                type="submit"
                className="w-full bg-vietnam-red hover:bg-vietnam-red/90"
                disabled={loading}
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>
                Tài khoản demo:
              </p>
              <p className="mt-1">
                Admin: admin@example.com / admin123
              </p>
              <p className="mt-1">
                Quản lý: manager1@example.com / manager123  
              </p>
              <p className="mt-1">
                Nhân viên: staff1@example.com / staff123
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
