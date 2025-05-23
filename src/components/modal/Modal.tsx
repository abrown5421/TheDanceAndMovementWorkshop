import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import Transition from '../transition/Transition';
import { clearModalCallback, setModalOpen } from './modalSlice';
import ExampleModal from './modalContent/ExampleModal';
import GalleryModal from './modalContent/GalleryModal';
import NewPageModal from './modalContent/NewPageModal';
import ConfirmOrDenyModal from './modalContent/ConfirmOrDenyModal';

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(setModalOpen(false));
    dispatch(clearModalCallback());
  };

  const ModalContent = () => {
    switch (modal.modalContent) {
      case 'Gallery':
        return <GalleryModal />;
      case 'AddNewPage':
        return <NewPageModal />
      case 'deletePage':
        return (
          <ConfirmOrDenyModal
            onConfirm={() => {
              modal.modalCallback?.(); 
              dispatch(clearModalCallback());
            }}
          />
        );
      case 'Primary':
      default:
        return <ExampleModal />;
    }
  };

  return (
    <>
      <Transition isEntering={modal.modalOpen} speed="overlay-duration" tailwindClass='absolute top-0 bottom-0 right-0 left-0 w-screen h-screen bg-black/80 z-40'>
        <div
          className="absolute top-0 bottom-0 right-0 left-0 w-screen h-screen"
          style={{zIndex: 1000}}
          onClick={handleClose} 
        />
      </Transition>

      <Transition
        entry="animate__backInUp"
        exit="animate__backOutDown"
        isEntering={modal.modalOpen}
        speed="fast"
        tailwindClass="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          className="bg-white p-8 rounded shadow-lg relative min-w-1/3"
          onClick={(e) => e.stopPropagation()} 
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            aria-label="Close modal"
          >
            ×
          </button>
          <div>{ModalContent()}</div>
        </div>
      </Transition>
    </>
  );
};

export default Modal;