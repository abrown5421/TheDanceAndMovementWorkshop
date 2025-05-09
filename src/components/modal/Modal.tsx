import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import Transition from '../transition/Transition';
import { setModalOpen } from './modalSlice';
import ExampleModal from './modalContent/ExampleModal';

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(setModalOpen(false))
  };

  const ModalContent = () => {
    switch (modal.modalContent) {
      case 'Primary':
        return <ExampleModal />;
      default:
        return <ExampleModal />;
    }
  };

  return (
    <>
      <Transition isEntering={modal.modalOpen} speed="overlay-duration">
        <div
          className="fixed inset-0 w-screen h-screen bg-black/80 z-40"
          onClick={handleClose} 
        />
      </Transition>

      <Transition
        entry="animate__backInUp"
        exit="animate__backOutDown"
        isEntering={modal.modalOpen}
        speed="fast"
      >
        <div className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center">
          <div
            className="bg-white p-8 rounded shadow-lg relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              aria-label="Close modal"
            >
              ×
            </button>

            <div className="text-xl font-bold">{modal.modalTitle}</div>
            <div>{ModalContent()}</div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Modal;