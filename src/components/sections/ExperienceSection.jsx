import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience-section" className="portfolio-section" ref={containerRef}>
      <motion.div
        className="section-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="section-header">
          <span className="label-sm">Experience</span>
          <h2 className="section-title">
            Professional <span className="gradient-text">Milestones</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="timeline" style={{ position: 'relative' }}>
          {/* Animated Scroll Progress Line */}
          <motion.div 
            className="timeline-scroll-line"
            style={{ 
              position: 'absolute',
              top: '2rem',
              bottom: 0,
              background: 'linear-gradient(to bottom, var(--bm-primary), var(--bm-secondary))',
              originY: 0,
              scaleY: scaleY,
              zIndex: 0,
              boxShadow: '0 0 15px var(--bm-primary-glow)'
            }}
          />

          {/* IIIT Hyderabad Research Internship */}
          <motion.div variants={fadeUp} className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-dot" style={{ zIndex: 1 }} />
              <div className="timeline-line" style={{ opacity: 0.1 }} />
            </div>
            <motion.div
              className="bm-card timeline-content"
              whileHover={{ borderColor: 'var(--bm-primary)' }}
            >
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-company">IIIT Hyderabad</h3>
                  <span className="timeline-role">Research Intern – NLP & Speech Analytics (Phase 2)</span>
                </div>
                <span className="timeline-date">Jul 2025 – Present</span>
              </div>
              <ul className="timeline-bullets">
                <motion.li variants={fadeLeft}>
                  Selected for <strong>advanced Phase 2</strong> of the research program based on exceptional performance and validation of Phase 1 work.
                </motion.li>
                <motion.li variants={fadeLeft}>
                  Developing a <strong>speech-based native language identification</strong> system using <strong>HuBERT</strong>, focusing on Indian English multilingual patterns.
                </motion.li>
                <motion.li variants={fadeLeft}>
                  Optimizing model performance through advanced <strong>feature engineering, tuning, and self-supervised learning</strong> representations.
                </motion.li>
                <motion.li variants={fadeLeft}>
                  Analyzing deeper speech characteristics and tackling real-world data challenges in speech analytics and AI.
                </motion.li>
              </ul>
              <div className="timeline-chips">
                {['NLP', 'Speech AI', 'HuBERT', 'Research', 'Python'].map(t => (
                  <span key={t} className="bm-chip">{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Kodespark Internship */}
          <motion.div variants={fadeUp} className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-dot" style={{ zIndex: 1 }} />
              <div className="timeline-line" style={{ opacity: 0.1 }} />
            </div>
            <motion.div
              className="bm-card timeline-content"
              whileHover={{ borderColor: 'var(--bm-primary)' }}
            >
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-company">Kodespark</h3>
                  <span className="timeline-role">UI/UX & Full-Stack Developer Intern</span>
                </div>
                <span className="timeline-date">Feb 2026 – Apr 2027</span>
              </div>
              <ul className="timeline-bullets">
                <motion.li variants={fadeLeft}>
                  Engaged in the development of <strong>UI/UX, Web, and Mobile Applications</strong> (Android & iOS) with a focus on <strong>Generative AI</strong> integrations.
                </motion.li>
                <motion.li variants={fadeLeft}>
                  Collaborated on real-time projects under professional mentorship, delivering high-performance, per-project based solutions.
                </motion.li>
                <motion.li variants={fadeLeft}>
                  Gained hands-on experience in cross-platform mobile development and sophisticated design-to-code workflows.
                </motion.li>
              </ul>
              <div className="timeline-chips">
                {['UI/UX', 'Mobile Dev', 'Web Dev', 'Gen AI', 'Full-Stack'].map(t => (
                  <span key={t} className="bm-chip">{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* GNU Hive */}
          <motion.div variants={fadeUp} className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-dot" style={{ zIndex: 1 }} />
              <div className="timeline-line" style={{ opacity: 0.1 }} />
            </div>
            <motion.div
              className="bm-card timeline-content"
              whileHover={{ borderColor: 'var(--bm-primary)' }}
            >
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-company">GNU Hive</h3>
                  <span className="timeline-role">Web Developer Intern</span>
                </div>
                <span className="timeline-date">Sep – Dec 2025</span>
              </div>
              <ul className="timeline-bullets">
                <motion.li variants={fadeLeft}>
                  Led the frontend development of a <strong>Movie Review Platform</strong>, building responsive UIs with React.js that boosted user engagement.
                </motion.li>
                <motion.li variants={fadeLeft}>
                  Developed dynamic features including movie listings, reviews, ratings, and user authentication workflows.
                </motion.li>
                <motion.li variants={fadeLeft}>
                  Optimized performance through component optimization and cross-browser testing, contributing to a scalable architecture.
                </motion.li>
              </ul>
              <div className="timeline-chips">
                {['React', 'JavaScript', 'CSS3'].map(t => (
                  <span key={t} className="bm-chip">{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* VISWAM.AI Internship */}
          <motion.div variants={fadeUp} className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-dot" style={{ zIndex: 1 }} />
              <div className="timeline-line" style={{ opacity: 0.1 }} />
            </div>
            <motion.div
              className="bm-card timeline-content"
              whileHover={{ borderColor: 'var(--bm-primary)' }}
            >
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-company">VISWAM.AI</h3>
                  <span className="timeline-role">AI Developer Intern</span>
                </div>
                <span className="timeline-date">Jun – Jul 2025</span>
              </div>
              <ul className="timeline-bullets">
                <motion.li variants={fadeLeft}>
                  Participated in the <strong>Summer of AI 2025</strong> program, collaborating with a passionate cohort to advance AI systems.
                </motion.li>
                <motion.li variants={fadeLeft}>
                  Gained hands-on experience in <strong>locally procuring data</strong> and <strong>fine-tuning AI models</strong> for real-world applications.
                </motion.li>
                <motion.li variants={fadeLeft}>
                  Mastered <strong>Python, Collaborative Development, and DevOps</strong> while emerging as a contributor to the open-source community.
                </motion.li>
              </ul>
              <div className="timeline-chips">
                {['AI/ML', 'Python', 'Fine-tuning', 'DevOps', 'Open Source'].map(t => (
                  <span key={t} className="bm-chip">{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
