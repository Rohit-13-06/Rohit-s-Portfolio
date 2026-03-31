import React from 'react';
import { motion } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
};

export default function EducationSection() {
  return (
    <section id="education-section" className="portfolio-section">
      <motion.div
        className="section-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="section-header" style={{ textAlign: 'center' }}>
          <span className="label-sm">Education</span>
          <h2 className="section-title">
            Academic <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="education-grid">
          <motion.div variants={fadeUp} className="bm-card education-card" whileHover={{ borderColor: 'var(--bm-primary)' }}>
            <div className="edu-icon">🎓</div>
            <h4>Hyderabad Institute of Technology And Management</h4>
            <p className="edu-degree">Bachelor of Technology — Computer Science</p>
            <span className="edu-date">2023 – Present</span>
          </motion.div>

          <motion.div variants={fadeUp} className="bm-card education-card" whileHover={{ borderColor: 'var(--bm-primary)' }}>
            <div className="edu-icon">📚</div>
            <h4>Sri Chaitanya Junior College</h4>
            <p className="edu-degree">Senior Secondary Education</p>
            <span className="edu-date">2021 – 2023</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
