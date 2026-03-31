import React from 'react';
import { motion } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

const chipReveal = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }
};

const categories = [
  {
    name: 'Languages',
    icon: '💻',
    skills: ['Python', 'JavaScript', 'Java', 'C', 'SQL']
  },
  {
    name: 'Frontend',
    icon: '🎨',
    skills: ['React', 'HTML5', 'CSS3', 'TailwindCSS']
  },
  {
    name: 'Backend',
    icon: '⚙️',
    skills: ['Django', 'Supabase', 'Firebase', 'Streamlit']
  },
  {
    name: 'AI / ML',
    icon: '🧠',
    skills: ['HuBERT', 'NLP', 'Ollama']
  },
  {
    name: 'Tools & DevOps',
    icon: '🛠️',
    skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Vite']
  }
];

export default function SkillsSection() {
  return (
    <section id="skills-section" className="portfolio-section">
      <motion.div
        className="section-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="section-header">
          <span className="label-sm">Skills</span>
          <h2 className="section-title">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-subtitle">
            Technologies I use to bring ideas from concept to production.
          </p>
        </motion.div>

        <div className="skills-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bm-card skill-category-card"
              whileHover={{ 
                y: -8, 
                borderColor: 'var(--bm-primary)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4), 0 0 15px var(--bm-primary-glow)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="skill-category-header">
                <span className="skill-category-icon" style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                <h3 className="skill-category-name" style={{ fontSize: '1.1rem', fontWeight: '700' }}>{cat.name}</h3>
              </div>
              <motion.div
                className="skill-chips"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={j}
                    variants={chipReveal}
                    className="skill-chip"
                    whileHover={{ 
                      scale: 1.1,
                      background: 'linear-gradient(135deg, var(--bm-primary), var(--bm-secondary))',
                      color: '#fff',
                      boxShadow: '0 0 15px var(--bm-primary-glow)'
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
