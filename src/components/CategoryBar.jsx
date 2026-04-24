import React from 'react';
import { categories } from '../ProductData';

const CategoryBar = () => {
  return (
    <div className="category-bar">
      <div className="container flex justify-between">
        {categories.map((cat, index) => (
          <div key={index} className="category-item">
            <img src={cat.image} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
