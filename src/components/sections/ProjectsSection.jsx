import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
};

const projects = [
  {
    id: 1,
    title: 'Native Language Identification',
    category: 'AI / ML Research',
    problem: 'Identifying the native language of Indian English speakers from speech audio is critical for accent-aware AI, but existing models lack regional language granularity.',
    solution: 'Built a HuBERT-based deep learning classifier that captures deep acoustic and phonetic patterns from Indian English speech data to identify native language groups.',
    tech: ['Python', 'HuBERT', 'PyTorch', 'Transformers', 'Librosa'],
    impact: 'Research collaboration with IIIT Hyderabad — analyzed phonetic patterns across Telugu, Hindi, and Tamil speakers.',
    github: '#',
    demo: null
  },
  {
    id: 2,
    title: 'VIRASAM: The Living Cultural Archive',
    category: 'AI-Powered Platform',
    problem: 'India\'s rich cultural heritage is being lost as oral traditions and local histories go undocumented in the digital age.',
    solution: 'Built a community-driven platform with AI-powered content generation using Ollama/Llama3.2, multilingual Telugu support, and Supabase backend.',
    tech: ['Python', 'Streamlit', 'Ollama', 'Supabase', 'Llama3.2'],
    impact: 'SWECHA + IIIT Hyderabad partnership — smart search across cultural categories with real-time community contributions.',
    github: '#',
    demo: null
  },
  {
    id: 3,
    title: 'EduPredict: AI Academic Management',
    category: 'Full-Stack Application',
    problem: 'Academic institutions lack unified platforms that combine student management with AI-driven performance analytics.',
    solution: 'Developed a multi-tenant system with AI-powered predictive insights, role-based dashboards, real-time communication, and automated workflows.',
    tech: ['Next.js', 'Firebase', 'React', 'ShadCN UI', 'TailwindCSS'],
    impact: 'Automated sentiment analysis for faculty feedback and predictive performance tracking for students.',
    github: '#',
    demo: null
  },
  {
    id: 4,
    title: 'SecureChat: E2E Encrypted Messaging',
    category: 'Security / Mobile',
    problem: 'Most messaging apps don\'t give users true control over their encryption keys and message privacy.',
    solution: 'Built a real-time encrypted chat app using RSA/SHA cryptography with Supabase, featuring secure local key storage and Android APK deployment.',
    tech: ['React', 'Supabase', 'RSA/SHA', 'Android', 'Crypto API'],
    impact: 'Cross-platform secure communication with client-side encryption — keys never touch the server.',
    github: '#',
    demo: null
  }
];

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  
  return (
    <motion.div
      className="project-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>✕</button>
        <span className="label-sm">{project.category}</span>
        <h3 className="modal-title">{project.title}</h3>
        
        <div className="modal-detail">
          <h4>🎯 Problem</h4>
          <p>{project.problem}</p>
        </div>
        <div className="modal-detail">
          <h4>💡 Solution</h4>
          <p>{project.solution}</p>
        </div>
        <div className="modal-detail">
          <h4>📈 Impact</h4>
          <p>{project.impact}</p>
        </div>
        
        <div className="modal-tech">
          {project.tech.map(t => (
            <span key={t} className="skill-chip">{t}</span>
          ))}
        </div>

        <div className="modal-links">
          {project.github && project.github !== '#' && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="bm-btn-primary">
              GitHub →
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="bm-btn-secondary">
              Live Demo →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects-section" className="portfolio-section">
      <motion.div
        className="section-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="section-header">
          <span className="label-sm">Projects</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="section-subtitle">
            Real-world projects that demonstrate my ability to ship AI-powered 
            applications from concept to production.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              className="bm-card project-card"
              whileHover={{ y: -8, borderColor: 'var(--bm-primary)' }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-card-top">
                <span className="project-category">{project.category}</span>
                <span className="project-arrow">↗</span>
              </div>
              
              <h3 className="project-title">{project.title}</h3>
              <p className="project-problem">{project.problem}</p>

              <div className="project-tech">
                {project.tech.slice(0, 4).map(t => (
                  <span key={t} className="bm-chip">{t}</span>
                ))}
                {project.tech.length > 4 && (
                  <span className="bm-chip">+{project.tech.length - 4}</span>
                )}
              </div>

              <div className="project-card-footer">
                <span className="project-view-label">View Details</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
