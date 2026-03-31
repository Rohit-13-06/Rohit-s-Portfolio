import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: 'GNU hive - Movie Review Platform',
      description: 'Led frontend development building responsive UIs. Developed features like movie listings, reviews, ratings, user auth, and integrated recommendation system outputs.',
      tech: ['HTML', 'CSS', 'JavaScript', 'React.js'],
      link: '#'
    },
    {
      title: 'Virasam - Cultural Heritage App',
      description: 'Developed dynamic web app integrated with Supabase. Built AI-powered search and optimized database systems, improving load time efficiency by 30%.',
      tech: ['Python', 'HTML', 'CSS', 'Supabase'],
      link: '#'
    },
    {
      title: 'Lifer - Organ Transplantation App',
      description: 'An innovative application facilitating organic transplantation matching, providing a more flexible solution than existing systems.',
      tech: ['Python', 'HTML', 'CSS', 'JavaScript'],
      link: '#'
    }
  ];

  return (
    <section id="projects" style={{ padding: '8rem 5%', minHeight: '100vh', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '3rem', marginBottom: '4rem', color: 'var(--text-primary)', textAlign: 'center' }}
        >
          Featured <span style={{ color: 'var(--accent-color)' }}>Projects</span>
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              style={{
                background: 'var(--card-bg)',
                borderRadius: '24px',
                padding: '2.5rem',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                cursor: 'pointer',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(5px)'
              }}
            >
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, flexGrow: 1 }}>{project.description}</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                {project.tech.map(tech => (
                  <span key={tech} style={{ 
                    fontSize: '0.8rem', 
                    padding: '0.4rem 0.8rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '12px',
                    color: 'var(--accent-color)' 
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
