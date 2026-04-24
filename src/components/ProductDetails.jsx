import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowLeft, Heart, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [quantity, setQuantity] = React.useState(1);
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className="container">Product not found</div>;

  const handleOrderNow = () => {
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <button onClick={() => navigate(-1)} className="flex-center" style={{ gap: '8px', color: 'var(--text-muted)', marginBottom: '40px', background: 'none' }}>
        <ArrowLeft size={20} /> Back to Collection
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', borderRadius: '32px', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.1)', objectFit: 'cover' }}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--accent-dark)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: 'var(--primary)', margin: '12px 0 24px' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fef3c7', padding: '6px 12px', borderRadius: '12px' }}>
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              <span style={{ fontWeight: '800', color: '#92400e' }}>{product.rating || '4.8'}</span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>120+ Happy Customers</span>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontSize: '42px', fontWeight: '800', color: 'var(--primary)' }}>₹{product.price}</span>
            <span style={{ fontSize: '20px', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '16px' }}>₹{product.originalPrice || product.price + 200}</span>
          </div>

          <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '40px' }}>
            {product.description || "Experience the pure essence of nature with our hand-picked products. Sourced directly from local farms, ensuring the highest standards of quality and freshness for your kitchen."}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
            <div className="flex-center" style={{ gap: '10px', background: 'white', padding: '16px', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
              <Truck size={24} color="var(--accent-dark)" />
              <span style={{ fontSize: '14px', fontWeight: '700' }}>Free Delivery</span>
            </div>
            <div className="flex-center" style={{ gap: '10px', background: 'white', padding: '16px', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
              <ShieldCheck size={24} color="var(--accent-dark)" />
              <span style={{ fontSize: '14px', fontWeight: '700' }}>Quality Assured</span>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: '800', color: 'var(--primary)', marginBottom: '16px' }}>
              Select Quantity (kg)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '16px', padding: '6px' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'white', color: 'var(--primary)', fontWeight: '800', fontSize: '20px' }}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{ width: '60px', textAlign: 'center', background: 'transparent', border: 'none', fontWeight: '800', fontSize: '18px', color: 'var(--primary)' }}
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'white', color: 'var(--primary)', fontWeight: '800', fontSize: '20px' }}
                >
                  +
                </button>
              </div>
              <span style={{ fontWeight: '700', color: 'var(--text-muted)' }}>Total Weight: {quantity} kg</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={handleOrderNow}
              className="btn btn-primary" 
              style={{ flex: 1, height: '64px', fontSize: '18px' }}
            >
              Order Now <ArrowRight size={22} />
            </button>
            <button 
              onClick={() => {
                addToCart(product, quantity);
                toast.success(`Added ${quantity}kg to cart`);
              }}
              className="btn btn-accent" 
              style={{ flex: 1, height: '64px', fontSize: '18px' }}
            >
              Add to Cart <ShoppingBag size={22} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
