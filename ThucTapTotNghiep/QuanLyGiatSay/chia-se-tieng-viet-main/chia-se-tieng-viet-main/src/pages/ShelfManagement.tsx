
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Shelf } from '../types';

const ShelfManagement = () => {
  const { shelves, stores, addShelf, updateShelf, deleteShelf } = useApp();
  const [isAddingShelf, setIsAddingShelf] = useState(false);
  const [isEditingShelf, setIsEditingShelf] = useState<string | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('all');
  const [newShelf, setNewShelf] = useState<Omit<Shelf, 'id'>>({
    storeId: '',
    name: '',
    capacity: 20,
    currentItems: 0,
  });

  const filteredShelves = selectedStoreId === 'all' 
    ? shelves 
    : shelves.filter(shelf => shelf.storeId === selectedStoreId);

  const handleAddShelf = () => {
    addShelf(newShelf);
    setNewShelf({
      storeId: '',
      name: '',
      capacity: 20,
      currentItems: 0,
    });
    setIsAddingShelf(false);
  };

  const handleUpdateShelf = (id: string) => {
    const shelf = shelves.find((s) => s.id === id);
    if (shelf) {
      updateShelf(id, newShelf);
      setIsEditingShelf(null);
    }
  };

  const startEditing = (shelf: Shelf) => {
    setIsEditingShelf(shelf.id);
    setNewShelf({
      storeId: shelf.storeId,
      name: shelf.name,
      capacity: shelf.capacity,
      currentItems: shelf.currentItems,
    });
  };

  const cancelEdit = () => {
    setIsEditingShelf(null);
    setIsAddingShelf(false);
    setNewShelf({
      storeId: '',
      name: '',
      capacity: 20,
      currentItems: 0,
    });
  };

  const confirmDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kệ hàng này?')) {
      deleteShelf(id);
    }
  };

  return (
    <Layout title="Quản Lý Kệ Hàng">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h3 className="text-xl font-semibold mr-4">Danh Sách Kệ Hàng</h3>
            <div className="flex items-center bg-gray-100 p-2 rounded-md">
              <Search className="h-5 w-5 text-gray-500 mr-2" />
              <select
                value={selectedStoreId}
                onChange={(e) => setSelectedStoreId(e.target.value)}
                className="bg-transparent border-none focus:outline-none"
              >
                <option value="all">Tất cả cửa hàng</option>
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={() => setIsAddingShelf(true)}
            className="bg-vietnam-green text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Thêm Kệ Hàng
          </button>
        </div>

        {isAddingShelf && (
          <div className="mb-6 bg-gray-50 p-4 rounded-md">
            <h4 className="text-lg font-medium mb-4">Thêm Kệ Hàng Mới</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cửa Hàng</label>
                <select
                  value={newShelf.storeId}
                  onChange={(e) => setNewShelf({ ...newShelf, storeId: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">-- Chọn cửa hàng --</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tên Kệ</label>
                <input
                  type="text"
                  value={newShelf.name}
                  onChange={(e) => setNewShelf({ ...newShelf, name: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="VD: Kệ A1, B2, C3..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sức Chứa</label>
                <input
                  type="number"
                  value={newShelf.capacity}
                  onChange={(e) => setNewShelf({ ...newShelf, capacity: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded-md"
                  min="1"
                />
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
                onClick={handleAddShelf}
                className="bg-vietnam-green text-white px-4 py-2 rounded-md"
                disabled={!newShelf.storeId || !newShelf.name}
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
              <TableHead>Cửa Hàng</TableHead>
              <TableHead>Tên Kệ</TableHead>
              <TableHead>Sức Chứa</TableHead>
              <TableHead>Đã Sử Dụng</TableHead>
              <TableHead>Tình Trạng</TableHead>
              <TableHead>Hành Động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShelves.map((shelf) => (
              <TableRow key={shelf.id}>
                {isEditingShelf === shelf.id ? (
                  <>
                    <TableCell>{shelf.id}</TableCell>
                    <TableCell>
                      <select
                        value={newShelf.storeId}
                        onChange={(e) => setNewShelf({ ...newShelf, storeId: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      >
                        {stores.map((store) => (
                          <option key={store.id} value={store.id}>
                            {store.name}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={newShelf.name}
                        onChange={(e) => setNewShelf({ ...newShelf, name: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        value={newShelf.capacity}
                        onChange={(e) => setNewShelf({ ...newShelf, capacity: parseInt(e.target.value) })}
                        className="w-full p-2 border rounded-md"
                        min="1"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        value={newShelf.currentItems}
                        onChange={(e) => setNewShelf({ ...newShelf, currentItems: parseInt(e.target.value) })}
                        className="w-full p-2 border rounded-md"
                        min="0"
                        max={newShelf.capacity}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            newShelf.currentItems / newShelf.capacity > 0.8
                              ? 'bg-red-600'
                              : newShelf.currentItems / newShelf.capacity > 0.5
                              ? 'bg-yellow-400'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${(newShelf.currentItems / newShelf.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateShelf(shelf.id)}
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
                    <TableCell>{shelf.id}</TableCell>
                    <TableCell>{stores.find((s) => s.id === shelf.storeId)?.name || 'N/A'}</TableCell>
                    <TableCell>{shelf.name}</TableCell>
                    <TableCell>{shelf.capacity}</TableCell>
                    <TableCell>{shelf.currentItems}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditing(shelf)}
                          className="text-yellow-600 hover:text-yellow-800"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => confirmDelete(shelf.id)}
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
            {filteredShelves.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  {selectedStoreId === 'all'
                    ? 'Không có kệ hàng nào.'
                    : 'Cửa hàng này chưa có kệ hàng nào.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default ShelfManagement;
