import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  doc 
} from 'firebase/firestore';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      setProducts(productsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addProduct = async (product) => {
    try {
      await addDoc(collection(db, 'products'), product);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct, updateProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

