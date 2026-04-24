import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const { products, addProduct, removeProduct, updateProduct } = useContext(ProductContext);
  const { isAdmin, users, queries, updateOrderStatus, updateQueryStatus, allOrders } = useContext(AuthContext);
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Full screen preview
  const [view, setView] = useState('products'); // 'products', 'orders', or 'queries'
  const [formData, setFormData] = useState({
    name: '', category: 'Fruits', price: '', image: '', description: '', originalPrice: '', discount: ''
  });

  if (!isAdmin) return <div className="container">Access Denied</div>;

  const stats = {
    lifetime: allOrders.length,
    pendingVerification: allOrders.filter(o => o.status === 'Pending Verification').length,
    pendingDelivery: allOrders.filter(o => ['Approved', 'Processing', 'Out for Delivery'].includes(o.status)).length,
    delivered: allOrders.filter(o => o.status === 'Delivered').length,
    unreadQueries: (queries || []).filter(q => q.status === 'Unread').length
  };

  const handleVerifyOrder = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Order ${newStatus}`);
  };


  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addProduct(formData);
      setFormData({ name: '', category: 'Fruits', price: '', image: '', description: '', originalPrice: '', discount: '' });
      setShowAdd(false);
      toast.success('Product added successfully to database');
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error('Failed to save product. Check Firebase permissions.');
    }
  };


  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editingId, formData);
      setEditingId(null);
      setFormData({ name: '', category: 'Fruits', price: '', image: '', description: '', originalPrice: '', discount: '' });
      toast.success('Product updated successfully');
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error('Failed to update product.');
    }
  };


  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      removeProduct(id);
      toast.success('Product removed');
    }
  };

  return (
    <>
      <div className="container" style={{ padding: '60px 0' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setView('products')} 
            className={`btn ${view === 'products' ? 'btn-primary' : ''}`}
            style={{ flex: '1 1 auto', background: view === 'products' ? '' : '#f1f5f9', color: view === 'products' ? '' : 'var(--primary)', padding: '12px 20px', fontSize: '14px' }}
          >
            Products
          </button>
          <button 
            onClick={() => setView('orders')} 
            className={`btn ${view === 'orders' ? 'btn-primary' : ''}`}
            style={{ flex: '1 1 auto', background: view === 'orders' ? '' : '#f1f5f9', color: view === 'orders' ? '' : 'var(--primary)', padding: '12px 20px', fontSize: '14px' }}
          >
            Orders ({allOrders.length})
          </button>
          <button 
            onClick={() => setView('queries')} 
            className={`btn ${view === 'queries' ? 'btn-primary' : ''}`}
            style={{ flex: '1 1 auto', background: view === 'queries' ? '' : '#f1f5f9', color: view === 'queries' ? '' : 'var(--primary)', padding: '12px 20px', fontSize: '14px' }}
          >
            Queries ({stats.unreadQueries})
          </button>
        </div>

      {view !== 'products' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {[
            { label: 'Lifetime Orders', value: stats.lifetime, color: 'var(--primary)' },
            { label: 'Unread Queries', value: stats.unreadQueries, color: 'var(--error)' },
            { label: 'Pending Delivery', value: stats.pendingDelivery, color: 'var(--accent-dark)' },
            { label: 'Delivered', value: stats.delivered, color: 'var(--success)' }
          ].map((s, i) => (
            <div key={i} style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: 'var(--shadow)', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>{s.label}</p>
              <h2 style={{ fontSize: '32px', fontWeight: '900', color: s.color }}>{s.value}</h2>
            </div>
          ))}
        </div>
      )}

      {view === 'products' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800' }}>Product Inventory</h1>
            <button onClick={() => setShowAdd(!showAdd)} className="btn btn-primary">
              <Plus size={20} /> Add New Product
            </button>
          </div>

          <AnimatePresence>
            {showAdd && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                <div style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: 'var(--shadow)', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
                  <h3 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: '800' }}>Product Details</h3>
                  <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                    <div className="form-group">
                      <label className="form-label">Product Name</label>
                      <input className="form-input" placeholder="e.g. Fresh Red Apples" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select className="form-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option>Fruits</option>
                        <option>Vegetables</option>
                        <option>Grains</option>
                        <option>Tools</option>
                        <option>Seeds</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Price (₹)</label>
                      <input className="form-input" type="number" placeholder="0.00" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Image URL</label>
                      <input className="form-input" placeholder="https://..." value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label">Description</label>
                      <textarea className="form-input" placeholder="Tell customers about this product..." rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '15px' }}>
                      <button type="submit" className="btn btn-primary">Save Product</button>
                      <button type="button" onClick={() => setShowAdd(false)} className="btn btn-outline">Cancel</button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <tr>
                  <th style={{ padding: '20px', textAlign: 'left' }}>Product</th>
                  <th style={{ padding: '20px', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '20px', textAlign: 'left' }}>Price</th>
                  <th style={{ padding: '20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                        <span style={{ fontWeight: '600' }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>{p.category}</td>
                    <td style={{ padding: '20px', fontWeight: '700' }}>₹{p.price}</td>
                    <td style={{ padding: '20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button onClick={() => handleEdit(p)} style={{ padding: '8px', borderRadius: '8px', background: '#f1f5f9', color: 'var(--primary)' }}>
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(p.id)} style={{ padding: '8px', borderRadius: '8px', background: '#fee2e2', color: 'var(--error)' }}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
      ) : view === 'orders' ? (
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow)' }}>
          <h2 style={{ marginBottom: '24px' }}>Order Management</h2>
          {allOrders.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No orders found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {allOrders.map(order => (
                <div key={order.id} style={{ border: '1px solid #f1f5f9', padding: '24px', borderRadius: '20px', background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
                    <div style={{ flex: '1 1 300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <h4 style={{ margin: 0, fontSize: '18px' }}>Order #{order.id}</h4>
                        <span style={{ 
                          fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '99px',
                          background: order.status === 'Delivered' ? '#dcfce7' : '#fef3c7',
                          color: order.status === 'Delivered' ? 'var(--success)' : '#92400e'
                        }}>
                          {order.status}
                        </span>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '700' }}>👤 Customer: {order.customer?.name || order.userName}</p>
                        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>✉️ {order.customer?.email || order.userEmail}</p>
                        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>📞 Contact: {order.customer?.phone || order.address?.phone || 'N/A'}</p>
                        <p style={{ margin: '10px 0 0', fontSize: '14px' }}>📍 <b>Delivery Address:</b></p>
                        <p style={{ margin: 0, fontSize: '14px' }}>{order.address?.line1}, {order.address?.city} - {order.address?.pincode}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'left', minWidth: '150px' }}>
                      <p style={{ margin: 0, fontWeight: '800', fontSize: '20px', color: 'var(--primary)' }}>₹{order.total}</p>
                      <p style={{ margin: '5px 0', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-dark)' }}>{order.payment?.method || order.paymentMethod}</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Date: {order.date}</p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>📦 Items:</p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {order.items?.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', padding: '8px', borderRadius: '10px', border: '1px solid #e2e8f0', flex: '1 1 auto' }}>
                          <img src={item.image} alt={item.name} style={{ width: '30px', height: '30px', borderRadius: '4px', objectFit: 'cover' }} />
                          <span style={{ fontSize: '12px', fontWeight: '600' }}>{item.name} ({item.quantity}kg)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '20px', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '800', marginBottom: '12px' }}>Update Tracking Status:</p>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {order.status === 'Pending Verification' ? (
                          <>
                            <button onClick={() => handleVerifyOrder(order.id, 'Approved')} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>Approve Payment</button>
                            <button onClick={() => handleVerifyOrder(order.id, 'Rejected')} className="btn" style={{ padding: '8px 20px', fontSize: '13px', background: '#fee2e2', color: 'var(--error)' }}>Reject</button>
                          </>
                        ) : (
                          ['Processing', 'Out for Delivery', 'Delivered'].map(status => (
                            <button 
                              key={status}
                              onClick={() => handleVerifyOrder(order.id, status)}

                              className="btn" 
                              style={{ 
                                padding: '8px 16px', fontSize: '12px', 
                                background: order.status === status ? 'var(--primary)' : '#f1f5f9',
                                color: order.status === status ? 'white' : 'var(--text-main)',
                                border: order.status === status ? 'none' : '1px solid #e2e8f0'
                              }}
                            >
                              {status}
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                    {order.payment?.proofImage && (
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                        <img 
                          src={order.payment.proofImage} 
                          alt="Proof" 
                          style={{ width: '120px', height: '80px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #e2e8f0', cursor: 'zoom-in' }} 
                          onClick={() => setSelectedImage(order.payment.proofImage)}
                        />
                        <a 
                          href={order.payment.proofImage} 
                          download={`proof-${order.id}.png`}
                          style={{ fontSize: '11px', color: 'var(--accent-dark)', fontWeight: '700', textDecoration: 'none' }}
                        >
                          <Download size={12} /> Download
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow)' }}>
          <h2 style={{ marginBottom: '24px' }}>Customer Queries & Complaints</h2>
          {queries.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No queries received yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {queries.map(q => (
                <div key={q.id} style={{ border: '1px solid #f1f5f9', padding: '24px', borderRadius: '20px', background: q.status === 'Unread' ? '#fffbeb' : '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '15px' }}>
                    <div style={{ flex: '1 1 200px' }}>
                      <h4 style={{ margin: 0, fontSize: '18px', color: 'var(--primary)' }}>{q.name}</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>✉️ {q.email} | 📞 {q.phone}</p>
                    </div>
                    <div style={{ textAlign: 'left', minWidth: '120px' }}>
                      <span style={{ 
                        fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '99px',
                        background: q.status === 'Unread' ? '#fef3c7' : '#dcfce7',
                        color: q.status === 'Unread' ? '#92400e' : 'var(--success)'
                      }}>
                        {q.status}
                      </span>
                      <p style={{ margin: '5px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>{q.date}</p>
                    </div>
                  </div>
                  <div style={{ padding: '15px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '15px' }}>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>{q.description}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {q.status === 'Unread' && (
                      <button onClick={() => updateQueryStatus(q.id, 'Resolved')} className="btn btn-primary" style={{ flex: '1 1 auto', padding: '8px 20px', fontSize: '13px' }}>Resolve</button>
                    )}
                    <button onClick={() => updateQueryStatus(q.id, 'Archived')} className="btn" style={{ flex: '1 1 auto', padding: '8px 20px', fontSize: '13px', border: '1px solid #e2e8f0' }}>Archive</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {editingId && (
        <div className="overlay" style={{ padding: '20px' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="auth-card" style={{ width: '100%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--primary)' }}>Edit Product</h3>
              <button onClick={() => setEditingId(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input className="form-input" placeholder="Product Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input className="form-input" type="number" placeholder="Price" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
                <button type="button" onClick={() => setEditingId(null)} className="btn" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>

      {/* Full Screen Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="overlay" style={{ background: 'rgba(0,0,0,0.9)', zIndex: 2000 }} onClick={() => setSelectedImage(null)}>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Proof Full Screen" 
                style={{ width: '100%', height: 'auto', maxHeight: '90vh', borderRadius: '24px', boxShadow: '0 0 50px rgba(0,0,0,0.5)' }} 
              />
              <button 
                onClick={() => setSelectedImage(null)}
                style={{ position: 'absolute', top: '-20px', right: '-20px', width: '40px', height: '40px', borderRadius: '50%', background: 'white', border: 'none', fontWeight: '900', cursor: 'pointer' }}
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminDashboard;
