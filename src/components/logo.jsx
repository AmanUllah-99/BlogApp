 
import React from 'react';
import logoImg from '../assets/logo1.png'; // adjust path

function Logo({ width = '100px' }) {
  return (
    <div style={{ width }}>
      <img 
        src={logoImg} 
        alt="Logo" 
         
        style={{ width: '100%', height: 'auto' }} 
      />
    </div>
  );
}

export default Logo;

