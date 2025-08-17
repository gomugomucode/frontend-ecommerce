
import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const ModalContext = createContext();

// 2. Create the custom hook for easy access
export const useModal = () => {
  return useContext(ModalContext);
};

// 3. Create the provider component
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // We delay clearing the content to allow for exit animations
    setTimeout(() => setModalContent(null), 300); 
  };

  const value = {
    isOpen,
    openModal,
    closeModal,
    modalContent,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};
