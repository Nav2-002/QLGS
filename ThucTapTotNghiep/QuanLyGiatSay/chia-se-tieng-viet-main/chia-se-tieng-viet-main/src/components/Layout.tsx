
import React, { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store, PackageOpen, Home, Users, LayoutGrid, LogOut, Database, Tag, FileText, Truck, Box } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

type LayoutProps = {
  children: ReactNode;
  title: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, hasPermission } = useAuth();
  const { stores } = useApp();
  const [selectedStore, setSelectedStore] = useState<string>(currentUser?.storeId || '');
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-vietnam-red/10 text-vietnam-red' : 'text-gray-700 hover:bg-gray-100';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Lọc store theo quyền của người dùng
  const userStores = currentUser?.role === 'admin' 
    ? stores 
    : stores.filter(store => store.id === currentUser?.storeId);

  // Kiểm tra nếu người dùng là nhân viên cửa hàng và chưa chọn cửa hàng
  React.useEffect(() => {
    if (currentUser?.role === 'staff' && userStores.length > 0 && !selectedStore) {
      setSelectedStore(userStores[0].id);
    }
  }, [currentUser, userStores, selectedStore]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-vietnam-red text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản Lý Giặt Sấy</h1>
          <div className="flex items-center space-x-4">
            {currentUser && (
              <>
                {userStores.length > 0 && (
                  <select
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    className="bg-white text-gray-800 px-3 py-1 rounded-md"
                    disabled={currentUser.role === 'staff'}
                  >
                    {userStores.map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                )}
                <span className="cursor-pointer hover:underline">
                  Xin chào, {currentUser.name} ({currentUser.role === 'admin' ? 'Admin' : currentUser.role === 'manager' ? 'Quản lý' : 'Nhân viên'})
                </span>
                <button 
                  onClick={handleLogout}
                  className="bg-white text-vietnam-red px-3 py-1 rounded-md hover:bg-gray-100 transition flex items-center"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`flex items-center p-3 rounded-md ${isActive('/')}`}>
                  <Home className="mr-3 h-5 w-5" />
                  <span>Trang chủ</span>
                </Link>
              </li>
              
              {hasPermission('manage_stores') && (
                <li>
                  <Link to="/stores" className={`flex items-center p-3 rounded-md ${isActive('/stores')}`}>
                    <Store className="mr-3 h-5 w-5" />
                    <span>Quản lý cửa hàng</span>
                  </Link>
                </li>
              )}
              
              <li>
                <Link to="/orders" className={`flex items-center p-3 rounded-md ${isActive('/orders')}`}>
                  <PackageOpen className="mr-3 h-5 w-5" />
                  <span>Quản lý đơn hàng</span>
                </Link>
              </li>
              
              <li>
                <Link to="/shelves" className={`flex items-center p-3 rounded-md ${isActive('/shelves')}`}>
                  <LayoutGrid className="mr-3 h-5 w-5" />
                  <span>Quản lý kệ hàng</span>
                </Link>
              </li>
              
              <li>
                <Link to="/customers" className={`flex items-center p-3 rounded-md ${isActive('/customers')}`}>
                  <Users className="mr-3 h-5 w-5" />
                  <span>Quản lý khách hàng</span>
                </Link>
              </li>

              {/* Menu items mới */}
              <li>
                <Link to="/inventory" className={`flex items-center p-3 rounded-md ${isActive('/inventory')}`}>
                  <Database className="mr-3 h-5 w-5" />
                  <span>Quản lý kho</span>
                </Link>
              </li>
              
              <li>
                <Link to="/promotions" className={`flex items-center p-3 rounded-md ${isActive('/promotions')}`}>
                  <Tag className="mr-3 h-5 w-5" />
                  <span>Khuyến mãi</span>
                </Link>
              </li>
              
              <li>
                <Link to="/invoices" className={`flex items-center p-3 rounded-md ${isActive('/invoices')}`}>
                  <FileText className="mr-3 h-5 w-5" />
                  <span>Hóa đơn</span>
                </Link>
              </li>
              
              <li>
                <Link to="/delivery" className={`flex items-center p-3 rounded-md ${isActive('/delivery')}`}>
                  <Truck className="mr-3 h-5 w-5" />
                  <span>Giao hàng</span>
                </Link>
              </li>
              
              <li>
                <Link to="/services" className={`flex items-center p-3 rounded-md ${isActive('/services')}`}>
                  <Box className="mr-3 h-5 w-5" />
                  <span>Dịch vụ</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          </div>
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white p-4 text-center border-t">
        <p className="text-gray-600">&copy; 2024 Quản Lý Giặt Sấy. Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

export default Layout;
