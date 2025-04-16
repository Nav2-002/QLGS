import { useState, useEffect, useRef } from 'react';

const useForm = ({ initialState, selectedItem, onSuccess, createItem, updateItem, fields, onError }) => {
  const initialStateRef = useRef(initialState);
  const selectedItemRef = useRef(selectedItem);

  const [formData, setFormData] = useState(initialStateRef.current);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedItemRef.current) {
      setFormData(selectedItemRef.current);
    } else {
      setFormData(initialStateRef.current);
    }
  }, [selectedItemRef.current, initialStateRef.current]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        tempErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formattedData = {
          name: formData.name,
          description: formData.description,
          type: formData.type,
          value: Number(formData.value),
          startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
          endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
          status: formData.status,
          // Loại bỏ _id, createdAt, updatedAt, __v
        };

        console.log("Dữ liệu gửi đi khi cập nhật:", formattedData);

        if (selectedItem) {
          await updateItem(selectedItem._id, formattedData);
        } else {
          await createItem(formattedData);
        }
        onSuccess();
      } catch (error) {
        if (onError) {
          onError(error.message);
        } else {
          console.error("Error submitting form:", error);
        }
      }
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;