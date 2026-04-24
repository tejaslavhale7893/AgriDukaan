import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('agri_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('agri_is_admin') === 'true';
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('agri_users_list');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem('agri_user', JSON.stringify(user));
    else localStorage.removeItem('agri_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('agri_is_admin', isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('agri_users_list', JSON.stringify(users));
    
    // Sync current user state with users list (important for status updates)
    if (user && !isAdmin) {
      const updatedUser = users.find(u => u.email === user.email);
      if (updatedUser && JSON.stringify(updatedUser) !== JSON.stringify(user)) {
        setUser(updatedUser);
      }
    }
  }, [users, user, isAdmin]);

  // Listen for changes from other tabs (Multi-tab Sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'agri_users_list') {
        setUsers(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (identifier, password) => {
    const foundUser = users.find(u => (u.email === identifier || u.phone === identifier) && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      setIsAdmin(false);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const signup = (userData) => {
    if (users.find(u => u.email === userData.email || u.phone === userData.phone)) {
      return { success: false, message: 'User with this email or phone already exists' };
    }
    const newUser = { ...userData, orders: [] };
    setUsers([...users, newUser]);
    setUser(newUser);
    return { success: true };
  };

  const adminLogin = (email, password) => {
    if (email === 'tejaslavhale7893@gmail.com' && password === 'Tejas008@.') {
      setIsAdmin(true);
      setUser({ email: 'tejaslavhale7893@gmail.com', name: 'Admin', role: 'admin', phone: '0000000000' });
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Credentials' };
  };

  const [queries, setQueries] = useState(() => {
    const saved = localStorage.getItem('agri_queries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('agri_queries', JSON.stringify(queries));
  }, [queries]);

  const addQuery = (queryData) => {
    const newQuery = {
      ...queryData,
      id: `QRY-${Date.now()}`,
      date: new Date().toLocaleString(),
      status: 'Unread'
    };
    setQueries([newQuery, ...queries]);
    toast.success('Your query has been submitted. We will contact you soon!');
  };

  const updateQueryStatus = (queryId, status) => {
    setQueries(queries.map(q => q.id === queryId ? { ...q, status } : q));
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const updateOrderStatus = (userEmail, orderId, newStatus) => {
    const updatedUsers = users.map(u => {
      if (u.email === userEmail) {
        return {
          ...u,
          orders: (u.orders || []).map(o => o.id === orderId ? { ...o, status: newStatus } : o)
        };
      }
      return u;
    });
    setUsers(updatedUsers);
    
    // If the logged in user is the one whose order was updated, update their state too
    if (user && user.email === userEmail) {
      setUser({
        ...user,
        orders: (user.orders || []).map(o => o.id === orderId ? { ...o, status: newStatus } : o)
      });
    }
  };

  const addOrderToUser = (order) => {
    if (!user) return;
    const updatedUsers = users.map(u => {
      if (u.email === user.email) {
        return { ...u, orders: [...(u.orders || []), order] };
      }
      return u;
    });
    setUsers(updatedUsers);
    setUser({ ...user, orders: [...(user.orders || []), order] });
  };

  return (
    <AuthContext.Provider value={{ 
      user, isAdmin, users, queries, 
      login, signup, adminLogin, logout, 
      addOrderToUser, updateOrderStatus,
      addQuery, updateQueryStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};
