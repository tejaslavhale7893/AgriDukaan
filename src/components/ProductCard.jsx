import React from 'react';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card" style={{ padding: '16px' }}>
      <div className="product-image-container" style={{ borderRadius: '16px', height: '180px', marginBottom: '16px' }}>
        <img src={product.image} alt={product.name} className="product-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="product-info" style={{ padding: '0' }}>
        <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{product.category}</span>
        <h3 className="product-title" style={{ fontSize: '17px', fontWeight: '800', margin: '4px 0 12px', height: '44px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{product.name}</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ 
            backgroundColor: 'var(--success)', 
            color: 'white', 
            fontSize: '11px', 
            padding: '3px 8px', 
            borderRadius: '99px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: '700'
          }}>
            {product.rating} <FaStar style={{ fontSize: '10px' }} />
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>(120)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--primary)' }}>₹{product.price}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px', textDecoration: 'line-through', marginLeft: '6px', fontWeight: '600' }}>₹{product.originalPrice}</span>
          </div>
          <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--success)', background: '#dcfce7', padding: '4px 8px', borderRadius: '8px' }}>
            {product.discount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
