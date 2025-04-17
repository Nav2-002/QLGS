import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  // Hàm xử lý sự kiện hủy form (ví dụ)
  const handleCancel = () => {
    console.log("Form canceled from AdminLayout.");
  };

  // Menu items (điều chỉnh cho phù hợp với ứng dụng của bạn)
  const menuItems = [
    
    { path: "/admin/promotions", label: "Quản lý khuyến mãi", icon: "🎁" },
    // Thêm các mục menu khác của bạn
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${isOpen ? "w-64" : "w-16"} bg-gradient-to-b from-blue-800 to-blue-900 text-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden flex flex-col`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          {isOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button
            className="p-2 rounded-full hover:bg-blue-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-5 flex-1">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 transition-colors duration-200 ${location.pathname === item.path ? "bg-blue-700 text-white border-l-4 border-white" : "text-blue-100 hover:bg-blue-700"}`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {isOpen && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile (tùy chỉnh theo thông tin admin) */}
        {isOpen && (
          <div className="p-4 border-t border-blue-700 flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center mr-3">
              <span>A</span>
            </div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-blue-300">admin@example.com</p>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find((item) => item.path === location.pathname)?.label || "Admin Home"}
            </h2>
            <div className="flex items-center space-x-4">
              {/* Thêm các nút hoặc thông tin header khác nếu cần */}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <Outlet context={{ onCancel: handleCancel }} /> {/* Nội dung các trang con sẽ được render ở đây */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;