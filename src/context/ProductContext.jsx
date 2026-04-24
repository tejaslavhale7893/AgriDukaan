import React, { createContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../ProductData';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('agri_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('agri_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...updatedProduct, id } : p));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
