import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from 'src/firebase';

import Paths from 'enums/paths';

export default function useAuthHandler() {
  const navigate = useNavigate();
  const [wasAuthenticated, setWasAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setWasAuthenticated(true);
      } else if (wasAuthenticated) {
        navigate(Paths.Welcome);
      }
    });

    return () => unsubscribe();
  }, [navigate, wasAuthenticated]);
}
