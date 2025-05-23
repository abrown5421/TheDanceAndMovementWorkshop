import React from 'react';
import { useAppDispatch } from '../../../app/store/hooks';
import { setModalOpen } from '../modalSlice';
import type { ConfirmOrDenyModalProps } from '../modalTypes';

const ConfirmOrDenyModal: React.FC<ConfirmOrDenyModalProps> = ({ onConfirm, onCancel }) => {
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    dispatch(setModalOpen(false));
    onCancel?.();
  };

  const handleConfirm = () => {
    dispatch(setModalOpen(false));
    onConfirm();
  };

  return (
    <div className="text-center">
      <p className="mb-4 text-lg">Are you sure you'd like to do this? <br />It cannot be undone.</p>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrDenyModal;