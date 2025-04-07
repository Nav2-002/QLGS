
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Employee } from '../types';
import { employees as initialEmployees } from '../data/mockData';

interface AuthContextType {
  currentUser: Employee | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: 'manage_stores' | 'manage_inventory' | 'view_reports') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Kiểm tra nếu người dùng đã đăng nhập từ trước (lưu trong localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Trong môi trường thực tế, đây sẽ là một API call
    // Mô phỏng việc kiểm tra thông tin đăng nhập
    const employee = initialEmployees.find(
      (emp) => emp.email === email && emp.password === password && emp.status === 'active'
    );

    if (employee) {
      setCurrentUser(employee);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(employee));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const hasPermission = (permission: 'manage_stores' | 'manage_inventory' | 'view_reports') => {
    if (!currentUser) return false;
    
    // Phân quyền theo vai trò
    switch (permission) {
      case 'manage_stores':
        return currentUser.role === 'admin' || currentUser.role === 'manager';
      case 'manage_inventory':
        return currentUser.role === 'admin' || currentUser.role === 'manager';
      case 'view_reports':
        return currentUser.role === 'admin' || currentUser.role === 'manager';
      default:
        return false;
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
