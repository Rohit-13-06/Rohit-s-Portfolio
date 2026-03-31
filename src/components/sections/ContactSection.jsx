import React, { useState } from 'react';
import { motion } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
};

const links = [
  { icon: '✉️', label: 'Email', value: 'yrohitprasad45@gmail.com', href: 'mailto:yrohitprasad45@gmail.com' },
  { icon: '💼', label: 'LinkedIn', value: 'Rohit Yerrarapu', href: 'https://www.linkedin.com/in/rohit-yerrarapu-6534ab290/' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/Rohit-13-06', href: 'https://github.com/Rohit-13-06' },
  { icon: '📍', label: 'Location', value: 'Hyderabad, India', href: null }
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yrohitprasad45@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      console.error('Supabase Error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact-section" className="portfolio-section contact-section">
      <motion.div
        className="section-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="section-header">
          <span className="label-sm">Contact</span>
          <h2 className="section-title">
            Let's Build Something{' '}
            <span className="gradient-text">Intelligent</span> Together
          </h2>
          <p className="section-subtitle">
            I'm currently looking for internships and collaboration opportunities. 
            Whether you have a project idea or just want to connect — reach out!
          </p>
        </motion.div>

        <div className="contact-layout">
          {/* Contact Links */}
          <motion.div variants={fadeUp} className="contact-links">
            {links.map((link, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp} 
                className="bm-card contact-link-card" 
                whileHover={{ 
                  x: 10,
                  borderColor: 'var(--bm-primary)',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px var(--bm-primary-glow)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="contact-link-icon" style={{ fontSize: '1.5rem' }}>{link.icon}</span>
                <div className="contact-link-info">
                  <span className="contact-link-label" style={{ opacity: 0.7, fontSize: '0.65rem' }}>{link.label}</span>
                  {link.href ? (
                    <a href={link.href} target={link.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="contact-link-value" style={{ fontWeight: '600' }}>
                      {link.value}
                    </a>
                  ) : (
                    <span className="contact-link-value" style={{ fontWeight: '600' }}>{link.value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Quick actions */}
            <div className="contact-actions" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <motion.button
                variants={fadeUp}
                className="bm-btn-primary"
                onClick={handleCopyEmail}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--bm-primary-glow)' }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? '✓ Copied!' : '📋 Copy Email'}
              </motion.button>
              <motion.a
                variants={fadeUp}
                href="#"
                className="bm-btn-secondary"
                whileHover={{ scale: 1.05, borderColor: 'var(--bm-primary)' }}
              >
                📄 Resume
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={fadeUp}
            className="bm-card contact-form"
            onSubmit={handleSubmit}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <h3 className="form-title" style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem' }}>Send a Message</h3>
            
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <motion.input
                whileFocus={{ scale: 1.01, borderColor: 'var(--bm-primary)', boxShadow: '0 0 15px var(--bm-primary-glow)' }}
                id="contact-name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                required
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <motion.input
                whileFocus={{ scale: 1.01, borderColor: 'var(--bm-primary)', boxShadow: '0 0 15px var(--bm-primary-glow)' }}
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                required
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <motion.textarea
                whileFocus={{ scale: 1.01, borderColor: 'var(--bm-primary)', boxShadow: '0 0 15px var(--bm-primary-glow)' }}
                id="contact-message"
                rows={4}
                placeholder="Tell me about your project or opportunity..."
                value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                required
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }}
              />
            </div>
            
            <motion.button 
              type="submit" 
              className="bm-btn-primary form-submit"
              disabled={status === 'sending'}
              animate={status === 'idle' ? { scale: [1, 1.02, 1] } : {}}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: '700',
                opacity: status === 'sending' ? 0.7 : 1,
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                marginTop: '1rem'
              }}
            >
              {status === 'sending' ? '⚡ Initializing...' : 
               status === 'success' ? '✓ Message Transmitted' : 
               status === 'error' ? '❌ Uplink Failed' : 
               'Send Transmission →'}
            </motion.button>
            
            {status === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: 'var(--bm-primary)', fontSize: '0.85rem', marginTop: '1.5rem', textAlign: 'center', fontWeight: '500' }}
              >
                Uplink successful. I'll respond shortly at {formData.email}.
              </motion.p>
            )}
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
