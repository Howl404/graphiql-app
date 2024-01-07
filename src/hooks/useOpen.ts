import { useState } from 'react';

export default function useOpen(initialValue: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return { isOpen, handleOpen, handleClose };
}
