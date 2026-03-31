import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" style={{ padding: '8rem 5%', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      >
        <motion.h2 variants={itemVariants} style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          About <span style={{ color: 'var(--accent-color)' }}>Me</span>
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <motion.div variants={itemVariants} style={{ background: 'var(--card-bg)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>Summary</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              A Motivated and detail-oriented Web Developer with proven expertise in front-end and back-end 
              development. Adept at designing responsive user interfaces, building scalable applications, and 
              optimizing performance. Seeking to contribute technical skills, creativity, and problem-solving 
              abilities to drive impactful digital solutions.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div variants={itemVariants} style={{ background: 'var(--card-bg)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Java', 'Python', 'MySQL', 'Supabase', 'Git/GitHub', 'Streamlit'].map(skill => (
                  <span key={skill} style={{ padding: '0.5rem 1rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--text-primary)', borderRadius: '20px', fontSize: '0.9rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} style={{ background: 'var(--card-bg)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>Education</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-primary)' }}>Bachelor of Technology (CSE)</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Hyderabad Institute of Technology And Management | 2023 - Present</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-primary)' }}>Senior Secondary Education</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sri Chaitanya Junior College | 2021 - 2023</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
