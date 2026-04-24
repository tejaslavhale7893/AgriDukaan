import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { RiDeleteBin6Line, RiAddLine, RiLockPasswordLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const AdminPanel = () => {
  const { products, addProduct, removeProduct } = useContext(ProductContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'Fruits', price: '', originalPrice: '', discount: '', image: '', description: '', rating: 4.5
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'tejaslavhale7893@gmail.com') {
      setIsLoggedIn(true);
    } else {
      alert('Access Denied! Only tejaslavhale7893@gmail.com can access the admin panel.');
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addProduct(newProduct);
    setNewProduct({ name: '', category: 'Fruits', price: '', originalPrice: '', discount: '', image: '', description: '', rating: 4.5 });
    alert('Product added successfully!');
  };

  if (!isLoggedIn) {
    return (
      <div className="container" style={{ marginTop: '100px' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ maxWidth: '450px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ width: '60px', height: '60px', background: '#e9f5ee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', color: '#2d6a4f', fontSize: '24px' }}>
              <RiLockPasswordLine />
            </div>
            <h2 style={{ color: '#1b4332' }}>Admin Access</h2>
            <p style={{ color: '#666' }}>Enter your administrator email to continue</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input 
                className="form-input"
                type="email" 
                placeholder="tejaslavhale7893@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '14px' }}
            >
              Verify Identity
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ color: '#1b4332', marginBottom: '40px' }}>Inventory Management</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
        {/* Add Product Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ background: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
        >
          <h3 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d6a4f' }}>
            <RiAddLine /> Add New Product
          </h3>
          <form onSubmit={handleAdd}>
            <div className="form-group">
              <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Product Name</label>
              <input type="text" className="form-input" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Category</label>
              <select className="form-input" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                <option>Fruits</option>
                <option>Vegetables</option>
                <option>Grains</option>
                <option>Tools</option>
                <option>Seeds</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Price (₹)</label>
                <input type="number" className="form-input" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Discount</label>
                <input type="text" className="form-input" placeholder="e.g. 10% off" value={newProduct.discount} onChange={e => setNewProduct({...newProduct, discount: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Image URL</label>
              <input type="text" className="form-input" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Description</label>
              <textarea className="form-input" rows="3" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
              Publish Product
            </button>
          </form>
        </motion.div>

        {/* Product List */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ background: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
        >
          <h3 style={{ marginBottom: '25px', color: '#2d6a4f' }}>Live Inventory ({products.length})</h3>
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {products.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 0', borderBottom: '1px solid #f0f0f0' }}>
                <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: '15px' }}>{p.name}</h4>
                  <span style={{ fontSize: '12px', color: '#666' }}>{p.category} • ₹{p.price}</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, color: '#ff4d4d' }}
                  onClick={() => removeProduct(p.id)}
                  style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '20px' }}
                >
                  <RiDeleteBin6Line />
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
