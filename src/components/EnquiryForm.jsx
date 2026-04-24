import React, { useState } from 'react';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    query: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your enquiry has been sent to our team. We will contact you soon.`);
    setFormData({ name: '', email: '', phone: '', query: '' });
  };

  return (
    <div className="container" style={{ marginTop: '30px', marginBottom: '50px' }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '4px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2874f0' }}>Contact Us / Enquiry Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Name</label>
            <input 
              type="text" 
              required 
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '2px' }} 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
            <input 
              type="email" 
              required 
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '2px' }} 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Phone Number</label>
            <input 
              type="tel" 
              required 
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '2px' }} 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Your Query</label>
            <textarea 
              rows="4" 
              required 
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '2px' }}
              value={formData.query}
              onChange={(e) => setFormData({...formData, query: e.target.value})}
            ></textarea>
          </div>
          <button type="submit" style={{ width: '100%', background: '#fb641b', color: 'white', padding: '12px', borderRadius: '2px', fontWeight: 'bold', border: 'none' }}>
            SUBMIT ENQUIRY
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
