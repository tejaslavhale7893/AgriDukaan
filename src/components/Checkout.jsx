import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiSecurePaymentLine, RiMapPinLine, RiCheckboxCircleLine } from 'react-icons/ri';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', zip: '', cardName: '', cardNumber: '', expiry: '', cvc: ''
  });

  if (!product) return <div className="container">No item selected for checkout</div>;

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Simulate email sending and order placement
    setStep(4);
    setTimeout(() => {
      // In a real app, this is where you'd call an API
    }, 2000);
  };

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Progress Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '50px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ 
              width: '40px', height: '40px', borderRadius: '50%', 
              background: step >= i ? '#2d6a4f' : '#ddd', 
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', transition: 'all 0.3s'
            }}>{i}</div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap-reverse' }}>
          {/* Form Side */}
          <div style={{ flex: '2', minWidth: '300px' }}>
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <RiMapPinLine /> Shipping Address
                </h2>
                <form onSubmit={handleNext}>
                  <div className="form-group">
                    <input className="form-input" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <input className="form-input" type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <textarea className="form-input" rows="3" placeholder="Full Address" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <input className="form-input" placeholder="City" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                    <input className="form-input" placeholder="ZIP Code" required value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>Continue to Payment</button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <RiSecurePaymentLine /> Payment Details
                </h2>
                <form onSubmit={handleNext}>
                  <div className="form-group">
                    <input className="form-input" placeholder="Name on Card" required />
                  </div>
                  <div className="form-group">
                    <input className="form-input" placeholder="Card Number" required />
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <input className="form-input" placeholder="MM/YY" required />
                    <input className="form-input" placeholder="CVC" required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>Review Order</button>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={{ marginBottom: '25px' }}>Review Your Order</h2>
                <div style={{ background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '25px' }}>
                  <p><strong>Deliver to:</strong> {formData.name}</p>
                  <p>{formData.address}, {formData.city} - {formData.zip}</p>
                </div>
                <button onClick={handlePlaceOrder} className="btn btn-primary" style={{ width: '100%' }}>Place Order & Pay ₹{product.price}</button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
                <RiCheckboxCircleLine style={{ fontSize: '100px', color: '#2d6a4f' }} />
                <h1 style={{ margin: '20px 0' }}>Order Confirmed!</h1>
                <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
                  Thank you for your purchase, {formData.name}. <br />
                  A confirmation email has been sent to <strong>{formData.email}</strong>.
                </p>
                <button onClick={() => navigate('/')} className="btn btn-primary">Back to Home</button>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          {step < 4 && (
            <div style={{ flex: '1', minWidth: '300px' }}>
              <div style={{ background: 'white', padding: '25px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'sticky', top: '100px' }}>
                <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                  <img src={product.image} alt={product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }} />
                  <div>
                    <h4 style={{ margin: 0 }}>{product.name}</h4>
                    <p style={{ color: '#666', fontSize: '14px' }}>Qty: 1</p>
                    <p style={{ fontWeight: '700', color: '#2d6a4f' }}>₹{product.price}</p>
                  </div>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '15px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Subtotal</span>
                  <span>₹{product.price}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Shipping</span>
                  <span style={{ color: '#2d6a4f', fontWeight: '600' }}>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '700', marginTop: '20px' }}>
                  <span>Total</span>
                  <span>₹{product.price}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
