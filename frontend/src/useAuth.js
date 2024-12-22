import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  return { user, loading };
};

