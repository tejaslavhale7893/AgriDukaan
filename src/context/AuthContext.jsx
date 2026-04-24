import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  onSnapshot, 
  doc, 
  query, 
  where,
  getDocs 
} from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('agri_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('agri_is_admin') === 'true';
  });

  const [users, setUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [queriesList, setQueriesList] = useState([]);

  // Sync users from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    });
    return () => unsubscribe();
  }, []);

  // Sync orders from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllOrders(ordersData.sort((a, b) => b.id.localeCompare(a.id)));
    });
    return () => unsubscribe();
  }, []);

  // Sync queries from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'queries'), (snapshot) => {
      const queriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQueriesList(queriesData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('agri_user', JSON.stringify(user));
    else localStorage.removeItem('agri_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('agri_is_admin', isAdmin);
  }, [isAdmin]);

  const login = async (identifier, password) => {
    const foundUser = users.find(u => (u.email === identifier || u.phone === identifier) && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      setIsAdmin(false);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const signup = async (userData) => {
    if (users.find(u => u.email === userData.email || u.phone === userData.phone)) {
      return { success: false, message: 'User with this email or phone already exists' };
    }
    try {
      const newUser = { ...userData, role: 'customer', createdAt: new Date().toISOString() };
      const docRef = await addDoc(collection(db, 'users'), newUser);
      setUser({ ...newUser, id: docRef.id });
      return { success: true };
    } catch (error) {
      console.error("Error signing up:", error);
      return { success: false, message: 'Signup failed. Please try again.' };
    }
  };

  const adminLogin = (email, password) => {
    if (email === 'tejaslavhale7893@gmail.com' && password === 'Tejas008@.') {
      setIsAdmin(true);
      setUser({ email: 'tejaslavhale7893@gmail.com', name: 'Admin', role: 'admin', phone: '0000000000' });
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Credentials' };
  };

  const addQuery = async (queryData) => {
    try {
      const newQuery = {
        ...queryData,
        date: new Date().toLocaleString(),
        status: 'Unread'
      };
      await addDoc(collection(db, 'queries'), newQuery);
      toast.success('Your query has been submitted. We will contact you soon!');
    } catch (error) {
      toast.error('Failed to submit query.');
    }
  };

  const updateQueryStatus = async (queryId, status) => {
    try {
      const queryRef = doc(db, 'queries', queryId);
      await updateDoc(queryRef, { status });
    } catch (error) {
      toast.error('Failed to update status.');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const addOrderToUser = async (order) => {
    if (!user) return;
    try {
      // Save order with redundant identifying info to ensure visibility
      const newOrder = { 
        ...order, 
        userId: user.id || 'N/A', 
        userEmail: user.email,
        status: order.status || 'Pending Verification'
      };
      await addDoc(collection(db, 'orders'), newOrder);
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error('Failed to place order in database.');
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
      return { success: true };
    } catch (error) {
      console.error("Update failed:", error);
      toast.error('Failed to update status.');
      return { success: false };
    }
  };


  return (
    <AuthContext.Provider value={{ 
      user, isAdmin, users, queries: queriesList, allOrders,
      login, signup, adminLogin, logout, 
      addOrderToUser, updateOrderStatus,
      addQuery, updateQueryStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

