
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  Clock, 
  Users, 
  Settings, 
  Archive, 
  Store, 
  LayoutGrid 
} from 'lucide-react';
import Layout from '../components/Layout';

const Index = () => {
  const { orders, stores, shelves } = useApp();

  // Các thông số thống kê
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === 'completed' || order.status === 'delivered').length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const processingOrders = orders.filter(order => order.status === 'processing').length;
  
  // Đơn hàng hôm nay
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= today;
  });

  // Doanh thu hôm nay
  const todayRevenue = todayOrders.reduce((total, order) => {
    if (order.status !== 'cancelled') {
      return total + order.price;
    }
    return total;
  }, 0);

  return (
    <Layout title="Bảng Điều Khiển">
      {/* Dashboard Overview */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-vietnam-red">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Đơn hàng hôm nay</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{todayOrders.length}</p>
              </div>
              <Archive size={40} className="text-vietnam-red opacity-80" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-vietnam-yellow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Tổng cửa hàng</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stores.length}</p>
              </div>
              <Store size={40} className="text-vietnam-yellow opacity-80" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-vietnam-green">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Doanh thu hôm nay</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{(todayRevenue / 1000).toFixed(1)}K</p>
              </div>
              <Clock size={40} className="text-vietnam-green opacity-80" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Đơn chờ xử lý</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{pendingOrders}</p>
              </div>
              <Calendar size={40} className="text-blue-500 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Truy Cập Nhanh</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/orders" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex items-center space-x-4">
              <div className="bg-vietnam-red bg-opacity-10 p-3 rounded-full">
                <Archive size={24} className="text-vietnam-red" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Quản Lý Đơn Hàng</h3>
                <p className="text-gray-500">Xem và cập nhật đơn hàng</p>
              </div>
            </div>
          </Link>

          <Link to="/stores" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex items-center space-x-4">
              <div className="bg-vietnam-yellow bg-opacity-10 p-3 rounded-full">
                <Store size={24} className="text-vietnam-yellow" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Quản Lý Cửa Hàng</h3>
                <p className="text-gray-500">Thêm và quản lý cửa hàng</p>
              </div>
            </div>
          </Link>

          <Link to="/shelves" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex items-center space-x-4">
              <div className="bg-vietnam-green bg-opacity-10 p-3 rounded-full">
                <LayoutGrid size={24} className="text-vietnam-green" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Quản Lý Kệ Hàng</h3>
                <p className="text-gray-500">Quản lý kệ và vị trí</p>
              </div>
            </div>
          </Link>

          <Link to="/customers" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Quản Lý Khách Hàng</h3>
                <p className="text-gray-500">Danh sách và thông tin</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Đơn Hàng Gần Đây</h2>
          <Link to="/orders" className="text-vietnam-red hover:underline">Xem tất cả</Link>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã Đơn</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách Hàng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dịch Vụ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời Gian</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vị Trí</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá Tiền</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.serviceName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'delivered'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status === 'completed'
                          ? 'Hoàn thành'
                          : order.status === 'processing'
                          ? 'Đang xử lý'
                          : order.status === 'pending'
                          ? 'Chờ xử lý'
                          : order.status === 'delivered'
                          ? 'Đã giao'
                          : 'Đã hủy'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString('vi-VN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.shelfId && order.shelfPosition ? (
                        `${shelves.find(s => s.id === order.shelfId)?.name || ''} - ${order.shelfPosition}`
                      ) : (
                        <span className="text-gray-400">Chưa có</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.price.toLocaleString()} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Store Overview */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Tổng Quan Cửa Hàng</h2>
          <Link to="/stores" className="text-vietnam-red hover:underline">Xem tất cả</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => {
            const storeOrders = orders.filter(o => o.storeId === store.id);
            const storeShelves = shelves.filter(s => s.storeId === store.id);
            const totalCapacity = storeShelves.reduce((sum, shelf) => sum + shelf.capacity, 0);
            const usedCapacity = storeShelves.reduce((sum, shelf) => sum + shelf.currentItems, 0);
            
            return (
              <div key={store.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{store.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{store.address}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      store.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {store.status === 'active' ? 'Hoạt Động' : 'Ngừng Hoạt Động'}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Quản lý:</span>
                    <span className="text-sm font-medium">{store.manager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Đơn hàng:</span>
                    <span className="text-sm font-medium">{storeOrders.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Kệ hàng:</span>
                    <span className="text-sm font-medium">{storeShelves.length}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-1">Sức chứa:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        usedCapacity / totalCapacity > 0.8
                          ? 'bg-red-600'
                          : usedCapacity / totalCapacity > 0.5
                          ? 'bg-yellow-400'
                          : 'bg-green-500'
                      }`}
                      style={{ 
                        width: totalCapacity > 0 
                          ? `${(usedCapacity / totalCapacity) * 100}%` 
                          : '0%' 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 text-right mt-1">
                    {totalCapacity > 0 
                      ? `${usedCapacity}/${totalCapacity} (${Math.round((usedCapacity / totalCapacity) * 100)}%)`
                      : '0/0 (0%)'}
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/stores/${store.id}`}
                    className="text-vietnam-red hover:underline text-sm flex items-center justify-end"
                  >
                    Xem chi tiết
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
