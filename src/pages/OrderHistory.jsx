import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Package, Clock, MapPin, CheckCircle2, Circle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const TRACKING_STEPS = [
  'Order Placed',
  'Approved',
  'Processing',
  'Out for Delivery',
  'Delivered'
];

const STATUS_MAP = {
  'Pending Verification': 'Order Placed',
  'Approved': 'Approved',
  'Processing': 'Processing',
  'Out for Delivery': 'Out for Delivery',
  'Delivered': 'Delivered'
};

const OrderHistory = () => {
  const { user, allOrders } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container flex-center" style={{ minHeight: '60vh', flexDirection: 'column' }}>
        <h2 className="mb-20">Please login to view orders</h2>
        <Link to="/login" className="btn btn-primary">Login Now</Link>
      </div>
    );
  }

  const orders = (allOrders || []).filter(o => o.userId === user.id || o.userId === user.email);


  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '40px' }}>Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center" style={{ padding: '80px 0', background: 'white', borderRadius: '32px', boxShadow: 'var(--shadow)' }}>
          <Package size={64} color="var(--text-muted)" style={{ marginBottom: '24px' }} />
          <h2>No orders yet</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>When you place orders, they will appear here.</p>
          <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {orders.map((order, index) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: 'var(--shadow)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '24px' }}>
                <div>
                  <p style={{ 
                    fontSize: '14px', 
                    fontWeight: '700', 
                    color: order.status === 'Pending Verification' ? '#f59e0b' : 
                           order.status === 'Approved' ? 'var(--success)' : 
                           order.status === 'Rejected' ? 'var(--error)' : 'var(--accent-dark)', 
                    marginBottom: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {order.status}
                    {order.status === 'Pending Verification' && <span style={{ fontSize: '10px', background: '#fef3c7', padding: '2px 8px', borderRadius: '99px' }}>Waiting for Admin</span>}
                    {order.status === 'Approved' && <span style={{ fontSize: '10px', background: '#dcfce7', color: 'var(--success)', padding: '2px 8px', borderRadius: '99px' }}>Success</span>}
                  </p>
                  <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Order #{order.id}</h3>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {order.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> {order.address.city}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Total Amount</p>
                  <p style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)' }}>₹{order.total}</p>
                </div>
              </div>

              {/* Order Tracking Progress */}
              {order.status !== 'Rejected' && (
                <div style={{ marginBottom: '32px', padding: '0 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', alignItems: 'center' }}>
                    {/* Background Line */}
                    <div style={{ position: 'absolute', top: '15px', left: '0', right: '0', height: '2px', background: '#f1f5f9', zIndex: 0 }} />
                    
                    {/* Active Line */}
                    <div style={{ 
                      position: 'absolute', top: '15px', left: '0', 
                      width: `${(TRACKING_STEPS.indexOf(STATUS_MAP[order.status]) / (TRACKING_STEPS.length - 1)) * 100}%`, 
                      height: '2px', background: 'var(--accent-dark)', zIndex: 1, transition: 'all 0.5s ease' 
                    }} />

                    {TRACKING_STEPS.map((step, i) => {
                      const currentStatusLabel = STATUS_MAP[order.status];
                      const isActive = TRACKING_STEPS.indexOf(currentStatusLabel) >= i;
                      const isCurrent = currentStatusLabel === step;
                      return (
                        <div key={i} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <div style={{ 
                            width: '32px', height: '32px', borderRadius: '50%', background: isActive ? 'var(--accent-dark)' : 'white', 
                            border: isActive ? 'none' : '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: isCurrent ? '0 0 0 4px #dcfce7' : 'none'
                          }}>
                            {isActive ? <CheckCircle2 size={18} color="white" /> : <Circle size={16} color="#94a3b8" />}
                          </div>
                          <span style={{ 
                            fontSize: '10px', fontWeight: '800', textAlign: 'center', maxWidth: '60px',
                            color: isCurrent ? 'var(--primary)' : 'var(--text-muted)'
                          }}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{ flexShrink: 0, width: '80px', textAlign: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', marginBottom: '8px' }} />
                    <p style={{ fontSize: '11px', fontWeight: '700', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.name}</p>
                    <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.quantity} kg</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
