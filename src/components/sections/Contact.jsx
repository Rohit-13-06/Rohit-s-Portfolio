import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" style={{ padding: '8rem 5%', minHeight: '80vh', background: 'linear-gradient(to bottom, var(--bg-color), #050505)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}
        >
          Get In <span style={{ color: 'var(--accent-color)' }}>Touch</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}
        >
          I'm currently looking for new opportunities as a Web Developer Intern. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </motion.p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          {[
            { icon: <Mail size={24} />, text: 'yrohitprasad45@gmail.com', href: 'mailto:yrohitprasad45@gmail.com' },
            { icon: <Phone size={24} />, text: '+91 6304364483', href: 'tel:+916304364483' },
            { icon: <Linkedin size={24} />, text: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/rohit-yerrarapu-6534ab290/' },
            { icon: <MapPin size={24} />, text: 'Hyderabad, India', href: '#' }
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target={item.href !== '#' && !item.href.startsWith('mailto') && !item.href.startsWith('tel') ? "_blank" : "_self"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, background: 'rgba(99, 102, 241, 0.1)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem 2rem',
                background: 'var(--card-bg)',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                minWidth: '250px'
              }}
            >
              <div style={{ color: 'var(--accent-color)' }}>{item.icon}</div>
              <span style={{ fontWeight: 500 }}>{item.text}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
