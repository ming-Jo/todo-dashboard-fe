import { useState } from 'react';

export const useModal = (initialVisible = false) => {
  const [isOpen, setIsOpen] = useState(initialVisible);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
