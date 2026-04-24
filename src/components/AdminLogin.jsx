import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { ShieldCheck, Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { adminLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = adminLogin(email, password);
    if (result.success) {
      toast.success('Admin authenticated');
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 500);
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
        style={{ borderTop: '6px solid var(--primary)' }}
      >
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <div className="flex-center" style={{ width: '70px', height: '70px', background: '#f8fafc', borderRadius: '20px', margin: '0 auto 20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
            <ShieldCheck size={36} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary)' }}>Admin Access</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>Secure merchant portal</p>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label className="form-label">Admin Email</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} size={18} color="#94a3b8" />
              <input 
                type="email" 
                className="form-input" 
                placeholder="admin@agridukaan.com" 
                style={{ paddingLeft: '48px' }}
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} size={18} color="#94a3b8" />
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••" 
                style={{ paddingLeft: '48px' }}
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Verify & Enter Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
