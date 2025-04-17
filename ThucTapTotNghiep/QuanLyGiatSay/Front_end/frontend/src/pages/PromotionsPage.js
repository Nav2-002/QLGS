
import React, { useState, useEffect } from 'react';
import PromotionCreateForm from '../components/promotion/PromotionForm/PromotionCreateForm';
import PromotionUpdateForm from '../components/promotion/PromotionForm/PromotionUpdateForm';
import PromotionList from '../components/promotion/PromotionList/PromotionList';
const PromotionPage = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleEditClick = (promotion) => {
    setSelectedPromotion(promotion);
    setIsEditing(true);
  };

  const handleCreateSuccess = () => {
    setIsCreating(false);
    // Refetch the promotion
    // list after successful creation
    window.location.reload(); // Simple way to refresh data
  };

  const handleUpdateSuccess = () => {
    setIsEditing(false);
    setSelectedPromotion(null);
    window.location.reload(); // Simple way to refresh data
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedPromotion(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Quản lý Khuyến mãi</h2>
      <div className="mb-4">
        <button
          onClick={handleCreateClick}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Thêm Khuyến mãi
        </button>
      </div>

      <PromotionList onEdit={handleEditClick} />

      {isCreating && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <PromotionCreateForm onSuccess={handleCreateSuccess} onCancel={handleCancelCreate} />
        </div>
      )}

      {isEditing && selectedPromotion && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <PromotionUpdateForm
            selectedItem={selectedPromotion}
            onSuccess={handleUpdateSuccess}
            onCancel={handleCancelEdit}
          />
        </div>
      )}
    </div>
  );
};

export default PromotionPage;