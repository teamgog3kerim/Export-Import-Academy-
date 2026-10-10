import React from 'react';

interface EximmanLogoProps {
  className?: string;
  size?: number;
}

export const EximmanEmblem: React.FC<EximmanLogoProps> = ({ className = 'w-full h-full', size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      fill="none"
      role="img"
      aria-label="EXIMMAN Logo Emblem"
    >
      <defs>
        <linearGradient id="navRibbonGrad" x1="30" y1="160" x2="170" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A160F" />
          <stop offset="45%" stopColor="#4E2B1D" />
          <stop offset="70%" stopColor="#3D1F14" />
          <stop offset="100%" stopColor="#2A160F" />
        </linearGradient>

        <linearGradient id="navHighlightGrad" x1="40" y1="170" x2="160" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7B472C" />
          <stop offset="50%" stopColor="#A86B44" />
          <stop offset="100%" stopColor="#6F3F27" />
        </linearGradient>
      </defs>

      {/* Globe Outlines */}
      <g stroke="#3C2117" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="100" cy="100" r="74" strokeWidth="4.5" stroke="#361E16" fill="none" />
        <path d="M 100 26 C 100 26 100 70 100 80" strokeWidth="3" opacity="0.85" />
        <path d="M 45 60 C 70 50 130 50 155 60" strokeWidth="3" opacity="0.8" />
        <path d="M 60 38 C 80 32 120 32 140 38" strokeWidth="2.5" opacity="0.75" />
        <path d="M 72 28 C 60 55 60 75 62 88" strokeWidth="2.5" opacity="0.65" />
        <path d="M 128 28 C 140 55 140 75 138 88" strokeWidth="2.5" opacity="0.65" />

        <path d="M 100 120 C 100 130 100 174 100 174" strokeWidth="3" opacity="0.85" />
        <path d="M 45 140 C 70 150 130 150 155 140" strokeWidth="3" opacity="0.8" />
        <path d="M 60 162 C 80 168 120 168 140 162" strokeWidth="2.5" opacity="0.75" />
        <path d="M 72 172 C 60 145 60 125 62 112" strokeWidth="2.5" opacity="0.65" />
        <path d="M 128 172 C 140 145 140 125 138 112" strokeWidth="2.5" opacity="0.65" />
      </g>

      {/* Upper-Left Cargo Shipping Box */}
      <g transform="translate(56, 52)">
        <polygon points="18,0 36,9 18,18 0,9" fill="#D3A076" stroke="#2E1810" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="0,9 18,18 18,36 0,27" fill="#8B5330" stroke="#2E1810" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="18,18 36,9 36,27 18,36" fill="#A86C43" stroke="#2E1810" strokeWidth="2" strokeLinejoin="round" />
        <line x1="9" y1="4.5" x2="27" y2="13.5" stroke="#3D1F14" strokeWidth="2" />
        <line x1="18" y1="18" x2="18" y2="36" stroke="#3D1F14" strokeWidth="1.8" />
      </g>

      {/* Lower-Right Quality / Compliance Seal */}
      <g transform="translate(112, 108)">
        <polygon points="20,2 35,11 35,29 20,38 5,29 5,11" fill="none" stroke="#8B5330" strokeWidth="2.8" strokeLinejoin="round" />
        <circle cx="20" cy="-2" r="1.8" fill="#A56743" />
        <circle cx="39" cy="9" r="1.8" fill="#A56743" />
        <circle cx="39" cy="31" r="1.8" fill="#A56743" />
        <circle cx="20" cy="42" r="1.8" fill="#A56743" />
        <circle cx="1" cy="31" r="1.8" fill="#A56743" />
        <circle cx="1" cy="9" r="1.8" fill="#A56743" />
        <path d="M 12 20 L 17 25 L 28 14" fill="none" stroke="#2E1810" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Main Sweeping S-Band */}
      <path
        d="M 46 142 C 66 120, 82 110, 102 96 C 126 79, 142 66, 150 48 L 165 57 C 155 77, 137 92, 114 109 C 92 125, 74 136, 56 156 Z"
        fill="url(#navRibbonGrad)"
        stroke="#23120C"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Outer Bevel Highlight */}
      <path
        d="M 52 148 C 70 130, 88 120, 108 103 C 130 85, 146 72, 156 52"
        stroke="url(#navHighlightGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Inner Loop Highlight */}
      <path
        d="M 44 136 C 62 114, 80 104, 100 89 C 122 73, 138 60, 146 45"
        stroke="#673922"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Top-Right Arrowhead (Export) */}
      <g transform="translate(136, 18) rotate(48)">
        <polygon points="18,0 36,36 18,28 0,36" fill="url(#navRibbonGrad)" stroke="#23120C" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="18,0 18,28 0,36" fill="#8B5330" opacity="0.4" />
        <line x1="18" y1="0" x2="18" y2="28" stroke="#A86B44" strokeWidth="2" />
      </g>

      {/* Bottom-Left Arrowhead (Import) */}
      <g transform="translate(42, 172) rotate(228)">
        <polygon points="18,0 36,36 18,28 0,36" fill="url(#navRibbonGrad)" stroke="#23120C" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="18,0 18,28 0,36" fill="#8B5330" opacity="0.4" />
        <line x1="18" y1="0" x2="18" y2="28" stroke="#A86B44" strokeWidth="2" />
      </g>
    </svg>
  );
};
