// Create this new file at: src/components/Modal.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { useModal } from '../context/ModalContext';

const Modal = () => {
  const { isOpen, closeModal, modalContent } = useModal();

  // Animation for the backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Animation for the modal panel itself
  const modalVariants = {
    hidden: { y: "50px", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { y: "50px", opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop with blur effect */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal} // Close modal when clicking on the background
          ></div>
          
          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-md bg-white rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            <button 
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <HiX className="w-6 h-6" />
            </button>
            {modalContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

