import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, Phone, Smartphone, CreditCard, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Payment = () => {
  const { clearCart, getCartTotal, cart } = useContext(CartContext);
  const { addOrderToUser, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const addressData = location.state?.address;
  const [method, setMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  const total = getCartTotal();
  const upiId = "8329610279@ybl";
  const upiLink = `upi://pay?pa=${upiId}&pn=AgriNova&am=${total}&cu=INR`;

  const [proof, setProof] = useState(null);

  const sendEmailNotification = async (order) => {
    const serviceId = 'service_agrinova'; // User needs to create this in EmailJS
    const templateId = 'template_order_notif'; // User needs to create this in EmailJS
    const publicKey = 'user_XXXXXXXXXXXX'; // User needs to get this from EmailJS

    const emailData = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: 'tejaslavhale7893@gmail.com',
        order_id: order.id,
        customer_name: order.customer.name,
        customer_email: order.customer.email,
        total_amount: order.total,
        delivery_address: `${order.address.name}, ${order.address.line1}, ${order.address.city} - ${order.address.pincode}. Phone: ${order.address.phone}`,
        payment_method: order.payment.method,
        payment_proof: order.payment.proof,
        product_list: order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')
      }
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      if (response.ok) console.log('✅ Real email notification triggered via EmailJS');
    } catch (error) {
      console.error('❌ Failed to send real email:', error);
    }
  };

  const handlePayment = () => {
    if (method === 'UPI' && !proof) {
      toast.error('Please upload payment screenshot or proof');
      return;
    }
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      
      const order = {
        id: `ORD-${Date.now()}`,
        customer: {
          name: user.name,
          email: user.email,
          phone: user.phone
        },
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total,
        address: addressData,
        date: new Date().toLocaleDateString(),
        status: 'Pending Verification',
        payment: {
          method: method,
          proof: proof ? proof.name : 'N/A',
          proofImage: base64Image // Store actual image data
        }
      };

      await addOrderToUser(order);
      await sendEmailNotification(order);

      clearCart();
      setIsProcessing(false);
      
      console.log('✅ Order placed with payment proof data');
      toast.success('Order placed! Waiting for admin approval.');
      navigate('/order-success', { state: { order } });
    };

    if (proof) {
      reader.readAsDataURL(proof);
    } else {
      // Logic for non-UPI or if proof not provided (though handled by check above)
      setTimeout(() => {
        // ... (similar order creation but without proofImage)
      }, 2000);
    }
  };

  if (!addressData) return <div className="container">Please complete address first</div>;

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button onClick={() => navigate(-1)} className="flex-center" style={{ gap: '8px', color: 'var(--text-muted)', marginBottom: '32px', background: 'none' }}>
          <ArrowLeft size={20} /> Back to Address
        </button>

        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '40px' }}>Select Payment Method</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {/* Methods */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { id: 'UPI', name: 'UPI / QR Code', icon: <Smartphone /> },
              { id: 'GPay', name: 'Google Pay', icon: <Phone /> },
              { id: 'PhonePe', name: 'PhonePe', icon: <Phone /> },
              { id: 'Card', name: 'Debit/Credit Card', icon: <CreditCard /> }
            ].map(m => (
              <button 
                key={m.id}
                onClick={() => setMethod(m.id)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', borderRadius: '16px',
                  background: 'white', border: `2px solid ${method === m.id ? 'var(--accent-dark)' : 'transparent'}`,
                  boxShadow: 'var(--shadow)', transition: 'all 0.3s', textAlign: 'left'
                }}
              >
                <div style={{ color: method === m.id ? 'var(--accent-dark)' : 'var(--text-muted)' }}>{m.icon}</div>
                <span style={{ fontWeight: '700', fontSize: '16px' }}>{m.name}</span>
                {method === m.id && <CheckCircle size={20} color="var(--accent-dark)" style={{ marginLeft: 'auto' }} />}
              </button>
            ))}
          </div>

          {/* Details */}
          <div style={{ background: 'white', padding: '40px', borderRadius: '32px', boxShadow: 'var(--shadow)', textAlign: 'center' }}>
            {method === 'UPI' ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <h3 style={{ marginBottom: '24px' }}>Scan to Pay</h3>
                <div style={{ background: 'white', padding: '20px', borderRadius: '24px', display: 'inline-block', border: '1px solid #f1f5f9' }}>
                  <QRCodeSVG value={upiLink} size={200} />
                </div>
                <p style={{ marginTop: '20px', fontWeight: '700', color: 'var(--text-muted)' }}>UPI ID: {upiId}</p>
                
                <div style={{ marginTop: '30px', textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>Upload Payment Screenshot</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setProof(e.target.files[0])}
                    className="form-input" 
                    style={{ padding: '10px' }}
                  />
                  {proof && <p style={{ fontSize: '12px', color: 'var(--success)', marginTop: '5px' }}>File selected: {proof.name}</p>}
                </div>
              </motion.div>
            ) : (
              <div className="flex-center" style={{ height: '100%', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '16px' }}>Pay via {method}</h3>
                <p style={{ color: 'var(--text-muted)' }}>Complete your payment in the {method} app</p>
                <div style={{ marginTop: '20px', textAlign: 'left', width: '100%' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>Upload Payment Proof</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setProof(e.target.files[0])}
                    className="form-input" 
                    style={{ padding: '10px' }}
                  />
                </div>
              </div>
            )}
            
            <p style={{ color: 'var(--accent-dark)', fontWeight: '800', fontSize: '32px', marginTop: '20px' }}>₹{total}</p>

            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '32px', padding: '16px' }}
            >
              {isProcessing ? 'Processing...' : 'Place Order (Pending Verification)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
