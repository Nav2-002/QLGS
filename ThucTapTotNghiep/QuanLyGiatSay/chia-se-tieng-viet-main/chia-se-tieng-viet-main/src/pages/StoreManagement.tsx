
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { Store, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Store as StoreType } from '../types';

const StoreManagement = () => {
  const { stores, addStore, updateStore, deleteStore } = useApp();
  const [isAddingStore, setIsAddingStore] = useState(false);
  const [isEditingStore, setIsEditingStore] = useState<string | null>(null);
  const [newStore, setNewStore] = useState<Omit<StoreType, 'id'>>({
    name: '',
    address: '',
    phone: '',
    manager: '',
    status: 'active',
  });

  const handleAddStore = () => {
    addStore(newStore);
    setNewStore({
      name: '',
      address: '',
      phone: '',
      manager: '',
      status: 'active',
    });
    setIsAddingStore(false);
  };

  const handleUpdateStore = (id: string) => {
    const store = stores.find((s) => s.id === id);
    if (store) {
      updateStore(id, newStore);
      setIsEditingStore(null);
    }
  };

  const startEditing = (store: StoreType) => {
    setIsEditingStore(store.id);
    setNewStore({
      name: store.name,
      address: store.address,
      phone: store.phone,
      manager: store.manager,
      status: store.status,
    });
  };

  const cancelEdit = () => {
    setIsEditingStore(null);
    setIsAddingStore(false);
    setNewStore({
      name: '',
      address: '',
      phone: '',
      manager: '',
      status: 'active',
    });
  };

  const confirmDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cửa hàng này?')) {
      deleteStore(id);
    }
  };

  return (
    <Layout title="Quản Lý Cửa Hàng">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Danh Sách Cửa Hàng</h3>
          <button
            onClick={() => setIsAddingStore(true)}
            className="bg-vietnam-green text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Thêm Cửa Hàng
          </button>
        </div>

        {isAddingStore && (
          <div className="mb-6 bg-gray-50 p-4 rounded-md">
            <h4 className="text-lg font-medium mb-4">Thêm Cửa Hàng Mới</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên Cửa Hàng</label>
                <input
                  type="text"
                  value={newStore.name}
                  onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Địa Chỉ</label>
                <input
                  type="text"
                  value={newStore.address}
                  onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số Điện Thoại</label>
                <input
                  type="text"
                  value={newStore.phone}
                  onChange={(e) => setNewStore({ ...newStore, phone: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quản Lý</label>
                <input
                  type="text"
                  value={newStore.manager}
                  onChange={(e) => setNewStore({ ...newStore, manager: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Trạng Thái</label>
                <select
                  value={newStore.status}
                  onChange={(e) => setNewStore({ ...newStore, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="active">Hoạt Động</option>
                  <option value="inactive">Ngừng Hoạt Động</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={cancelEdit}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Hủy
              </button>
              <button
                onClick={handleAddStore}
                className="bg-vietnam-green text-white px-4 py-2 rounded-md"
              >
                Thêm
              </button>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên Cửa Hàng</TableHead>
              <TableHead>Địa Chỉ</TableHead>
              <TableHead>Số Điện Thoại</TableHead>
              <TableHead>Quản Lý</TableHead>
              <TableHead>Trạng Thái</TableHead>
              <TableHead>Hành Động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store.id}>
                {isEditingStore === store.id ? (
                  <>
                    <TableCell>{store.id}</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={newStore.name}
                        onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={newStore.address}
                        onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={newStore.phone}
                        onChange={(e) => setNewStore({ ...newStore, phone: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={newStore.manager}
                        onChange={(e) => setNewStore({ ...newStore, manager: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      />
                    </TableCell>
                    <TableCell>
                      <select
                        value={newStore.status}
                        onChange={(e) => setNewStore({ ...newStore, status: e.target.value as 'active' | 'inactive' })}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="active">Hoạt Động</option>
                        <option value="inactive">Ngừng Hoạt Động</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateStore(store.id)}
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
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{store.id}</TableCell>
                    <TableCell>{store.name}</TableCell>
                    <TableCell>{store.address}</TableCell>
                    <TableCell>{store.phone}</TableCell>
                    <TableCell>{store.manager}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          store.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {store.status === 'active' ? 'Hoạt Động' : 'Ngừng Hoạt Động'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link to={`/stores/${store.id}`} className="text-blue-600 hover:text-blue-800">
                          <Store className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => startEditing(store)}
                          className="text-yellow-600 hover:text-yellow-800"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => confirmDelete(store.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default StoreManagement;
