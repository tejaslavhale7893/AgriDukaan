import React, { useContext, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingBag, Star, ArrowRight, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Shop = () => {
  const { products, removeProduct } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { isAdmin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Sidebar Filters */}
        <div style={{ width: '240px', flexShrink: 0 }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '24px', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '18px' }}>
              <Filter size={20} /> Categories
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{ 
                    textAlign: 'left', padding: '10px 16px', borderRadius: '12px',
                    background: selectedCategory === cat ? 'var(--primary)' : 'transparent',
                    color: selectedCategory === cat ? 'white' : 'var(--text-muted)',
                    fontWeight: '600', transition: 'all 0.3s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '800' }}>
                {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>Showing {filteredProducts.length} items</p>
            </div>
            {isAdmin && (
              <button onClick={() => navigate('/admin-dashboard')} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                + Add Product
              </button>
            )}
          </div>

          <div className="product-grid" style={{ paddingTop: 0 }}>
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p, index) => (
                <motion.div 
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="product-card"
                  style={{ padding: '16px' }}
                >
                  <div onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer' }}>
                    <div className="product-image-container" style={{ borderRadius: '16px', height: '180px', marginBottom: '16px' }}>
                      <img src={p.image} alt={p.name} className="product-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="product-info" style={{ padding: '0' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.category}</span>
                      <h3 className="product-title" style={{ fontSize: '17px', fontWeight: '800', margin: '4px 0 12px', height: '44px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--primary)' }}>₹{p.price}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                          <Star size={14} fill="#fbbf24" />
                          <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>{p.rating || '4.5'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button 
                      onClick={() => {
                        addToCart(p);
                        toast.success('Added to cart');
                      }}
                      className="btn btn-primary" 
                      style={{ width: '100%', padding: '10px' }}
                    >
                      Add to Cart
                    </button>
                    {isAdmin && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => navigate('/admin-dashboard')}
                          className="btn" 
                          style={{ flex: 1, padding: '8px', background: '#f1f5f9', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                        >
                          <Edit size={16} /> Edit
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm('Delete this product?')) {
                              removeProduct(p.id);
                              toast.success('Product deleted');
                            }
                          }}
                          className="btn" 
                          style={{ flex: 1, padding: '8px', background: '#fee2e2', color: 'var(--error)', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center" style={{ padding: '100px 0' }}>
              <Search size={64} color="var(--text-muted)" style={{ marginBottom: '20px' }} />
              <h3>No products found</h3>
              <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
