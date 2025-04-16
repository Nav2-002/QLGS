import { useState, useEffect } from 'react';
import { getAllPromotions, deletePromotion } from '../services/promotionService';
const usePromotionList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const columns = [
    { key: 'name', header: 'Tên khuyến mãi' },
    { key: 'description', header: 'Mô tả' },
    { key: 'type', header: 'Loại khuyến mãi' },
    { key: 'value', header: 'Giá trị' },
    { key: 'startDate', header: 'Ngày bắt đầu' },
    { key: 'endDate', header: 'Ngày kết thúc' },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (value) => (value ? 'Kích hoạt' : 'Không kích hoạt'),
    },
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const data = await getAllPromotions();
      setItems(data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Lỗi khi lấy danh sách khuyến mãi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa khuyến mãi này không?')) return;
    try {
      await deletePromotion(id);
      fetchItems();
      setMessage('Đã xóa khuyến mãi thành công.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Lỗi khi xóa khuyến mãi.');
    }
  };

  return { items, isLoading, message, handleDelete, columns };
};

export default usePromotionList;