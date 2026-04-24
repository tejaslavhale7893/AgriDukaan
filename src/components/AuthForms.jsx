import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User as UserIcon, ArrowRight, Phone } from 'lucide-react';

export const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(identifier, password);
    if (result.success) {
      toast.success('Welcome back!');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="auth-page">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="auth-card"
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary)', marginBottom: '8px' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Login to manage your farm orders</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email or Phone</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} size={18} color="#94a3b8" />
              <input 
                type="text" className="form-input" placeholder="Enter your details" 
                style={{ paddingLeft: '48px' }} required
                value={identifier} onChange={e => setIdentifier(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} size={18} color="#94a3b8" />
              <input 
                type="password" className="form-input" placeholder="••••••••" 
                style={{ paddingLeft: '48px' }} required
                value={password} onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Sign In <ArrowRight size={18} />
          </button>
        </form>
        <p className="text-center" style={{ marginTop: '32px', color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--accent-dark)', fontWeight: '800' }}>Create Account</Link>
        </p>
        <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
          <Link to="/admin-login" style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Are you an Admin? Login here</Link>
        </div>
      </motion.div>
    </div>
  );
};

export const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = signup(formData);
    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="auth-page">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="auth-card"
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary)', marginBottom: '8px' }}>Create Account</h2>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Join the AgriDukaan community today</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <UserIcon style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} size={18} color="#94a3b8" />
              <input 
                type="text" className="form-input" placeholder="Your Name" 
                style={{ paddingLeft: '48px' }} required
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} size={18} color="#94a3b8" />
              <input 
                type="email" className="form-input" placeholder="name@example.com" 
                style={{ paddingLeft: '48px' }} required
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div style={{ position: 'relative' }}>
              <Phone style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} size={18} color="#94a3b8" />
              <input 
                type="tel" className="form-input" placeholder="+91 00000 00000" 
                style={{ paddingLeft: '48px' }} required
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} size={18} color="#94a3b8" />
              <input 
                type="password" className="form-input" placeholder="••••••••" 
                style={{ paddingLeft: '48px' }} required
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Create Account <ArrowRight size={18} />
          </button>
        </form>
        <p className="text-center" style={{ marginTop: '32px', color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-dark)', fontWeight: '800' }}>Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};
