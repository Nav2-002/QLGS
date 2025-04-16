import React, { useState } from 'react';
import useForm from '../../../hooks/useForm';
import { createPromotion } from '../../../services/promotionService';
const PromotionCreateForm = ({ onSuccess, onCancel }) => {
  const initialState = {
    name: '',
    description: '',
    type: '',
    value: 0,
    startDate: '',
    endDate: '',
    status: false,
  };

  const promotionFields = [
    { id: 'name', name: 'name', label: 'Tên khuyến mãi', placeholder: 'Tên khuyến mãi', required: true },
    { id: 'description', name: 'description', label: 'Mô tả', placeholder: 'Mô tả' },
    {
      id: 'type',
      name: 'type',
      label: 'Loại khuyến mãi',
      placeholder: 'Loại khuyến mãi',
      type: 'select',
      options: ['Percentage', 'Cash'],
      required: true,
    },
    { id: 'value', name: 'value', label: 'Giá trị', type: 'number', placeholder: 'Giá trị', required: true },
    { id: 'startDate', name: 'startDate', label: 'Ngày bắt đầu', type: 'date', required: true },
    { id: 'endDate', name: 'endDate', label: 'Ngày kết thúc', type: 'date', required: true },
    { id: 'status', name: 'status', label: 'Trạng thái', type: 'checkbox' },
  ];

  const [formError, setFormError] = useState(null);
  const { formData, errors, handleChange, handleSubmit } = useForm({
    initialState,
    onSuccess,
    createItem: createPromotion,
    fields: promotionFields,
    onError: (errorMessage) => {
      setFormError(errorMessage);
    },
  });

  const handleSubmitWithConvert = async (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Thêm Khuyến mãi</h2>
      {formError && <p className="text-red-500 mb-4">{formError}</p>}
      <form onSubmit={handleSubmitWithConvert} className="space-y-4">
        {promotionFields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Chọn loại khuyến mãi</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                checked={field.type === 'checkbox' ? formData[field.name] : undefined}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            )}
            {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
          </div>
        ))}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromotionCreateForm;