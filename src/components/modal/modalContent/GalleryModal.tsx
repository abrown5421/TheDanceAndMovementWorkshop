import React from 'react';
import { useAppSelector } from '../../../app/store/hooks';

const GalleryModal: React.FC = () => {
  const modal = useAppSelector((state) => state.modal);

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={modal.modalImageUrl} alt={modal.modalTitle} className="max-w-full max-h-[80vh] rounded mb-4" />
      <p className="text-center text-gray-700">{modal.modalTitle}</p>
    </div>
  );
};

export default GalleryModal;
