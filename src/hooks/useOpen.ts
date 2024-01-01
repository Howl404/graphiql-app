import { useState } from 'react';

export default function useOpen() {
  const [isOpen, setIsOpen] = useState(false);

  return { isOpen, setIsOpen };
}
