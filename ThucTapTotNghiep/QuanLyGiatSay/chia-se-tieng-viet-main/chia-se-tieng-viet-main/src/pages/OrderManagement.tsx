
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { PlusCircle, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Order } from '../types';

const OrderManagement = () => {
  const { orders, stores, shelves, services, customers, updateOrder, deleteOrder, updateOrderShelf } = useApp();
  const [selectedStoreId, setSelectedStoreId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isEditingOrder, setIsEditingOrder] = useState<string | null>(null);
  const [isAssigningShelf, setIsAssigningShelf] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatedOrder, setUpdatedOrder] = useState<Partial<Order>>({});
  const [shelfAssignment, setShelfAssignment] = useState({
    shelfId: '',
    position: '',
  });

  // Lọc đơn hàng theo các tiêu chí
  const filteredOrders = orders.filter(order => {
    const matchesStore = selectedStoreId === 'all' || order.storeId === selectedStoreId;
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStore && matchesStatus && matchesSearch;
  });

  const handleUpdateOrder = (id: string) => {
    updateOrder(id, updatedOrder);
    setIsEditingOrder(null);
    setUpdatedOrder({});
  };

  const handleAssignShelf = (id: string) => {
    if (shelfAssignment.shelfId && shelfAssignment.position) {
      updateOrderShelf(id, shelfAssignment.shelfId, shelfAssignment.position);
      setIsAssigningShelf(null);
      setShelfAssignment({
        shelfId: '',
        position: '',
      });
    }
  };

  const startEditing = (order: Order) => {
    setIsEditingOrder(order.id);
    setUpdatedOrder({
      status: order.status,
    });
  };

  const startAssigningShelf = (order: Order) => {
    setIsAssigningShelf(order.id);
    setShelfAssignment({
      shelfId: order.shelfId || '',
      position: order.shelfPosition || '',
    });
  };

  const cancelEdit = () => {
    setIsEditingOrder(null);
    setIsAssigningShelf(null);
    setUpdatedOrder({});
    setShelfAssignment({
      shelfId: '',
      position: '',
    });
  };

  const confirmDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      deleteOrder(id);
    }
  };

  return (
    <Layout title="Quản Lý Đơn Hàng">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedStoreId}
                onChange={(e) => setSelectedStoreId(e.target.value)}
                className="border rounded-md p-2"
              >
                <option value="all">Tất cả cửa hàng</option>
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border rounded-md p-2"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="processing">Đang xử lý</option>
                <option value="completed">Hoàn thành</option>
                <option value="delivered">Đã giao</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          </div>
          
          <button
            className="bg-vietnam-green text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Tạo Đơn Hàng
          </button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã Đơn</TableHead>
              <TableHead>Khách Hàng</TableHead>
              <TableHead>Cửa Hàng</TableHead>
              <TableHead>Dịch Vụ</TableHead>
              <TableHead>Ngày Tạo</TableHead>
              <TableHead>Trạng Thái</TableHead>
              <TableHead>Vị Trí</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Hành Động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{stores.find(s => s.id === order.storeId)?.name || 'N/A'}</TableCell>
                <TableCell>{order.serviceName}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleString('vi-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</TableCell>
                <TableCell>
                  {isEditingOrder === order.id ? (
                    <select
                      value={updatedOrder.status}
                      onChange={(e) => setUpdatedOrder({ ...updatedOrder, status: e.target.value as any })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="pending">Chờ xử lý</option>
                      <option value="processing">Đang xử lý</option>
                      <option value="completed">Hoàn thành</option>
                      <option value="delivered">Đã giao</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  ) : (
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
                  )}
                </TableCell>
                <TableCell>
                  {isAssigningShelf === order.id ? (
                    <div className="space-y-2">
                      <select
                        value={shelfAssignment.shelfId}
                        onChange={(e) => setShelfAssignment({ ...shelfAssignment, shelfId: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">-- Chọn kệ --</option>
                        {shelves
                          .filter(shelf => shelf.storeId === order.storeId && shelf.currentItems < shelf.capacity)
                          .map((shelf) => (
                            <option key={shelf.id} value={shelf.id}>
                              {shelf.name} ({shelf.currentItems}/{shelf.capacity})
                            </option>
                          ))}
                      </select>
                      <input
                        type="text"
                        value={shelfAssignment.position}
                        onChange={(e) => setShelfAssignment({ ...shelfAssignment, position: e.target.value })}
                        placeholder="Vị trí cụ thể"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  ) : (
                    <div>
                      {order.shelfId && order.shelfPosition ? (
                        <span className="text-sm">
                          {shelves.find(s => s.id === order.shelfId)?.name || ''} - {order.shelfPosition}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">Chưa có</span>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>{order.price.toLocaleString()} đ</TableCell>
                <TableCell>
                  {isEditingOrder === order.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateOrder(order.id)}
                        className="bg-vietnam-yellow text-white p-1 rounded-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-vietnam-red text-white p-1 rounded-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : isAssigningShelf === order.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAssignShelf(order.id)}
                        className="bg-vietnam-yellow text-white p-1 rounded-md"
                        disabled={!shelfAssignment.shelfId || !shelfAssignment.position}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-vietnam-red text-white p-1 rounded-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(order)}
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Cập nhật trạng thái"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      {(order.status === 'processing' || order.status === 'completed') && (
                        <button
                          onClick={() => startAssigningShelf(order)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Chỉ định kệ"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => confirmDelete(order.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Xóa"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  Không tìm thấy đơn hàng nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default OrderManagement;
