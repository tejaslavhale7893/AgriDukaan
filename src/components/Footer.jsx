import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="section-padding" style={{ background: 'var(--primary)', color: 'white', padding: '80px 0 40px', marginTop: '100px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', marginBottom: '60px' }}>
          <div>
            <Link to="/" className="nav-logo" style={{ color: 'white', marginBottom: '24px' }}>
              <div style={{ background: 'var(--accent)', padding: '6px', borderRadius: '10px' }}>
                <ShoppingCart size={24} color="var(--primary)" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                <span>Agri<span style={{ color: 'var(--accent)' }}>Dukaan</span></span>
                <span style={{ fontSize: '10px', fontWeight: '600', color: '#94a3b8', textTransform: 'lowercase' }}>by lavhale product</span>
              </div>
            </Link>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', marginBottom: '24px' }}>
              Providing the freshest organic products directly from farms to your table. Sustainable, healthy, and delicious.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              {[FaFacebook, FaTwitter, FaInstagram].map((Icon, i) => (
                <a key={i} href="https://www.youtube.com/@panduranglavhale542" style={{ background: '#1e293b', padding: '10px', borderRadius: '12px', color: 'white', transition: '0.3s' }}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/shop" style={{ color: '#94a3b8' }}>All Products</Link></li>
              <li><Link to="/orders" style={{ color: '#94a3b8' }}>Track Order</Link></li>
              <li><Link to="/admin-login" style={{ color: '#94a3b8' }}>Merchant Login</Link></li>
              <li><Link to="/login" style={{ color: '#94a3b8' }}>My Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px' }}>Contact Us</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
                <MapPin size={20} color="var(--accent)" />
                <span>At.post Babhulgoev TQ.pathri Dist.parbhani ,Maharashtra</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
                <Phone size={20} color="var(--accent)" />
                <span>+91 8329610279</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
                <Mail size={20} color="var(--accent)" />
                <span>tejaslavhale7893@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px' }}>Newsletter</h4>
            <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>Subscribe to get latest updates and offers.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="email"
                placeholder="Your email"
                style={{ background: '#1e293b', border: 'none', padding: '12px 16px', borderRadius: '12px', color: 'white', flex: 1, outline: 'none' }}
              />
              <button className="btn-accent" style={{ padding: '12px' }}>Join</button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '40px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
          <p>© 2026 AgriNova E-Commerce. All rights reserved. Designed for Health & Nature.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
