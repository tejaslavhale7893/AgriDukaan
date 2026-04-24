import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="container flex-center" style={{ minHeight: '60vh', flexDirection: 'column' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <ShoppingBag size={80} color="var(--text-muted)" style={{ marginBottom: '24px' }} />
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px' }}>Your cart is empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '40px' }}>Shopping Cart</h1>
      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Cart Items */}
        <div style={{ flex: 2, minWidth: '350px' }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow)' }}>
            <AnimatePresence>
              {cart.map(item => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 0', borderBottom: '1px solid #f1f5f9' }}
                >
                  <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', borderRadius: '16px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700' }}>{item.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{item.category}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '8px', padding: '4px' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '4px' }}><Minus size={16} /></button>
                        <span style={{ width: '50px', textAlign: 'center', fontWeight: '700' }}>{item.quantity} kg</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '4px' }}><Plus size={16} /></button>
                      </div>
                      <span style={{ fontWeight: '800', color: 'var(--primary)' }}>₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--error)', padding: '10px' }}>
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow)', position: 'sticky', top: '120px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span style={{ fontWeight: '700' }}>₹{getCartTotal()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Weight</span>
                <span style={{ fontWeight: '700' }}>{cart.reduce((total, item) => total + item.quantity, 0)} kg</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                <span style={{ color: 'var(--success)', fontWeight: '700' }}>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: '800' }}>Total</span>
                <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)' }}>₹{getCartTotal()}</span>
              </div>
            </div>
            <button onClick={handleCheckout} className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
              Checkout <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
