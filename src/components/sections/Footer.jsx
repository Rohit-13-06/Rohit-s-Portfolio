import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">RY.</span>
          <span className="footer-tagline">Building intelligent experiences.</span>
        </div>
        <div className="footer-links">
          <a href="mailto:yrohitprasad45@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/rohit-yerrarapu-6534ab290/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/Rohit-13-06" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} Rohit Yerrarapu · Built with React + Three.js + Framer Motion
        </div>
      </div>
    </footer>
  );
}
