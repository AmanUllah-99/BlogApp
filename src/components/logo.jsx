 
import React from 'react';
import logoImg from '../assets/blog_app_logo_v2.png'; // updated path to v2

function Logo({ width = '100px' }) {
  return (
    <div style={{ width }}>
      <img 
        src={logoImg} 
        alt="Blog App Logo" 
        style={{ width: '100%', height: 'auto', objectFit: 'contain' }} 
      />
    </div>
  );
}

export default Logo;

