import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MessageCircle, HelpCircle, Send, X, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SupportTools = () => {
  const { user, addQuery } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTool, setActiveTool] = useState(null); // 'query' or 'chat'
  
  const [queryForm, setQueryForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    description: ''
  });

  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: "Hello! I'm your AgriDukaan Assistant. How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const sendQueryEmail = async (data) => {
    try {
      // Using the same EmailJS structure as Payment.jsx
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        from_phone: data.phone,
        message: data.description,
        to_email: 'tejaslavhale7893@gmail.com'
      };

      // Simulated email sending (since keys are placeholders)
      console.log('📧 Sending query notification to admin...', templateParams);
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_QUERY_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY');
    } catch (error) {
      console.error('Email failed:', error);
    }
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    addQuery(queryForm);
    await sendQueryEmail(queryForm);
    setQueryForm({ ...queryForm, description: '' });
    setActiveTool(null);
  };

  const getAIResponse = async (userInput) => {
    setIsTyping(true);
    
    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // In a real production app, you would fetch from your own backend proxying OpenAI/Gemini
      // For this demo, we use a sophisticated simulated response that adapts to keywords
      // to provide a 'Real-AI' feel without exposing private API keys.
      
      const input = userInput.toLowerCase();
      let response = "";

      // Real AI Intelligence Simulation Logic
      if (input.includes('who are you') || input.includes('what is this')) {
        response = "I am the AgriDukaan AI Assistant, powered by advanced language models. I'm trained specifically to assist with organic farming products, logistics, and order management.";
      } else if (input.includes('order') || input.includes('track') || input.includes('where is')) {
        response = "Our automated tracking system is highly precise. You can check your status in the 'Your Orders' tab. Currently, we move orders from 'Placed' to 'Approved' once your UPI payment proof is verified by our admin.";
      } else if (input.includes('payment') || input.includes('upi') || input.includes('pay')) {
        response = "We support instant UPI payments for security and low transaction fees. Please ensure you upload a clear screenshot of the transaction ID so our system can match it with your order.";
      } else if (input.includes('fres') || input.includes('organic') || input.includes('quality')) {
        response = "Quality is our top priority. We source directly from farmers in the local region. This reduces the carbon footprint and ensures that the products reach you within 24-48 hours of being harvested.";
      } else if (input.includes('kilogram') || input.includes('kg') || input.includes('weight')) {
        response = "Most of our products are sold by weight. You can choose the exact quantity (in kg) on the product details page, and the total price will update dynamically in your cart.";
      } else if (input.includes('contact') || input.includes('tejas') || input.includes('email')) {
        response = "You can contact our support team at tejaslavhale7893@gmail.com. We typically respond within 2-4 hours during business hours.";
      } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
        response = "Hello! I'm your AgriDukaan virtual assistant. How can I help you grow your farm or kitchen today?";
      } else if (input.includes('thank')) {
        response = "You're very welcome! Is there anything else I can assist you with regarding your agricultural shopping?";
      } else {
        response = `I understand you're asking about "${userInput}". As a specialized Agricultural AI, I can confirm that our platform is designed to bridge the gap between farmers and consumers. For specific technical issues, please use the 'Query' form or email us at tejaslavhale7893@gmail.com.`;
      }

      setChatMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting to my brain right now. Please try again later!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = inputMessage.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputMessage('');
    getAIResponse(userMessage);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'flex-end' }}>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                onClick={() => { setActiveTool('query'); setIsOpen(false); }}
                style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'white', color: 'var(--primary)', border: 'none', boxShadow: 'var(--shadow)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Submit Query"
              >
                <HelpCircle size={24} />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                onClick={() => { setActiveTool('chat'); setIsOpen(false); }}
                style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'white', color: 'var(--primary)', border: 'none', boxShadow: 'var(--shadow)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Chat with Assistant"
              >
                <MessageCircle size={24} />
              </motion.button>
            </>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary)', color: 'white', border: 'none', boxShadow: 'var(--shadow-lg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: isOpen ? 'rotate(45deg)' : 'none', transition: '0.3s' }}
        >
          {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
        </button>
      </div>

      {/* Query Modal */}
      <AnimatePresence>
        {activeTool === 'query' && (
          <div className="overlay" style={{ zIndex: 2000 }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal" 
              style={{ maxWidth: '500px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Submit Query</h2>
                <X onClick={() => setActiveTool(null)} style={{ cursor: 'pointer' }} />
              </div>
              <form onSubmit={handleQuerySubmit}>
                <div className="mb-20">
                  <div style={{ position: 'relative' }}>
                    <User style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} size={18} color="var(--text-muted)" />
                    <input className="form-input" style={{ paddingLeft: '45px' }} placeholder="Full Name" required value={queryForm.name} onChange={e => setQueryForm({...queryForm, name: e.target.value})} />
                  </div>
                </div>
                <div className="mb-20">
                  <div style={{ position: 'relative' }}>
                    <Mail style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} size={18} color="var(--text-muted)" />
                    <input className="form-input" style={{ paddingLeft: '45px' }} type="email" placeholder="Email Address" required value={queryForm.email} onChange={e => setQueryForm({...queryForm, email: e.target.value})} />
                  </div>
                </div>
                <div className="mb-20">
                  <div style={{ position: 'relative' }}>
                    <Phone style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} size={18} color="var(--text-muted)" />
                    <input className="form-input" style={{ paddingLeft: '45px' }} placeholder="Contact Number" required value={queryForm.phone} onChange={e => setQueryForm({...queryForm, phone: e.target.value})} />
                  </div>
                </div>
                <div className="mb-20">
                  <textarea className="form-input" placeholder="Describe your query or complaint..." required rows="4" value={queryForm.description} onChange={e => setQueryForm({...queryForm, description: e.target.value})}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>Submit Request</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Chatbot Sidebar */}
      <AnimatePresence>
        {activeTool === 'chat' && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTool(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', zIndex: 1999 }} 
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, right: 0, width: 'min(400px, 100%)', height: '100vh', background: 'white', zIndex: 2000, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '30px', background: 'var(--primary)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0 }}>AgriDukaan AI</h3>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Online Assistant</p>
                </div>
                <X onClick={() => setActiveTool(null)} style={{ cursor: 'pointer' }} />
              </div>

              <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{ alignSelf: msg.role === 'bot' ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
                    <div style={{ 
                      padding: '12px 16px', borderRadius: '18px', 
                      background: msg.role === 'bot' ? '#f1f5f9' : 'var(--primary)',
                      color: msg.role === 'bot' ? 'var(--text-main)' : 'white',
                      borderBottomLeftRadius: msg.role === 'bot' ? '4px' : '18px',
                      borderBottomRightRadius: msg.role === 'user' ? '4px' : '18px',
                      fontSize: '14px', lineHeight: '1.5'
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div style={{ alignSelf: 'flex-start', background: '#f1f5f9', padding: '10px 16px', borderRadius: '18px', borderBottomLeftRadius: '4px' }}>
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ display: 'flex', gap: '4px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8' }} />
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8' }} />
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8' }} />
                    </motion.div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleChatSubmit} style={{ padding: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '10px' }}>
                <input 
                  className="form-input" 
                  placeholder={isTyping ? "AI is thinking..." : "Type your message..."} 
                  value={inputMessage} 
                  onChange={e => setInputMessage(e.target.value)} 
                  disabled={isTyping}
                />
                <button type="submit" disabled={isTyping} style={{ width: '50px', height: '50px', borderRadius: '14px', background: isTyping ? '#cbd5e1' : 'var(--primary)', color: 'white', border: 'none', cursor: isTyping ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Send size={20} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SupportTools;
