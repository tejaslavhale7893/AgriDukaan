import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Login, Signup } from './components/AuthForms';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProductDetails from './components/ProductDetails';
import SupportTools from './components/SupportTools';

// Pages
import Home from './Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderHistory from './pages/OrderHistory';

const CheckoutAddress = () => {
  const [address, setAddress] = React.useState({ name: '', phone: '', line1: '', city: '', pincode: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { address } });
  };

  return (
    <div className="container flex-center" style={{ minHeight: '80vh' }}>
      <div className="modal" style={{ maxWidth: '600px' }}>
        <h2 className="mb-20">Delivery Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-20">
            <input className="form-input" placeholder="Full Name" required value={address.name} onChange={e => setAddress({...address, name: e.target.value})} />
          </div>
          <div className="mb-20">
            <input className="form-input" placeholder="Phone Number" required value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} />
          </div>
          <div className="mb-20">
            <textarea className="form-input" placeholder="House No, Street, Area" required rows="3" value={address.line1} onChange={e => setAddress({...address, line1: e.target.value})}></textarea>
          </div>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <input className="form-input" placeholder="City" required value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
            <input className="form-input" placeholder="Pincode" required value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Continue to Payment</button>
        </form>
      </div>
    </div>
  );
};

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="container flex-center" style={{ minHeight: '80vh', flexDirection: 'column' }}>
      <div style={{ background: 'var(--success)', color: 'white', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px' }}>Order Placed!</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '18px', textAlign: 'center', maxWidth: '600px', marginBottom: '40px' }}>
        Thank you for your purchase. A detailed notification with your delivery details and payment proof has been sent to <b>tejaslavhale7893@gmail.com</b> for verification.
      </p>
      <button onClick={() => navigate('/')} className="btn btn-primary">Continue Shopping</button>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <Toaster position="bottom-right" />
            <Navbar />
            <SupportTools />
            <main style={{ minHeight: 'calc(100vh - 80px)' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/products" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckoutAddress />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/orders" element={<OrderHistory />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
