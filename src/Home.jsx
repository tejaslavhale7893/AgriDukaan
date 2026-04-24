import React, { useContext } from 'react';
import { ProductContext } from './context/ProductContext';
import { AuthContext } from './context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Home = () => {
  const { products, loading } = useContext(ProductContext);
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) return (
    <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', gap: '20px' }}>
      <div className="animate-spin" style={{ width: '50px', height: '50px', border: '5px solid #f1f5f9', borderTopColor: 'var(--primary)', borderRadius: '50%' }}></div>
      <p style={{ fontWeight: '700', color: 'var(--primary)' }}>Loading Fresh Products...</p>
    </div>
  );


  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '100px 0', background: 'white', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ flex: 1, minWidth: '350px' }}
            className="animate-fade-in"
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#f1f5f9', padding: '10px 20px', borderRadius: '99px', marginBottom: '24px' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--accent-dark)' }}>NEW SEASON</span>
              <span style={{ width: '4px', height: '4px', background: '#cbd5e1', borderRadius: '50%' }}></span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Fresh Harvest is here</span>
            </div>
            <h1 style={{ fontSize: '80px', fontWeight: '900', lineHeight: '1', color: 'var(--primary)', marginBottom: '32px', letterSpacing: '-0.02em' }}>
              Freshness <br /> Delivered to <br /> <span style={{ color: 'var(--accent-dark)' }}>Your Door.</span>
            </h1>
            <p style={{ fontSize: '22px', color: 'var(--text-muted)', marginBottom: '48px', maxWidth: '550px', lineHeight: '1.6' }}>
              Experience the highest quality organic agricultural products sourced directly from local farmers with our 24h farm-to-table promise.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <button onClick={() => navigate('/shop')} className="btn btn-primary" style={{ padding: '20px 40px', fontSize: '18px' }}>
                Start Shopping <ArrowRight size={20} />
              </button>
              <button onClick={() => navigate('/products')} className="btn" style={{ border: '2px solid var(--primary)', padding: '20px 40px', fontSize: '18px' }}>
                View Catalog
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            style={{ flex: 1, minWidth: '350px', position: 'relative' }}
          >
            <div className="animate-float">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=800&fit=crop" 
                alt="Fresh Basket" 
                style={{ width: '70%', borderRadius: '60px', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.3)', transform: 'perspective(1000px) rotateY(-5deg)' }}
              />
            </div>
            
            {/* Floating Info Card */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ position: 'absolute', top: '15%', right: '-10%', padding: '24px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '16px' }}
              className="glass"
            >
              <div style={{ background: '#fef3c7', padding: '14px', borderRadius: '16px' }}>
                <Star size={28} fill="#fbbf24" color="#fbbf24" />
              </div>
              <div>
                <p style={{ fontSize: '20px', fontWeight: '900' }}>4.9/5</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>Top Rated Service</p>
              </div>
            </motion.div>

            {/* Organic Badge */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ position: 'absolute', bottom: '10%', left: '-10%', padding: '16px 24px', borderRadius: '24px', background: 'var(--accent)', color: 'var(--primary)', fontWeight: '900', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              🌱 100% Organic
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features with Hover Effects */}
      <section style={{ padding: '100px 0', background: '#f8fafc' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          {[
            { icon: <Truck size={40} />, title: 'Free Delivery', desc: 'On all orders above ₹500 across the region.' },
            { icon: <ShieldCheck size={40} />, title: 'Secure Payment', desc: 'Verified UPI & encrypted transaction proofs.' },
            { icon: <ShoppingBag size={40} />, title: 'Fresh Guarantee', desc: 'Straight from the soil to your kitchen within 24h.' }
          ].map((f, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -15, scale: 1.05 }}
              className="text-center" 
              style={{ padding: '50px 40px', background: 'white', borderRadius: '40px', boxShadow: 'var(--shadow)', transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', cursor: 'default' }}
            >
              <div className="flex-center" style={{ color: 'var(--accent-dark)', marginBottom: '24px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '16px' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <div>
              <h2 style={{ fontSize: '42px', fontWeight: '800' }}>Featured Harvest</h2>
              <p style={{ color: 'var(--text-muted)' }}>Handpicked fresh products for you</p>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
              {isAdmin && (
                <Link to="/admin-dashboard" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                  + Add Product
                </Link>
              )}
              <Link to="/shop" style={{ fontWeight: '700', color: 'var(--accent-dark)', display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '10px' }}>
                See All <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="product-grid">
            {products.slice(0, 4).map((p, index) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="product-card"
                onClick={() => navigate(`/product/${p.id}`)}
                style={{ cursor: 'pointer', padding: '16px' }}
              >
                <div className="product-image-container" style={{ borderRadius: '16px', height: '180px', marginBottom: '16px' }}>
                  <img src={p.image} alt={p.name} className="product-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="product-info" style={{ padding: '0' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.category}</span>
                  <h3 className="product-title" style={{ fontSize: '17px', fontWeight: '800', margin: '4px 0 12px', height: '44px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--primary)' }}>₹{p.price}</span>
                    <button className="btn-accent" style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0' }}>
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Plus = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export default Home;

