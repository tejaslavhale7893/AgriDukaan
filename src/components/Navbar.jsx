import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { Search, ShoppingCart, User, LogOut, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-wrapper">
        <Link to="/" className="nav-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <div style={{ background: 'var(--accent)', padding: '6px', borderRadius: '10px' }}>
            <ShoppingCart size={24} color="var(--primary)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
            <span>Agri<span style={{ color: 'var(--accent-dark)' }}>Dukaan</span></span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'lowercase' }}>by lavhale product</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shopping</Link>
          {user && !isAdmin && <Link to="/orders" className="nav-link">Your Orders</Link>}
          {isAdmin && <Link to="/admin-dashboard" className="nav-link" style={{ color: 'var(--accent-dark)' }}>Admin Panel</Link>}
          {!isAdmin && <Link to="/admin-login" className="nav-link" style={{ opacity: 0.7, fontSize: '13px' }}>Admin</Link>}
        </div>

        <form onSubmit={handleSearch} className="search-bar">
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search fresh products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="nav-actions">
          <button className="mobile-only" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={24} color="var(--primary)" />
          </button>

          <Link to="/cart" style={{ position: 'relative' }} onClick={() => setIsMobileMenuOpen(false)}>
            <ShoppingCart size={24} color="var(--primary)" />
            {cart.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ 
                  position: 'absolute', top: '-8px', right: '-8px', 
                  background: 'var(--accent-dark)', color: 'white', 
                  fontSize: '11px', fontWeight: '800', 
                  width: '18px', height: '18px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  borderRadius: '50%' 
                }}
              >
                {cart.length}
              </motion.span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Link to="/orders" className="flex-center" style={{ gap: '5px' }}>
                <User size={20} />
                <span className="nav-link" style={{ fontSize: '14px', margin: 0 }}>{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={logout} className="flex-center" style={{ color: 'var(--error)' }}>
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="nav-mobile-menu mobile-only"
          >
            <form onSubmit={handleSearch} style={{ display: 'flex', background: '#f1f5f9', padding: '10px 15px', borderRadius: '12px', gap: '10px', marginBottom: '10px' }}>
              <Search size={18} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search..." 
                style={{ background: 'none', border: 'none', outline: 'none', width: '100%' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Link to="/" className="nav-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="nav-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Shopping</Link>
            {user && !isAdmin && <Link to="/orders" className="nav-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Your Orders</Link>}
            {isAdmin && <Link to="/admin-dashboard" className="nav-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Admin Panel</Link>}
            {!isAdmin && <Link to="/admin-login" className="nav-mobile-link" style={{ opacity: 0.5 }} onClick={() => setIsMobileMenuOpen(false)}>Admin Login</Link>}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
