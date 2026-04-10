import React from 'react';

const HexagonPath = ({ r }) => {
  // Pointy-topped hexagon: corners at 0, 60, 120, 180, 240, 300 degrees from top
  const hW = r * 0.866025; // half-width
  return `0,${-r} ${hW},${-r/2} ${hW},${r/2} 0,${r} ${-hW},${r/2} ${-hW},${-r/2}`;
};

export default function CymonicHeroGraphic({ className = "" }) {
  const R_NODE = 220; // Distance of the floating nodes
  const hW_node = R_NODE * 0.866025;

  // Orbit node coordinates
  const nodes = [
    { label: "Crew", x: 0, y: -R_NODE },
    { label: "Pulse", x: hW_node, y: -R_NODE/2 },
    { label: "Lens", x: hW_node, y: R_NODE/2 },
    { label: "Orbit", x: 0, y: R_NODE },
    { label: "Sentinel", x: -hW_node, y: R_NODE/2 },
    { label: "Operate", x: -hW_node, y: -R_NODE/2 },
  ];

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 700 700" className="w-full h-full max-w-[600px] overflow-visible">
        <g transform="translate(350,350)">
          
          {/* Subtle Outer Grid Shadows */}
          <polygon points={HexagonPath({r: 320})} fill="none" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="1" />
          <polygon points={HexagonPath({r: 280})} fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1" />

          {/* Dotted Orbit Lines */}
          <polygon points={HexagonPath({r: 200})} fill="none" stroke="#10B981" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 6" />
          <polygon points={HexagonPath({r: R_NODE})} fill="none" stroke="#10B981" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 6" />
          
          {/* Internal Radiating Lines */}
          {nodes.map((n, i) => (
             <line key={`line-${i}`} x1="0" y1="0" x2={n.x * 0.8} y2={n.y * 0.8} stroke="#10B981" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 4" />
          ))}

          {/* The Neural Core */}
          <g>
            <polygon points={HexagonPath({r: 80})} fill="rgba(16, 185, 129, 0.05)" stroke="#10B981" strokeWidth="4" />
            <polygon points={HexagonPath({r: 95})} fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" />
            <circle cx="0" cy="0" r="14" fill="#10B981" className="animate-pulse" />
          </g>

          {/* Floating Nodes */}
          {nodes.map((node, i) => (
            <g key={node.label} transform={`translate(${node.x},${node.y})`}>
              <polygon points={HexagonPath({r: 35})} fill="rgba(15, 23, 42, 0.9)" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" className="drop-shadow-lg" />
              <text x="0" y="4" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="600" className="opacity-80 tracking-wider">
                {node.label}
              </text>
            </g>
          ))}
          
        </g>
      </svg>
    </div>
  );
}
