import { useState } from 'react';

export default function useOpen(initialValue: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  return { isOpen, setIsOpen };
}
