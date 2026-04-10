import React from 'react';

export default function CymonicLogo({ size = "lg", hideText = false }) {
  const isLg = size === "lg";
  const iconSize = isLg ? 48 : 28;
  const textSize = isLg ? "text-4xl" : "text-xl";
  
  return (
    <div className={`flex items-center ${isLg ? 'gap-4' : 'gap-2'}`}>
      {/* Official Geometric Icon */}
      <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Hexagon */}
        <polygon 
          points="50,10 84.64,30 84.64,70 50,90 15.36,70 15.36,30" 
          stroke="var(--accent-primary)" 
          strokeWidth="8" 
          strokeLinejoin="round"
        />
        {/* Inner Hexagon */}
        <polygon 
          points="50,30 67.32,40 67.32,60 50,70 32.68,60 32.68,40" 
          stroke="var(--accent-primary)" 
          strokeWidth="5" 
          strokeLinejoin="round" 
          opacity="0.8"
        />
        {/* Center Dot */}
        <circle cx="50" cy="50" r="7" fill="var(--accent-primary)" />
      </svg>
      
      {/* Official Wordmark */}
      {!hideText && (
        <div className={`font-outfit font-bold tracking-tight text-white flex items-end ${textSize}`} style={{ lineHeight: 1 }}>
          CYMONIC<span style={{ color: 'var(--accent-primary)', marginLeft: isLg ? '2px' : '1px' }}>.</span>
        </div>
      )}
    </div>
  );
}
