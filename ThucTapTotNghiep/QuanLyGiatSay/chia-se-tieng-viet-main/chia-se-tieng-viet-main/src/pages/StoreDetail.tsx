
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ArrowLeft, Package, Grid } from 'lucide-react';

const StoreDetail = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const { stores, shelves, orders } = useApp();

  const store = stores.find((s) => s.id === storeId);
  const storeShelves = shelves.filter((s) => s.storeId === storeId);
  const storeOrders = orders.filter((o) => o.storeId === storeId);

  if (!store) {
    return (
      <Layout title="Không tìm thấy cửa hàng">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-red-500 mb-4">Không tìm thấy thông tin cửa hàng!</p>
          <Link to="/stores" className="text-vietnam-red hover:underline flex items-center justify-center">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Quay lại danh sách cửa hàng
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Chi tiết cửa hàng: ${store.name}`}>
      <div className="mb-4">
        <Link to="/stores" className="text-vietnam-red hover:underline flex items-center">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Quay lại danh sách cửa hàng
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Thông tin cửa hàng</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">ID:</span>
              <span>{store.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tên cửa hàng:</span>
              <span>{store.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Địa chỉ:</span>
              <span>{store.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Số điện thoại:</span>
              <span>{store.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Quản lý:</span>
              <span>{store.manager}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Trạng thái:</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  store.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {store.status === 'active' ? 'Hoạt Động' : 'Ngừng Hoạt Động'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Thống kê</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Grid className="h-5 w-5 text-blue-500 mr-2" />
                <span className="font-medium">Kệ hàng</span>
              </div>
              <p className="text-2xl font-bold">{storeShelves.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Package className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium">Đơn hàng</span>
              </div>
              <p className="text-2xl font-bold">{storeOrders.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Kệ hàng</h3>
          <Link
            to="/shelves"
            className="bg-vietnam-green text-white px-4 py-2 rounded-md"
          >
            Quản lý kệ hàng
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {storeShelves.map((shelf) => (
            <div key={shelf.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-3 border-b">
                <h4 className="font-medium">{shelf.name}</h4>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Sức chứa:</span>
                  <span>{shelf.capacity} món</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Hiện tại:</span>
                  <span>{shelf.currentItems} món</span>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        shelf.currentItems / shelf.capacity > 0.8
                          ? 'bg-red-600'
                          : shelf.currentItems / shelf.capacity > 0.5
                          ? 'bg-yellow-400'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${(shelf.currentItems / shelf.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 text-right mt-1">
                    {Math.round((shelf.currentItems / shelf.capacity) * 100)}% đã sử dụng
                  </div>
                </div>
              </div>
            </div>
          ))}
          {storeShelves.length === 0 && (
            <p className="col-span-full text-center text-gray-500 py-4">
              Cửa hàng này chưa có kệ hàng nào.
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Đơn hàng gần đây</h3>
          <Link
            to="/orders"
            className="bg-vietnam-yellow text-white px-4 py-2 rounded-md"
          >
            Quản lý đơn hàng
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Dịch vụ</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Vị trí</TableHead>
              <TableHead>Giá</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storeOrders.slice(0, 5).map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.serviceName}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                </TableCell>
                <TableCell>
                  {order.shelfId && order.shelfPosition
                    ? `${
                        shelves.find((s) => s.id === order.shelfId)?.name || ''
                      } - ${order.shelfPosition}`
                    : 'Chưa có'}
                </TableCell>
                <TableCell>{order.price.toLocaleString()} đ</TableCell>
              </TableRow>
            ))}
            {storeOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Cửa hàng này chưa có đơn hàng nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default StoreDetail;
