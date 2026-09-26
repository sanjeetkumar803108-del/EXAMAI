import React from 'react';

/**
 * Universal Vector SVG Illustrations for AP Exam Subject Notes
 * Covers all 30 official College Board visual concepts across:
 * - AP Calculus AB & BC (13 diagrams)
 * - AP Physics 1 (8 diagrams)
 * - AP Chemistry (9 diagrams)
 */
export function renderCalculusDiagramSvg(type: string): React.ReactNode {
  switch (type) {
    // =========================================================================
    // AP CALCULUS AB & BC (13 DIAGRAMS)
    // =========================================================================
    case 'hole_discontinuity':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="150" y1="130" x2="150" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="50" y1="60" x2="150" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
          <path d="M 60 110 Q 110 85 146 63" fill="none" stroke="#6366f1" strokeWidth="3.5" />
          <path d="M 154 57 Q 210 30 260 20" fill="none" stroke="#6366f1" strokeWidth="3.5" />
          <circle cx="150" cy="60" r="5" fill="#FAF9F6" stroke="#6366f1" strokeWidth="3" />
          <circle cx="150" cy="100" r="4.5" fill="#dc2626" />
          <text x="150" y="145" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#475569">x = c</text>
          <text x="40" y="64" fontSize="10" fontWeight="bold" textAnchor="end" fill="#6366f1">L (Limit)</text>
          <text x="40" y="104" fontSize="10" fontWeight="bold" textAnchor="end" fill="#dc2626">f(c)</text>
          <text x="160" y="55" fontSize="9" fontWeight="bold" fill="#6366f1">lim f(x) = L exists</text>
          <text x="160" y="105" fontSize="9" fontWeight="bold" fill="#dc2626">f(c) ≠ L</text>
        </svg>
      );

    case 'jump_discontinuity':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 60 110 L 150 90" fill="none" stroke="#2563eb" strokeWidth="3.5" />
          <circle cx="150" cy="90" r="4.5" fill="#2563eb" />
          <path d="M 150 40 L 260 20" fill="none" stroke="#2563eb" strokeWidth="3.5" />
          <circle cx="150" cy="40" r="5" fill="#FAF9F6" stroke="#2563eb" strokeWidth="3" />
          <line x1="150" y1="130" x2="150" y2="90" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
          <text x="150" y="145" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#475569">x = c</text>
          <text x="40" y="93" fontSize="10" fontWeight="bold" textAnchor="end" fill="#2563eb">L₁</text>
          <text x="40" y="44" fontSize="10" fontWeight="bold" textAnchor="end" fill="#2563eb">L₂</text>
          <text x="165" y="95" fontSize="9" fontWeight="bold" fill="#2563eb">lim(x→c⁻) = L₁</text>
          <text x="165" y="40" fontSize="9" fontWeight="bold" fill="#2563eb">lim(x→c⁺) = L₂</text>
          <text x="165" y="68" fontSize="9" fontWeight="black" fill="#dc2626">L₁ ≠ L₂ ➔ Limit DNE</text>
        </svg>
      );

    case 'vertical_asymptote':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="80" x2="280" y2="80" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="150" y1="10" x2="150" y2="150" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />
          <path d="M 60 70 Q 130 75 142 150" fill="none" stroke="#7c3aed" strokeWidth="3" />
          <path d="M 158 10 Q 170 85 260 90" fill="none" stroke="#7c3aed" strokeWidth="3" />
          <text x="150" y="158" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#dc2626">VA: x = c</text>
          <text x="70" y="140" fontSize="9" fontWeight="bold" fill="#7c3aed">lim(x→c⁻) = -∞</text>
          <text x="175" y="25" fontSize="9" fontWeight="bold" fill="#7c3aed">lim(x→c⁺) = +∞</text>
        </svg>
      );

    case 'corner_not_differentiable':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="120" x2="280" y2="120" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="150" y1="10" x2="150" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="60" y1="30" x2="150" y2="120" stroke="#059669" strokeWidth="3.5" />
          <line x1="150" y1="120" x2="240" y2="30" stroke="#059669" strokeWidth="3.5" />
          <circle cx="150" cy="120" r="5" fill="#059669" />
          <text x="75" y="80" fontSize="9" fontWeight="bold" fill="#059669">Slope = -1</text>
          <text x="215" y="80" fontSize="9" fontWeight="bold" fill="#059669">Slope = +1</text>
          <text x="150" y="140" fontSize="10" fontWeight="black" textAnchor="middle" fill="#dc2626">Sharp Corner (0, 0)</text>
          <text x="150" y="153" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#64748b">f'(0) Does Not Exist</text>
        </svg>
      );

    case 'ivt_guarantee':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="70" x2="270" y2="70" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
          <text x="40" y="74" fontSize="10" fontWeight="bold" textAnchor="end" fill="#f59e0b">y = d</text>
          <path d="M 70 115 C 110 110, 130 85, 155 70 C 180 55, 200 40, 240 30" fill="none" stroke="#4f46e5" strokeWidth="3.5" />
          <circle cx="70" cy="115" r="4.5" fill="#4f46e5" />
          <line x1="70" y1="115" x2="70" y2="130" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          <text x="70" y="145" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#475569">a</text>
          <circle cx="240" cy="30" r="4.5" fill="#4f46e5" />
          <line x1="240" y1="30" x2="240" y2="130" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          <text x="240" y="145" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#475569">b</text>
          <circle cx="155" cy="70" r="5" fill="#16a34a" />
          <line x1="155" y1="70" x2="155" y2="130" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="155" y="145" fontSize="10" fontWeight="black" textAnchor="middle" fill="#16a34a">c</text>
          <text x="165" y="65" fontSize="9" fontWeight="black" fill="#16a34a">f(c) = d</text>
        </svg>
      );

    case 'tangent_secant_line':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="135" x2="280" y2="135" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 50 130 Q 140 120 245 25" fill="none" stroke="#2563eb" strokeWidth="3" />
          <line x1="75" y1="130" x2="235" y2="40" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
          <line x1="70" y1="125" x2="190" y2="65" stroke="#7c3aed" strokeWidth="2.5" />
          <circle cx="110" cy="105" r="4.5" fill="#7c3aed" />
          <circle cx="210" cy="55" r="4.5" fill="#f59e0b" />
          <text x="110" y="148" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">x</text>
          <text x="210" y="148" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">x + h</text>
          <text x="120" y="70" fontSize="9" fontWeight="bold" fill="#7c3aed">Tangent: Slope = f'(x)</text>
          <text x="165" y="45" fontSize="8.5" fontWeight="bold" fill="#f59e0b">Secant: Δy / h</text>
        </svg>
      );

    case 'derivative_graphs_f_fprime':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="80" x2="280" y2="80" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 50 110 C 80 40, 110 30, 140 70 C 170 110, 200 120, 240 40" fill="none" stroke="#2563eb" strokeWidth="3" />
          <path d="M 60 20 Q 140 150 230 20" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4 3" />
          <line x1="95" y1="35" x2="95" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="185" y1="110" x2="185" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="95" cy="80" r="4" fill="#dc2626" />
          <circle cx="185" cy="80" r="4" fill="#dc2626" />
          <text x="245" y="45" fontSize="9" fontWeight="bold" fill="#2563eb">f(x)</text>
          <text x="235" y="25" fontSize="9" fontWeight="bold" fill="#dc2626">f'(x)</text>
          <text x="95" y="93" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#dc2626">f'=0 (Max)</text>
          <text x="185" y="93" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#dc2626">f'=0 (Min)</text>
        </svg>
      );

    case 'concavity_inflection':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 60 125 C 100 40, 130 50, 150 80 C 170 110, 200 120, 240 25" fill="none" stroke="#db2777" strokeWidth="3" />
          <line x1="105" y1="120" x2="195" y2="40" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="150" cy="80" r="5" fill="#7c3aed" />
          <text x="80" y="55" fontSize="8.5" fontWeight="bold" fill="#db2777">f'' &lt; 0 (Concave Down)</text>
          <text x="200" y="105" fontSize="8.5" fontWeight="bold" fill="#db2777">f'' &gt; 0 (Concave Up)</text>
          <text x="150" y="98" fontSize="9" fontWeight="black" textAnchor="middle" fill="#7c3aed">Point of Inflection</text>
        </svg>
      );

    case 'riemann_sum_rectangles':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="70" y="105" width="40" height="25" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <rect x="110" y="85" width="40" height="45" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <rect x="150" y="60" width="40" height="70" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <rect x="190" y="30" width="40" height="100" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <path d="M 60 120 Q 140 100 240 20" fill="none" stroke="#2563eb" strokeWidth="3" />
          <text x="70" y="145" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">a</text>
          <text x="230" y="145" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">b</text>
          <text x="130" y="145" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#16a34a">Δx = (b-a)/n</text>
          <text x="150" y="20" fontSize="9" fontWeight="bold" fill="#2563eb">f(x) curve</text>
        </svg>
      );

    case 'slope_field_solution':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="80" x2="280" y2="80" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="150" y1="10" x2="150" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          {[-60, -30, 0, 30, 60].map((dx, ix) => 
            [-40, -20, 0, 20, 40].map((dy, iy) => (
              <line 
                key={`${ix}-${iy}`}
                x1={150 + dx - 6} 
                y1={80 + dy - (dx > 0 ? 4 : -4)} 
                x2={150 + dx + 6} 
                y2={80 + dy + (dx > 0 ? 4 : -4)} 
                stroke="#94a3b8" 
                strokeWidth="1.5" 
              />
            ))
          )}
          <path d="M 80 130 Q 140 100 180 50 Q 210 20 230 15" fill="none" stroke="#4f46e5" strokeWidth="3" />
          <circle cx="150" cy="80" r="5" fill="#dc2626" />
          <text x="158" y="76" fontSize="9" fontWeight="black" fill="#dc2626">(x₀, y₀)</text>
          <text x="210" y="40" fontSize="9" fontWeight="bold" fill="#4f46e5">y = f(x) solution</text>
        </svg>
      );

    case 'area_between_curves_disc':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 80 110 Q 140 40 220 50 L 220 100 Q 140 85 80 110 Z" fill="#e0e7ff" stroke="none" />
          <path d="M 70 120 Q 140 40 240 50" fill="none" stroke="#4f46e5" strokeWidth="3" />
          <path d="M 70 120 Q 140 85 240 100" fill="none" stroke="#059669" strokeWidth="3" />
          <rect x="150" y="55" width="10" height="35" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
          <text x="170" y="65" fontSize="8" fontWeight="bold" fill="#d97706">dx</text>
          <text x="245" y="50" fontSize="9" fontWeight="bold" fill="#4f46e5">y = f(x) (Top)</text>
          <text x="245" y="100" fontSize="9" fontWeight="bold" fill="#059669">y = g(x) (Bottom)</text>
          <text x="80" y="145" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">a</text>
          <text x="220" y="145" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">b</text>
        </svg>
      );

    case 'polar_graph':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <circle cx="150" cy="80" r="25" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="150" cy="80" r="50" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="150" cy="80" r="70" fill="none" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="20" y1="80" x2="280" y2="80" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="150" y1="10" x2="150" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M 150 80 Q 185 45 220 80 Q 185 115 150 80 Z" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2.5" />
          <path d="M 150 80 Q 115 45 80 80 Q 115 115 150 80 Z" fill="none" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 2" />
          <path d="M 150 80 Q 115 115 150 150 Q 185 115 150 80 Z" fill="none" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 2" />
          <path d="M 150 80 Q 115 45 150 10 Q 185 45 150 80 Z" fill="none" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="150" y1="80" x2="200" y2="30" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="150" y1="80" x2="200" y2="130" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="150" cy="80" r="3.5" fill="#1e293b" />
          <text x="142" y="95" fontSize="9" fontWeight="bold" textAnchor="end" fill="#475569">Pole (0,0)</text>
          <text x="210" y="35" fontSize="8.5" fontWeight="bold" fill="#f59e0b">θ = β</text>
          <text x="210" y="135" fontSize="8.5" fontWeight="bold" fill="#f59e0b">θ = α</text>
          <text x="235" y="75" fontSize="9" fontWeight="black" fill="#4f46e5">Area = ½ ∫ r² dθ</text>
          <text x="235" y="90" fontSize="8" fontWeight="bold" fill="#64748b">r = f(θ)</text>
        </svg>
      );

    case 'taylor_polynomials':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="80" x2="280" y2="80" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="150" y1="10" x2="150" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 30 80 Q 90 20 150 80 Q 210 140 270 80" fill="none" stroke="#2563eb" strokeWidth="3.5" />
          <line x1="90" y1="140" x2="210" y2="20" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 3" />
          <path d="M 60 150 Q 110 30 150 80 Q 190 130 240 10" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="5 3" />
          <circle cx="150" cy="80" r="4.5" fill="#1e293b" />
          <text x="156" y="94" fontSize="9" fontWeight="black" fill="#1e293b">Center c = 0</text>
          <text x="272" y="75" fontSize="9" fontWeight="black" fill="#2563eb">f(x) = sin(x)</text>
          <text x="215" y="25" fontSize="8.5" fontWeight="bold" fill="#16a34a">P₁(x) = x</text>
          <text x="235" y="42" fontSize="8.5" fontWeight="bold" fill="#ea580c">P₃(x) = x - x³/6</text>
          <text x="35" y="30" fontSize="8.5" fontWeight="bold" fill="#475569">Higher degree = wider interval of convergence</text>
        </svg>
      );

    // =========================================================================
    // AP PHYSICS 1 (8 DIAGRAMS)
    // =========================================================================
    case 'projectile_motion':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Cliff */}
          <rect x="20" y="40" width="50" height="100" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
          <line x1="10" y1="140" x2="290" y2="140" stroke="#64748b" strokeWidth="2.5" />
          {/* Parabolic Path */}
          <path d="M 70 40 Q 160 40 250 140" fill="none" stroke="#ea580c" strokeWidth="3" strokeDasharray="5 3" />
          {/* Launch Point */}
          <circle cx="70" cy="40" r="5" fill="#ea580c" />
          {/* Velocity Vectors at Launch */}
          <line x1="70" y1="40" x2="110" y2="40" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <text x="115" y="44" fontSize="9" fontWeight="bold" fill="#2563eb">v_0x (Constant)</text>
          {/* Midpoint Vectors */}
          <circle cx="160" cy="65" r="4" fill="#ea580c" />
          <line x1="160" y1="65" x2="200" y2="65" stroke="#2563eb" strokeWidth="2" />
          <line x1="160" y1="65" x2="160" y2="95" stroke="#dc2626" strokeWidth="2" />
          <text x="205" y="68" fontSize="8" fontWeight="bold" fill="#2563eb">v_x</text>
          <text x="165" y="98" fontSize="8" fontWeight="bold" fill="#dc2626">v_y = -gt</text>
          {/* Impact Point */}
          <circle cx="250" cy="140" r="4" fill="#ea580c" />
          <text x="160" y="152" fontSize="9" fontWeight="bold" fill="#475569">Horizontal Range x = v_0x · t</text>
        </svg>
      );

    case 'free_body_diagram':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Incline Wedge */}
          <polygon points="40,140 260,140 260,40" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
          {/* Angle Arc */}
          <path d="M 80 140 A 40 40 0 0 0 75 125" fill="none" stroke="#475569" strokeWidth="1.5" />
          <text x="85" y="135" fontSize="9" fontWeight="bold" fill="#475569">θ</text>
          {/* Block */}
          <g transform="translate(160, 85) rotate(-24.5)">
            <rect x="-20" y="-20" width="40" height="40" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
            {/* Normal Force */}
            <line x1="0" y1="-20" x2="0" y2="-60" stroke="#16a34a" strokeWidth="2.5" />
            <text x="5" y="-55" fontSize="8.5" fontWeight="bold" fill="#16a34a">F_N = mg cosθ</text>
            {/* Friction Force */}
            <line x1="20" y1="0" x2="60" y2="0" stroke="#ea580c" strokeWidth="2" />
            <text x="65" y="4" fontSize="8.5" fontWeight="bold" fill="#ea580c">f_k = μ_k F_N</text>
            {/* Downhill Gravity Component */}
            <line x1="-20" y1="0" x2="-65" y2="0" stroke="#7c3aed" strokeWidth="2" />
            <text x="-70" y="-5" fontSize="8.5" fontWeight="bold" textAnchor="end" fill="#7c3aed">mg sinθ</text>
          </g>
          {/* True Gravity Downward */}
          <line x1="160" y1="85" x2="160" y2="135" stroke="#dc2626" strokeWidth="2.5" />
          <text x="165" y="130" fontSize="9" fontWeight="bold" fill="#dc2626">F_g = mg</text>
        </svg>
      );

    case 'energy_conservation':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Curved Roller Coaster Track */}
          <path d="M 30 30 Q 100 150 180 80 T 270 140" fill="none" stroke="#475569" strokeWidth="4" />
          {/* State A (Top) */}
          <circle cx="30" cy="30" r="7" fill="#dc2626" />
          <rect x="15" y="5" width="8" height="20" fill="#3b82f6" />
          <text x="42" y="25" fontSize="8.5" fontWeight="bold" fill="#1e293b">Point A: U_g = max, K = 0</text>
          {/* State B (Valley) */}
          <circle cx="120" cy="115" r="7" fill="#16a34a" />
          <text x="80" y="145" fontSize="8.5" fontWeight="bold" fill="#16a34a">Point B: K = max, U_g = min</text>
          {/* State C (Mid-Rise) */}
          <circle cx="180" cy="80" r="7" fill="#eab308" />
          <text x="195" y="75" fontSize="8.5" fontWeight="bold" fill="#854d0e">Point C: K + U_g = E_total</text>
          {/* Mechanical Energy Equation Banner */}
          <text x="150" y="20" fontSize="9" fontWeight="black" textAnchor="middle" fill="#094cb2">E_initial = E_final ⇒ mgh = ½mv² + mgh'</text>
        </svg>
      );

    case 'impulse_curve':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="30" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          {/* Shaded Area Under Force Curve */}
          <path d="M 70 130 Q 140 15 210 130 Z" fill="#ffedd5" stroke="#ea580c" strokeWidth="2.5" />
          <text x="140" y="85" fontSize="10" fontWeight="black" textAnchor="middle" fill="#c2410c">Area = Impulse (J)</text>
          <text x="140" y="100" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#9a3412">J = ∫ F dt = Δp = m·Δv</text>
          <text x="270" y="142" fontSize="9" fontWeight="bold" fill="#475569">Time (t)</text>
          <text x="45" y="20" fontSize="9" fontWeight="bold" textAnchor="end" fill="#475569">Force (F)</text>
          <line x1="70" y1="130" x2="70" y2="138" stroke="#475569" strokeWidth="1.5" />
          <text x="70" y="148" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#475569">t₁</text>
          <line x1="210" y1="130" x2="210" y2="138" stroke="#475569" strokeWidth="1.5" />
          <text x="210" y="148" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#475569">t₂</text>
        </svg>
      );

    case 'torque_lever':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Pivot Fulcrum */}
          <polygon points="50,120 40,140 60,140" fill="#475569" />
          <circle cx="50" cy="120" r="4" fill="#0f172a" />
          <text x="50" y="152" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#475569">Pivot (r = 0)</text>
          {/* Wrench / Beam */}
          <rect x="50" y="116" width="160" height="8" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
          {/* Radius Vector r */}
          <line x1="50" y1="105" x2="210" y2="105" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="130" y="100" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#3b82f6">Lever Arm Distance (r)</text>
          {/* Applied Force Vector */}
          <line x1="210" y1="120" x2="260" y2="40" stroke="#dc2626" strokeWidth="2.5" />
          <text x="265" y="45" fontSize="9" fontWeight="black" fill="#dc2626">Force F</text>
          {/* Perpendicular Component Line */}
          <line x1="210" y1="120" x2="210" y2="50" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 2" />
          <text x="205" y="45" fontSize="8.5" fontWeight="bold" textAnchor="end" fill="#16a34a">F_⊥ = F sinθ</text>
          {/* Formula */}
          <text x="150" y="30" fontSize="9.5" fontWeight="black" textAnchor="middle" fill="#094cb2">τ = r F sinθ = r_⊥ · F</text>
        </svg>
      );

    case 'rolling_race':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Incline */}
          <polygon points="30,135 270,135 270,40" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Sphere (Fastest) */}
          <circle cx="160" cy="70" r="16" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
          <text x="160" y="74" fontSize="8" fontWeight="black" textAnchor="middle" fill="#1e40af">Sphere</text>
          <text x="160" y="100" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#16a34a">1st (I = ⅖MR²)</text>
          {/* Disk (Middle) */}
          <circle cx="105" cy="95" r="16" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          <text x="105" y="99" fontSize="8" fontWeight="black" textAnchor="middle" fill="#854d0e">Disk</text>
          <text x="105" y="125" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#ca8a04">2nd (I = ½MR²)</text>
          {/* Hoop (Slowest) */}
          <circle cx="55" cy="120" r="16" fill="none" stroke="#dc2626" strokeWidth="3.5" />
          <text x="55" y="124" fontSize="8" fontWeight="black" textAnchor="middle" fill="#991b1b">Hoop</text>
          <text x="55" y="148" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#dc2626">3rd (I = MR²)</text>
          {/* Takeaway Header */}
          <text x="150" y="22" fontSize="9" fontWeight="black" textAnchor="middle" fill="#0f172a">Smaller Rotational Inertia (I) ➔ Greater Linear Speed!</text>
        </svg>
      );

    case 'shm_curves':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="80" x2="280" y2="80" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="40" y1="10" x2="40" y2="150" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Position Curve x(t) = A cos(wt) */}
          <path d="M 40 30 Q 100 130 160 30 T 280 30" fill="none" stroke="#2563eb" strokeWidth="2.5" />
          <text x="282" y="32" fontSize="8" fontWeight="bold" fill="#2563eb">x(t) = A cos(ωt)</text>
          {/* Velocity Curve v(t) = -Aw sin(wt) (Shifted 90 deg) */}
          <path d="M 40 80 Q 70 130 100 80 T 160 80 T 220 80 T 280 80" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 2" />
          <text x="282" y="82" fontSize="8" fontWeight="bold" fill="#dc2626">v(t) = -Aω sin(ωt)</text>
          {/* Acceleration Curve a(t) = -Aw^2 cos(wt) (Shifted 180 deg) */}
          <path d="M 40 130 Q 100 30 160 130 T 280 130" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="2 2" />
          <text x="282" y="132" fontSize="8" fontWeight="bold" fill="#16a34a">a(t) = -Aω² cos(ωt)</text>
          <text x="140" y="18" fontSize="8.5" fontWeight="black" fill="#0f172a">v = max at x = 0; a = max at x = ±A</text>
        </svg>
      );

    case 'venturi_effect':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Outer Pipe with Throat Constriction */}
          <path d="M 20 40 L 100 40 Q 130 65 150 65 Q 170 65 200 40 L 280 40 L 280 120 L 200 120 Q 170 95 150 95 Q 130 95 100 120 L 20 120 Z" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
          {/* Vertical Manometer Height Tubes */}
          <rect x="60" y="10" width="16" height="30" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="60" y="20" width="16" height="20" fill="#38bdf8" />
          <text x="68" y="18" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#0369a1">High P₁</text>
          <rect x="142" y="10" width="16" height="55" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="142" y="45" width="16" height="20" fill="#38bdf8" />
          <text x="150" y="40" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#0369a1">Low P₂</text>
          {/* Flow Arrows */}
          <text x="45" y="84" fontSize="8.5" fontWeight="bold" fill="#0369a1">Area A₁ (Slow v₁)</text>
          <text x="150" y="82" fontSize="8" fontWeight="black" textAnchor="middle" fill="#dc2626">Throat A₂ (Fast v₂)</text>
          <text x="150" y="145" fontSize="8.5" fontWeight="black" textAnchor="middle" fill="#0f172a">A₁v₁ = A₂v₂ &amp; P₁ + ½ρv₁² = P₂ + ½ρv₂²</text>
        </svg>
      );

    // =========================================================================
    // AP CHEMISTRY (9 DIAGRAMS)
    // =========================================================================
    case 'pes_spectrum':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="40" y1="10" x2="40" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          {/* Axis Labels: Decreasing Binding Energy (MJ/mol) */}
          <text x="40" y="145" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#475569">100</text>
          <text x="110" y="145" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#475569">10</text>
          <text x="180" y="145" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#475569">1</text>
          <text x="250" y="145" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#475569">0.1</text>
          <text x="280" y="145" fontSize="8" fontWeight="bold" fill="#475569">MJ/mol</text>
          {/* 1s Peak (Height = 2) */}
          <line x1="70" y1="130" x2="70" y2="70" stroke="#2563eb" strokeWidth="3" />
          <text x="70" y="65" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#2563eb">1s²</text>
          {/* 2s Peak (Height = 2) */}
          <line x1="140" y1="130" x2="140" y2="70" stroke="#2563eb" strokeWidth="3" />
          <text x="140" y="65" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#2563eb">2s²</text>
          {/* 2p Peak (Height = 4, Oxygen) */}
          <line x1="190" y1="130" x2="190" y2="25" stroke="#ea580c" strokeWidth="4" />
          <text x="190" y="20" fontSize="8.5" fontWeight="black" textAnchor="middle" fill="#ea580c">2p⁴ (Oxygen)</text>
          <text x="150" y="15" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">Peak Position = Coulombic Attraction; Height = Electron Count</text>
        </svg>
      );

    case 'bond_energy_curve':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="20" y1="80" x2="280" y2="80" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          {/* Lennard-Jones style potential well */}
          <path d="M 65 15 Q 75 140 120 140 Q 180 140 270 82" fill="none" stroke="#7c3aed" strokeWidth="3" />
          {/* Bond Length Coordinate r0 */}
          <line x1="120" y1="80" x2="120" y2="140" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="120" cy="140" r="4.5" fill="#7c3aed" />
          <text x="120" y="74" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#7c3aed">Bond Length (r₀)</text>
          {/* Bond Dissociation Energy De */}
          <line x1="120" y1="80" x2="120" y2="140" stroke="#dc2626" strokeWidth="1.5" />
          <text x="135" y="115" fontSize="8.5" fontWeight="black" fill="#dc2626">Bond Energy (Dₑ)</text>
          <text x="60" y="45" fontSize="8" fontWeight="bold" fill="#ba1a1a">Nuclear Repulsion</text>
          <text x="220" y="74" fontSize="8" fontWeight="bold" fill="#475569">Zero Interaction</text>
          <text x="270" y="95" fontSize="8.5" fontWeight="bold" fill="#475569">Distance (r)</text>
        </svg>
      );

    case 'maxwell_boltzmann':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="30" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          {/* Lower Temp T1 (Tall, narrow) */}
          <path d="M 45 130 Q 80 20 120 70 Q 150 110 200 130" fill="none" stroke="#2563eb" strokeWidth="2.5" />
          <text x="100" y="35" fontSize="8.5" fontWeight="bold" fill="#2563eb">Lower Temp T₁</text>
          {/* Higher Temp T2 (Flatter, shifted right) */}
          <path d="M 45 130 Q 110 60 170 90 Q 220 115 270 130" fill="none" stroke="#ea580c" strokeWidth="2.5" />
          <text x="175" y="65" fontSize="8.5" fontWeight="bold" fill="#ea580c">Higher Temp T₂ (T₂ &gt; T₁)</text>
          {/* Activation Energy Line */}
          <line x1="210" y1="20" x2="210" y2="130" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 2" />
          <text x="215" y="28" fontSize="8" fontWeight="black" fill="#dc2626">Activation Energy (Eₐ)</text>
          <text x="215" y="42" fontSize="7.5" fontWeight="bold" fill="#ea580c">More molecules exceed Eₐ at T₂</text>
          <text x="270" y="142" fontSize="8.5" fontWeight="bold" fill="#475569">Molecular Speed (v)</text>
        </svg>
      );

    case 'particulate_diagram':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Box 1: Before Reaction */}
          <rect x="25" y="25" width="115" height="105" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="82" y="18" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">Before: 4 H₂ + 3 O₂</text>
          {/* 4 H2 molecules (small connected gray pairs) */}
          <circle cx="45" cy="45" r="4" fill="#94a3b8" /><circle cx="51" cy="45" r="4" fill="#94a3b8" />
          <circle cx="95" cy="40" r="4" fill="#94a3b8" /><circle cx="101" cy="40" r="4" fill="#94a3b8" />
          <circle cx="50" cy="85" r="4" fill="#94a3b8" /><circle cx="56" cy="85" r="4" fill="#94a3b8" />
          <circle cx="85" cy="110" r="4" fill="#94a3b8" /><circle cx="91" cy="110" r="4" fill="#94a3b8" />
          {/* 3 O2 molecules (larger connected red pairs) */}
          <circle cx="65" cy="65" r="6" fill="#ef4444" /><circle cx="75" cy="65" r="6" fill="#ef4444" />
          <circle cx="115" cy="75" r="6" fill="#ef4444" /><circle cx="125" cy="75" r="6" fill="#ef4444" />
          <circle cx="45" cy="115" r="6" fill="#ef4444" /><circle cx="55" cy="115" r="6" fill="#ef4444" />
          {/* Reaction Arrow */}
          <line x1="145" y1="77" x2="162" y2="77" stroke="#094cb2" strokeWidth="3" markerEnd="url(#arrow)" />
          {/* Box 2: After Reaction */}
          <rect x="168" y="25" width="115" height="105" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="225" y="18" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">After: 4 H₂O + 1 O₂ Left</text>
          {/* 4 H2O molecules (Red center + 2 small gray ears) */}
          <circle cx="190" cy="50" r="6" fill="#ef4444" /><circle cx="185" cy="44" r="3.5" fill="#94a3b8" /><circle cx="195" cy="44" r="3.5" fill="#94a3b8" />
          <circle cx="245" cy="48" r="6" fill="#ef4444" /><circle cx="240" cy="42" r="3.5" fill="#94a3b8" /><circle cx="250" cy="42" r="3.5" fill="#94a3b8" />
          <circle cx="195" cy="100" r="6" fill="#ef4444" /><circle cx="190" cy="94" r="3.5" fill="#94a3b8" /><circle cx="200" cy="94" r="3.5" fill="#94a3b8" />
          <circle cx="250" cy="95" r="6" fill="#ef4444" /><circle cx="245" cy="89" r="3.5" fill="#94a3b8" /><circle cx="255" cy="89" r="3.5" fill="#94a3b8" />
          {/* 1 Excess O2 molecule */}
          <circle cx="220" cy="75" r="6" fill="#ef4444" /><circle cx="230" cy="75" r="6" fill="#ef4444" />
          <text x="150" y="148" fontSize="8" fontWeight="black" textAnchor="middle" fill="#094cb2">H₂ is Limiting (Consumed completely); O₂ is in Excess</text>
        </svg>
      );

    case 'reaction_coordinate':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="30" y1="135" x2="280" y2="135" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          {/* Reactants Plateau */}
          <line x1="45" y1="90" x2="80" y2="90" stroke="#0f172a" strokeWidth="3" />
          <text x="60" y="82" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">Reactants</text>
          {/* Uncatalyzed Curve (Higher) */}
          <path d="M 80 90 Q 150 -10 220 120" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x="150" y="20" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#dc2626">Uncatalyzed E_a</text>
          {/* Catalyzed Curve (Lowered Barrier) */}
          <path d="M 80 90 Q 150 45 220 120" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="4 2" />
          <text x="150" y="55" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#16a34a">Catalyzed E_a (Lower)</text>
          {/* Products Plateau */}
          <line x1="220" y1="120" x2="265" y2="120" stroke="#0f172a" strokeWidth="3" />
          <text x="245" y="112" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">Products</text>
          {/* Delta H Bracket */}
          <line x1="260" y1="90" x2="260" y2="120" stroke="#3b82f6" strokeWidth="2" />
          <text x="268" y="108" fontSize="8" fontWeight="black" fill="#3b82f6">ΔH &lt; 0 (Exo)</text>
          <text x="150" y="150" fontSize="8.5" fontWeight="black" textAnchor="middle" fill="#094cb2">Catalyst Lowers Activation Energy (E_a); Leaves ΔH Unchanged</text>
        </svg>
      );

    case 'heating_curve':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="30" y1="135" x2="280" y2="135" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          {/* 5 Stages */}
          {/* 1. Solid warming */}
          <line x1="45" y1="130" x2="80" y2="105" stroke="#2563eb" strokeWidth="2.5" />
          <text x="60" y="125" fontSize="7.5" fontWeight="bold" fill="#2563eb">Solid</text>
          {/* 2. Melting Plateau (ΔHfus) */}
          <line x1="80" y1="105" x2="130" y2="105" stroke="#ea580c" strokeWidth="3" />
          <text x="105" y="98" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#ea580c">Melting (ΔH_fus)</text>
          {/* 3. Liquid warming */}
          <line x1="130" y1="105" x2="180" y2="55" stroke="#2563eb" strokeWidth="2.5" />
          <text x="155" y="85" fontSize="7.5" fontWeight="bold" fill="#2563eb">Liquid</text>
          {/* 4. Boiling Plateau (ΔHvap) - Longer! */}
          <line x1="180" y1="55" x2="250" y2="55" stroke="#dc2626" strokeWidth="3.5" />
          <text x="215" y="48" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#dc2626">Boiling (ΔH_vap &gt; ΔH_fus)</text>
          {/* 5. Gas warming */}
          <line x1="250" y1="55" x2="275" y2="25" stroke="#2563eb" strokeWidth="2.5" />
          <text x="268" y="20" fontSize="7.5" fontWeight="bold" fill="#2563eb">Gas</text>
          <text x="150" y="150" fontSize="8.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Plateaus: Potential Energy Rises; Slopes: Kinetic Energy (Temp) Rises</text>
        </svg>
      );

    case 'equilibrium_graph':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="30" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          {/* Reactant Depletion: Curves down then levels off */}
          <path d="M 45 30 Q 100 85 150 85 L 270 85" fill="none" stroke="#2563eb" strokeWidth="2.5" />
          <text x="272" y="88" fontSize="8" fontWeight="bold" fill="#2563eb">[Reactant]</text>
          {/* Product Formation: Curves up then levels off */}
          <path d="M 45 130 Q 100 50 150 50 L 270 50" fill="none" stroke="#ea580c" strokeWidth="2.5" />
          <text x="272" y="53" fontSize="8" fontWeight="bold" fill="#ea580c">[Product]</text>
          {/* Equilibrium Line */}
          <line x1="150" y1="15" x2="150" y2="130" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="150" y="25" fontSize="8.5" fontWeight="black" textAnchor="middle" fill="#16a34a">Equilibrium Established (t_eq)</text>
          <text x="150" y="148" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#475569">Concentrations become CONSTANT; Forward Rate = Reverse Rate</text>
        </svg>
      );

    case 'titration_curve':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="30" y1="135" x2="280" y2="135" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          {/* Weak Acid with Strong Base S-curve */}
          <path d="M 45 115 Q 85 100 120 95 Q 145 95 150 65 Q 155 35 180 35 L 260 30" fill="none" stroke="#7c3aed" strokeWidth="3" />
          {/* Half Equivalence Point */}
          <circle cx="100" cy="98" r="4" fill="#0284c7" />
          <text x="100" y="112" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#0284c7">½ V_eq: pH = pK_a</text>
          {/* Equivalence Point (pH > 7) */}
          <circle cx="150" cy="65" r="4" fill="#16a34a" />
          <text x="155" y="62" fontSize="8" fontWeight="black" fill="#16a34a">Equivalence Point (pH &gt; 7)</text>
          <line x1="45" y1="75" x2="270" y2="75" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 2" />
          <text x="40" y="78" fontSize="7.5" fontWeight="bold" textAnchor="end" fill="#64748b">pH 7</text>
          <text x="270" y="142" fontSize="8" fontWeight="bold" fill="#475569">Volume Strong Base Added</text>
          <text x="150" y="15" fontSize="8.5" fontWeight="black" textAnchor="middle" fill="#094cb2">Buffer Region Resists pH Change Around Half-Equivalence</text>
        </svg>
      );

    case 'galvanic_cell':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Beaker 1: Anode (Zinc) */}
          <rect x="35" y="60" width="75" height="75" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
          <rect x="55" y="40" width="16" height="75" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
          <text x="63" y="32" fontSize="8" fontWeight="black" textAnchor="middle" fill="#1e293b">Zn Anode (-)</text>
          <text x="72" y="115" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#1d4ed8">Zn²⁺(aq)</text>
          {/* Beaker 2: Cathode (Copper) */}
          <rect x="190" y="60" width="75" height="75" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
          <rect x="230" y="40" width="16" height="75" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
          <text x="238" y="32" fontSize="8" fontWeight="black" textAnchor="middle" fill="#9a3412">Cu Cathode (+)</text>
          <text x="225" y="115" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#b91c1c">Cu²⁺(aq)</text>
          {/* Salt Bridge */}
          <path d="M 90 75 Q 90 50 150 50 Q 210 50 210 75" fill="none" stroke="#eab308" strokeWidth="8" />
          <text x="150" y="46" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#854d0e">Salt Bridge (KNO₃)</text>
          {/* Wire & Voltmeter */}
          <path d="M 63 40 L 63 15 L 140 15" fill="none" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="150" cy="15" r="10" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="150" y="18" fontSize="8" fontWeight="black" textAnchor="middle" fill="#854d0e">V</text>
          <path d="M 160 15 L 238 15 L 238 40" fill="none" stroke="#1e293b" strokeWidth="1.5" />
          <text x="115" y="10" fontSize="7.5" fontWeight="black" fill="#16a34a">e⁻ flow ➔</text>
          <text x="150" y="150" fontSize="8.5" fontWeight="black" textAnchor="middle" fill="#094cb2">Anode = Oxidation; Cathode = Reduction (RED CAT / AN OX)</text>
        </svg>
      );

    // =========================================================================
    // AP BIOLOGY (8 DIAGRAMS)
    // =========================================================================
    case 'water_potential_gradient':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* U-tube outline */}
          <path d="M 60 25 L 60 110 A 30 30 0 0 0 120 110 L 120 25 M 180 25 L 180 110 A 30 30 0 0 0 240 110 L 240 25" fill="none" stroke="#64748b" strokeWidth="3" />
          <path d="M 120 110 A 30 30 0 0 1 180 110" fill="none" stroke="#64748b" strokeWidth="3" />
          {/* Semipermeable membrane */}
          <line x1="150" y1="90" x2="150" y2="140" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 3" />
          <text x="150" y="85" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#ef4444">Semipermeable Membrane</text>
          {/* Water levels */}
          {/* Left arm: Higher Ψ (pure water/low solute), lower water level */}
          <rect x="62" y="70" width="56" height="65" fill="#38bdf8" opacity="0.4" />
          <line x1="62" y1="70" x2="118" y2="70" stroke="#0284c7" strokeWidth="2" />
          <text x="90" y="62" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#0369a1">High Ψ (-1 bar)</text>
          <text x="90" y="88" fontSize="6.5" textAnchor="middle" fill="#0f172a">Dilute (Hypotonic)</text>
          {/* Right arm: Lower Ψ (high solute), higher water level */}
          <rect x="182" y="45" width="56" height="90" fill="#38bdf8" opacity="0.6" />
          <line x1="182" y1="45" x2="238" y2="45" stroke="#0284c7" strokeWidth="2" />
          {/* Solute dots in right arm */}
          <circle cx="195" cy="85" r="3.5" fill="#e11d48" />
          <circle cx="215" cy="75" r="3.5" fill="#e11d48" />
          <circle cx="205" cy="105" r="3.5" fill="#e11d48" />
          <circle cx="225" cy="115" r="3.5" fill="#e11d48" />
          <circle cx="190" cy="120" r="3.5" fill="#e11d48" />
          <text x="210" y="38" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#be123c">Low Ψ (-4 bars)</text>
          <text x="210" y="60" fontSize="6.5" textAnchor="middle" fill="#0f172a">Concentrated (Hypertonic)</text>
          {/* Net flow arrow */}
          <path d="M 125 125 L 175 125" fill="none" stroke="#2563eb" strokeWidth="3" />
          <text x="150" y="152" fontSize="8" fontWeight="black" textAnchor="middle" fill="#2563eb">Net Water Flow: High Ψ ➔ Low Ψ (More Negative)</text>
        </svg>
      );

    case 'fluid_mosaic_membrane':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <text x="15" y="16" fontSize="8" fontWeight="bold" fill="#64748b">Extracellular Fluid</text>
          <text x="15" y="150" fontSize="8" fontWeight="bold" fill="#64748b">Cytoplasm (Intracellular)</text>
          {/* Top monolayer heads and tails */}
          {[25, 45, 65, 85, 105, 125, 185, 205, 225, 245, 265].map((x) => (
            <g key={`top-${x}`}>
              <circle cx={x} cy="45" r="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
              <path d={`M ${x - 2} 51 Q ${x - 4} 62 ${x - 1} 70 M ${x + 2} 51 Q ${x + 4} 62 ${x + 1} 70`} fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            </g>
          ))}
          {/* Bottom monolayer heads and tails */}
          {[25, 45, 65, 85, 105, 125, 185, 205, 225, 245, 265].map((x) => (
            <g key={`bot-${x}`}>
              <circle cx={x} cy="115" r="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
              <path d={`M ${x - 2} 109 Q ${x - 4} 98 ${x - 1} 90 M ${x + 2} 109 Q ${x + 4} 98 ${x + 1} 90`} fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            </g>
          ))}
          {/* Integral Transport Protein */}
          <path d="M 140 35 C 135 70 135 90 140 125 L 170 125 C 175 90 175 70 170 35 Z" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="1.5" />
          <path d="M 155 38 L 155 122" fill="none" stroke="#FAF9F6" strokeWidth="3" strokeDasharray="3 2" />
          <text x="155" y="80" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">Channel</text>
          {/* Cholesterol */}
          <rect x="73" y="70" width="6" height="18" rx="2" fill="#ec4899" />
          <text x="76" y="96" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#be185d">Cholesterol</text>
          {/* Glycoprotein sugar chain */}
          <circle cx="105" cy="30" r="3" fill="#10b981" />
          <circle cx="105" cy="20" r="3" fill="#10b981" />
          <circle cx="112" cy="14" r="3" fill="#10b981" />
          <line x1="105" y1="39" x2="105" y2="30" stroke="#059669" strokeWidth="1.5" />
          <line x1="105" y1="30" x2="105" y2="20" stroke="#059669" strokeWidth="1.5" />
          <line x1="105" y1="20" x2="112" y2="14" stroke="#059669" strokeWidth="1.5" />
          <text x="122" y="24" fontSize="6.5" fontWeight="bold" fill="#059669">Glycoprotein</text>
          {/* Legend labels */}
          <text x="210" y="28" fontSize="7" fontWeight="bold" fill="#1d4ed8">Hydrophilic Head (Polar)</text>
          <text x="210" y="82" fontSize="7" fontWeight="bold" fill="#d97706">Hydrophobic Core (Nonpolar)</text>
          <text x="155" y="142" fontSize="8" fontWeight="black" textAnchor="middle" fill="#6d28d9">Amphipathic Bilayer & Integral Transport Protein</text>
        </svg>
      );

    case 'enzyme_kinetics_curve':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="35" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="35" y1="15" x2="35" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <text x="280" y="145" fontSize="7.5" fontWeight="bold" textAnchor="end" fill="#64748b">Substrate Concentration [S]</text>
          <text x="30" y="18" fontSize="7.5" fontWeight="bold" textAnchor="end" fill="#64748b">Rate (V)</text>
          {/* Normal Enzyme Curve (Blue) */}
          <path d="M 35 130 Q 80 40 270 38" fill="none" stroke="#2563eb" strokeWidth="3" />
          <line x1="35" y1="38" x2="270" y2="38" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
          <text x="30" y="42" fontSize="7.5" fontWeight="bold" textAnchor="end" fill="#2563eb">V_max</text>
          {/* Competitive Inhibitor (Green - same Vmax, higher Km) */}
          <path d="M 35 130 Q 150 75 270 42" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="5 2" />
          {/* Noncompetitive Inhibitor (Red - lower Vmax) */}
          <path d="M 35 130 Q 80 80 270 78" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x="272" y="82" fontSize="7" fontWeight="bold" fill="#dc2626">Lower V_max</text>
          {/* Km comparison lines */}
          <line x1="35" y1="84" x2="68" y2="84" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="68" y1="84" x2="68" y2="130" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="68" y="142" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#2563eb">K_m</text>
          <line x1="130" y1="84" x2="130" y2="130" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="130" y="142" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#16a34a">K_m (Inhibited)</text>
          {/* Legend badge */}
          <rect x="145" y="10" width="130" height="24" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
          <text x="150" y="20" fontSize="6.5" fontWeight="bold" fill="#2563eb">— Normal</text>
          <text x="190" y="20" fontSize="6.5" fontWeight="bold" fill="#16a34a">-- Competitive</text>
          <text x="245" y="20" fontSize="6.5" fontWeight="bold" fill="#dc2626">— Non-comp</text>
        </svg>
      );

    case 'phosphorylation_cascade':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Reception */}
          <rect x="15" y="20" width="60" height="110" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
          <circle cx="45" cy="35" r="7" fill="#ef4444" />
          <text x="45" y="52" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#1e3a8a">1. RECEPTION</text>
          <text x="45" y="65" fontSize="6.5" textAnchor="middle" fill="#475569">Ligand binds</text>
          <text x="45" y="75" fontSize="6.5" textAnchor="middle" fill="#475569">GPCR / RTK</text>
          {/* Arrow 1 */}
          <path d="M 75 75 L 98 75" fill="none" stroke="#64748b" strokeWidth="2" />
          {/* Transduction */}
          <rect x="100" y="15" width="105" height="120" rx="8" fill="#fefce8" stroke="#eab308" strokeWidth="1.5" />
          <text x="152" y="28" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#854d0e">2. TRANSDUCTION</text>
          {/* Cascade steps */}
          <rect x="110" y="36" width="85" height="20" rx="4" fill="#fbbf24" opacity="0.5" />
          <text x="152" y="49" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#78350f">Active Protein Kinase 1</text>
          <text x="152" y="66" fontSize="6.5" fill="#dc2626">ATP ➔ ADP + ℗</text>
          <rect x="110" y="72" width="85" height="20" rx="4" fill="#fbbf24" opacity="0.7" />
          <text x="152" y="85" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#78350f">Active Protein Kinase 2</text>
          <text x="152" y="102" fontSize="6.5" fill="#dc2626">ATP ➔ ADP + ℗</text>
          <rect x="110" y="107" width="85" height="20" rx="4" fill="#fbbf24" />
          <text x="152" y="120" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#78350f">Activated Target Protein</text>
          {/* Arrow 2 */}
          <path d="M 205 75 L 228 75" fill="none" stroke="#64748b" strokeWidth="2" />
          {/* Response */}
          <rect x="230" y="20" width="60" height="110" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
          <text x="260" y="45" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#065f46">3. RESPONSE</text>
          <text x="260" y="65" fontSize="6.5" textAnchor="middle" fill="#047857">Transcription</text>
          <text x="260" y="75" fontSize="6.5" textAnchor="middle" fill="#047857">Gene turned ON</text>
          <text x="260" y="90" fontSize="6.5" textAnchor="middle" fill="#047857">or Enzyme</text>
          <text x="260" y="100" fontSize="6.5" textAnchor="middle" fill="#047857">Activation</text>
          {/* Bottom badge */}
          <text x="150" y="152" fontSize="8" fontWeight="black" textAnchor="middle" fill="#b45309">Signal Amplification: 1 Ligand triggers 10⁶ final response molecules</text>
        </svg>
      );

    case 'meiosis_crossing_over':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <text x="80" y="20" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#dc2626">Maternal Homolog</text>
          <text x="220" y="20" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#2563eb">Paternal Homolog</text>
          {/* Prophase 1 Synapsis / Crossing Over */}
          <g transform="translate(40, 25)">
            {/* Chromosome 1 (Red) */}
            <path d="M 30 10 C 25 35 25 55 30 80 M 35 10 C 32 35 32 55 42 80" fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
            <circle cx="30" cy="45" r="4" fill="#991b1b" />
            {/* Chromosome 2 (Blue) */}
            <path d="M 46 10 C 49 35 49 55 39 80 M 52 10 C 56 35 56 55 52 80" fill="none" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
            <circle cx="52" cy="45" r="4" fill="#1e3a8a" />
            {/* Chiasma intersection marker */}
            <circle cx="40" cy="65" r="6" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 2" />
            <text x="40" y="98" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#b45309">Chiasma (Synapsis)</text>
          </g>
          {/* Arrow */}
          <path d="M 125 65 L 155 65" fill="none" stroke="#64748b" strokeWidth="3" />
          {/* Recombinant Gametes outcome */}
          <g transform="translate(160, 25)">
            {/* 1. Parental Red */}
            <path d="M 15 10 L 15 80" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
            {/* 2. Recombinant Red with Blue tip */}
            <path d="M 40 10 L 40 60" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 40 60 L 40 80" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" />
            {/* 3. Recombinant Blue with Red tip */}
            <path d="M 65 10 L 65 60" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 65 60 L 65 80" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
            {/* 4. Parental Blue */}
            <path d="M 90 10 L 90 80" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" />
            <text x="52" y="98" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#047857">Recombinant Chromatids</text>
          </g>
          <text x="150" y="148" fontSize="8" fontWeight="black" textAnchor="middle" fill="#1e293b">Non-Sister Chromatid Exchange Generates Novel Allele Combinations</text>
        </svg>
      );

    case 'operon_diagram':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* DNA backbone */}
          <rect x="20" y="50" width="260" height="24" rx="3" fill="#e2e8f0" stroke="#94a3b8" />
          {/* Regulatory gene lacI */}
          <rect x="25" y="52" width="45" height="20" rx="2" fill="#93c5fd" />
          <text x="47" y="65" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#1e3a8a">lacI (Reg)</text>
          {/* Promoter P */}
          <rect x="85" y="52" width="35" height="20" rx="2" fill="#86efac" />
          <text x="102" y="65" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#14532d">Promoter</text>
          {/* Operator O */}
          <rect x="123" y="52" width="35" height="20" rx="2" fill="#fde047" />
          <text x="140" y="65" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#713f12">Operator</text>
          {/* Structural genes lacZ, lacY, lacA */}
          <rect x="162" y="52" width="35" height="20" rx="2" fill="#fdba74" />
          <text x="179" y="65" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#7c2d12">lacZ</text>
          <rect x="200" y="52" width="35" height="20" rx="2" fill="#fdba74" />
          <text x="217" y="65" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#7c2d12">lacY</text>
          <rect x="238" y="52" width="35" height="20" rx="2" fill="#fdba74" />
          <text x="255" y="65" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#7c2d12">lacA</text>
          {/* RNA Polymerase */}
          <path d="M 85 25 C 80 40 115 40 120 25 Z" fill="#22c55e" opacity="0.8" />
          <text x="102" y="32" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">RNA Pol</text>
          {/* Repressor and Inducer */}
          <g transform="translate(130, 85)">
            <rect x="0" y="0" width="22" height="22" rx="4" fill="#ef4444" />
            <text x="11" y="14" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">Repressor</text>
            {/* Inducer Allolactose */}
            <circle cx="-10" cy="11" r="5" fill="#a855f7" />
            <text x="-10" y="25" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#6b21a8">Lactose</text>
            <path d="M -5 11 L -1 11" stroke="#a855f7" strokeWidth="1.5" />
          </g>
          <text x="150" y="130" fontSize="7.5" fill="#475569" textAnchor="middle">Inducer (Allolactose) inactivates repressor ➔ Repressor releases Operator</text>
          <text x="150" y="148" fontSize="8" fontWeight="black" textAnchor="middle" fill="#047857">RNA Polymerase transcribes lacZ, lacY, lacA (Operon Turned ON)</text>
        </svg>
      );

    case 'cladogram_diagram':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Cladogram diagonal stem */}
          <line x1="30" y1="135" x2="270" y2="25" stroke="#334155" strokeWidth="3" />
          {/* Outgroup (Lancelet) */}
          <line x1="75" y1="115" x2="100" y2="135" stroke="#334155" strokeWidth="2.5" />
          <text x="105" y="145" fontSize="7.5" fontWeight="bold" fill="#64748b">Lancelet (Outgroup)</text>
          {/* Branch 1: Lamprey */}
          <line x1="120" y1="95" x2="155" y2="115" stroke="#334155" strokeWidth="2.5" />
          <text x="160" y="125" fontSize="7.5" fontWeight="bold" fill="#0f172a">Lamprey</text>
          {/* Branch 2: Trout */}
          <line x1="165" y1="75" x2="205" y2="95" stroke="#334155" strokeWidth="2.5" />
          <text x="210" y="105" fontSize="7.5" fontWeight="bold" fill="#0f172a">Trout</text>
          {/* Branch 3: Frog */}
          <line x1="210" y1="55" x2="250" y2="75" stroke="#334155" strokeWidth="2.5" />
          <text x="255" y="85" fontSize="7.5" fontWeight="bold" fill="#0f172a">Frog</text>
          {/* Branch 4: Leopard */}
          <text x="275" y="25" fontSize="7.5" fontWeight="bold" fill="#2563eb">Leopard</text>
          {/* Synapomorphy tick marks on main diagonal */}
          <rect x="92" y="103" width="12" height="4" rx="1" fill="#ef4444" transform="rotate(-25 92 103)" />
          <text x="75" y="88" fontSize="6.5" fontWeight="bold" fill="#dc2626">Vertebrae</text>
          <rect x="137" y="83" width="12" height="4" rx="1" fill="#ef4444" transform="rotate(-25 137 83)" />
          <text x="125" y="68" fontSize="6.5" fontWeight="bold" fill="#dc2626">Jaws</text>
          <rect x="182" y="63" width="12" height="4" rx="1" fill="#ef4444" transform="rotate(-25 182 63)" />
          <text x="168" y="48" fontSize="6.5" fontWeight="bold" fill="#dc2626">Four Limbs</text>
          <rect x="227" y="43" width="12" height="4" rx="1" fill="#ef4444" transform="rotate(-25 227 43)" />
          <text x="212" y="28" fontSize="6.5" fontWeight="bold" fill="#dc2626">Amniotic Egg</text>
          <text x="150" y="152" fontSize="8" fontWeight="black" textAnchor="middle" fill="#0f172a">Shared Derived Characters (Synapomorphies) Define Monophyletic Clades</text>
        </svg>
      );

    case 'trophic_pyramid':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Tier 1: Apex / Tertiary Consumers */}
          <polygon points="120,20 180,20 195,45 105,45" fill="#ef4444" opacity="0.9" />
          <text x="150" y="35" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">Apex: 10 J (0.1%)</text>
          {/* Tier 2: Secondary Consumers */}
          <polygon points="105,47 195,47 215,75 85,75" fill="#f59e0b" opacity="0.9" />
          <text x="150" y="63" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">Secondary: 100 J (1%)</text>
          {/* Tier 3: Primary Consumers */}
          <polygon points="85,77 215,77 235,105 65,105" fill="#3b82f6" opacity="0.9" />
          <text x="150" y="93" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">Primary Consumers: 1,000 J (10%)</text>
          {/* Tier 4: Primary Producers */}
          <polygon points="65,107 235,107 255,135 45,135" fill="#10b981" opacity="0.9" />
          <text x="150" y="123" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">Primary Producers: 10,000 J (100%)</text>
          {/* Heat loss arrows on right side */}
          <path d="M 197 32 Q 225 32 235 25" fill="none" stroke="#dc2626" strokeWidth="1.5" />
          <path d="M 217 61 Q 245 61 255 54" fill="none" stroke="#dc2626" strokeWidth="1.5" />
          <path d="M 237 91 Q 260 91 270 84" fill="none" stroke="#dc2626" strokeWidth="1.5" />
          <text x="255" y="42" fontSize="6.5" fontWeight="bold" fill="#dc2626">90% Energy</text>
          <text x="255" y="50" fontSize="6.5" fontWeight="bold" fill="#dc2626">Lost as Heat</text>
          <text x="150" y="150" fontSize="8" fontWeight="black" textAnchor="middle" fill="#047857">Lindeman's 10% Ecological Efficiency Rule Limits Food Chain Length</text>
        </svg>
      );

    // =========================================================================
    // AP HUMAN GEOGRAPHY (7 DIAGRAMS)
    // =========================================================================
    case 'regions_diagram':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Formal Region */}
          <rect x="15" y="25" width="80" height="95" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
          <text x="55" y="40" fontSize="8" fontWeight="black" textAnchor="middle" fill="#1d4ed8">1. FORMAL</text>
          <text x="55" y="52" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#3b82f6">(Uniform)</text>
          <circle cx="35" cy="70" r="3" fill="#3b82f6" />
          <circle cx="55" cy="70" r="3" fill="#3b82f6" />
          <circle cx="75" cy="70" r="3" fill="#3b82f6" />
          <circle cx="45" cy="85" r="3" fill="#3b82f6" />
          <circle cx="65" cy="85" r="3" fill="#3b82f6" />
          <text x="55" y="105" fontSize="6" textAnchor="middle" fill="#475569">Shared homogeneous trait (e.g. State law, Corn Belt)</text>
          {/* Functional Region */}
          <rect x="110" y="25" width="80" height="95" rx="6" fill="#fefce8" stroke="#eab308" strokeWidth="2" />
          <text x="150" y="40" fontSize="8" fontWeight="black" textAnchor="middle" fill="#a16207">2. FUNCTIONAL</text>
          <text x="150" y="52" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#ca8a04">(Nodal)</text>
          <circle cx="150" cy="75" r="5" fill="#ca8a04" />
          <circle cx="150" cy="75" r="14" fill="none" stroke="#eab308" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="150" cy="75" r="22" fill="none" stroke="#eab308" strokeWidth="1" strokeDasharray="3 2" />
          <text x="150" y="105" fontSize="6" textAnchor="middle" fill="#475569">Focal node with distance decay (e.g. TV signal, Pizza delivery)</text>
          {/* Vernacular Region */}
          <rect x="205" y="25" width="80" height="95" rx="6" fill="#fdf2f8" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 3" />
          <text x="245" y="40" fontSize="8" fontWeight="black" textAnchor="middle" fill="#be185d">3. VERNACULAR</text>
          <text x="245" y="52" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#db2777">(Perceptual)</text>
          <path d="M 220 70 Q 245 60 270 75 Q 260 90 230 85 Z" fill="#fbcfe8" opacity="0.6" stroke="#db2777" strokeWidth="1" strokeDasharray="2 2" />
          <text x="245" y="78" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#9d174d">"The South"</text>
          <text x="245" y="105" fontSize="6" textAnchor="middle" fill="#475569">Defined by cultural mental map & identity</text>
          <text x="150" y="145" fontSize="8.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Three Core Geographical Region Types Recognized by College Board</text>
        </svg>
      );

    case 'dtm_graph':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="30" y1="125" x2="280" y2="125" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="30" y1="15" x2="30" y2="125" stroke="#cbd5e1" strokeWidth="2" />
          {/* Stage dividers */}
          {[80, 130, 180, 230].map((x) => (
            <line key={x} x1={x} y1="20" x2={x} y2="125" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
          ))}
          <text x="55" y="28" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#64748b">Stage 1</text>
          <text x="105" y="28" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#64748b">Stage 2</text>
          <text x="155" y="28" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#64748b">Stage 3</text>
          <text x="205" y="28" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#64748b">Stage 4</text>
          <text x="255" y="28" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#64748b">Stage 5</text>
          {/* Crude Birth Rate (CBR - Green) */}
          <path d="M 30 40 L 80 40 Q 130 42 155 70 T 230 105 L 280 110" fill="none" stroke="#16a34a" strokeWidth="2.5" />
          <text x="35" y="36" fontSize="6.5" fontWeight="bold" fill="#16a34a">CBR</text>
          {/* Crude Death Rate (CDR - Red) */}
          <path d="M 30 46 L 80 46 Q 105 85 130 100 L 230 105 L 280 102" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x="35" y="58" fontSize="6.5" fontWeight="bold" fill="#dc2626">CDR</text>
          {/* Total Population (Blue - starts low, skyrockets in 2-3, levels in 4) */}
          <path d="M 30 118 L 80 115 Q 130 90 180 50 T 280 45" fill="none" stroke="#2563eb" strokeWidth="3" />
          <text x="275" y="40" fontSize="7" fontWeight="black" textAnchor="end" fill="#2563eb">Total Population</text>
          {/* Natural Increase gap highlight in Stage 2 */}
          <text x="105" y="70" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#ea580c">Rapid Growth</text>
          <text x="150" y="148" fontSize="8" fontWeight="black" textAnchor="middle" fill="#0f172a">Demographic Transition Model: CDR drops first (Med/Ind Rev), CBR drops later</text>
        </svg>
      );

    case 'diffusion_map':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Relocation */}
          <g transform="translate(15, 15)">
            <rect x="0" y="0" width="125" height="55" rx="5" fill="#f8fafc" stroke="#e2e8f0" />
            <text x="8" y="14" fontSize="7" fontWeight="black" fill="#2563eb">Relocation Diffusion</text>
            <circle cx="25" cy="35" r="6" fill="#3b82f6" />
            <path d="M 35 35 L 85 35" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="95" cy="35" r="6" fill="#3b82f6" />
            <text x="60" y="48" fontSize="5.5" textAnchor="middle" fill="#64748b">Physical migration of people</text>
          </g>
          {/* Contagious */}
          <g transform="translate(160, 15)">
            <rect x="0" y="0" width="125" height="55" rx="5" fill="#f8fafc" stroke="#e2e8f0" />
            <text x="8" y="14" fontSize="7" fontWeight="black" fill="#16a34a">Contagious Diffusion</text>
            <circle cx="62" cy="32" r="5" fill="#16a34a" />
            <circle cx="62" cy="32" r="12" fill="none" stroke="#16a34a" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="62" cy="32" r="18" fill="none" stroke="#16a34a" strokeWidth="1" strokeDasharray="2 2" />
            <text x="62" y="48" fontSize="5.5" textAnchor="middle" fill="#64748b">Wave spreading like viral meme</text>
          </g>
          {/* Hierarchical */}
          <g transform="translate(15, 80)">
            <rect x="0" y="0" width="125" height="55" rx="5" fill="#f8fafc" stroke="#e2e8f0" />
            <text x="8" y="14" fontSize="7" fontWeight="black" fill="#9333ea">Hierarchical Diffusion</text>
            <circle cx="25" cy="30" r="7" fill="#9333ea" />
            <text x="25" y="32" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">NYC</text>
            <path d="M 35 30 L 60 30" stroke="#9333ea" strokeWidth="1.5" />
            <circle cx="70" cy="30" r="5" fill="#a855f7" />
            <path d="M 77 30 L 95 30" stroke="#9333ea" strokeWidth="1.5" />
            <circle cx="103" cy="30" r="3.5" fill="#c084fc" />
            <text x="62" y="48" fontSize="5.5" textAnchor="middle" fill="#64748b">Primate city ➔ Regional hub ➔ Town</text>
          </g>
          {/* Stimulus */}
          <g transform="translate(160, 80)">
            <rect x="0" y="0" width="125" height="55" rx="5" fill="#f8fafc" stroke="#e2e8f0" />
            <text x="8" y="14" fontSize="7" fontWeight="black" fill="#ea580c">Stimulus Diffusion</text>
            <text x="20" y="32" fontSize="6" fontWeight="bold" fill="#475569">Burger</text>
            <path d="M 45 30 L 70 30" stroke="#ea580c" strokeWidth="2" />
            <text x="80" y="32" fontSize="6" fontWeight="bold" fill="#ea580c">Veggie Burger</text>
            <text x="62" y="48" fontSize="5.5" textAnchor="middle" fill="#64748b">Underlying idea adopted with local tweak</text>
          </g>
          <text x="150" y="152" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Spatial Diffusion Taxonomy: Relocation vs. Expansion Modes</text>
        </svg>
      );

    case 'unclos_diagram':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Land / Coastline */}
          <path d="M 0 40 Q 20 80 35 125 L 0 125 Z" fill="#84cc16" opacity="0.6" stroke="#4d7c0f" strokeWidth="2" />
          <text x="12" y="90" fontSize="7.5" fontWeight="black" fill="#365314">Coast</text>
          {/* Ocean water */}
          <rect x="35" y="60" width="265" height="65" fill="#38bdf8" opacity="0.4" />
          <line x1="35" y1="60" x2="300" y2="60" stroke="#0284c7" strokeWidth="2" />
          {/* Seabed */}
          <path d="M 35 125 Q 120 125 180 135 L 300 138" fill="none" stroke="#64748b" strokeWidth="2.5" />
          {/* Zones */}
          {/* Territorial Sea (12 nm) */}
          <line x1="85" y1="35" x2="85" y2="125" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="60" y="30" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#dc2626">Territorial (12 nm)</text>
          <text x="60" y="42" fontSize="5.5" textAnchor="middle" fill="#7f1d1d">Full Sovereignty</text>
          {/* Contiguous Zone (24 nm) */}
          <line x1="135" y1="35" x2="135" y2="125" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="110" y="30" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#d97706">Contiguous (24 nm)</text>
          <text x="110" y="42" fontSize="5.5" textAnchor="middle" fill="#78350f">Customs & Laws</text>
          {/* EEZ (200 nm) */}
          <line x1="230" y1="35" x2="230" y2="135" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="180" y="30" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#2563eb">EEZ (Exclusive Economic Zone: 200 nm)</text>
          <text x="180" y="42" fontSize="5.5" textAnchor="middle" fill="#1e3a8a">Exclusive rights to Fish, Oil & Minerals</text>
          {/* High Seas */}
          <text x="265" y="30" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#475569">High Seas</text>
          <text x="265" y="42" fontSize="5.5" textAnchor="middle" fill="#475569">International Waters</text>
          <text x="150" y="152" fontSize="8" fontWeight="black" textAnchor="middle" fill="#0f172a">UNCLOS Maritime Boundaries: 12 nm Sovereignty vs. 200 nm Economic Rights</text>
        </svg>
      );

    case 'von_thunen_rings':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Concentric rings centered at (100, 80) */}
          <circle cx="100" cy="80" r="65" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="100" cy="80" r="50" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
          <circle cx="100" cy="80" r="35" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
          <circle cx="100" cy="80" r="20" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
          <circle cx="100" cy="80" r="7" fill="#0f172a" />
          <text x="100" y="83" fontSize="5" fontWeight="black" textAnchor="middle" fill="#FAF9F6">CBD</text>
          {/* Legend and explanation */}
          <g transform="translate(180, 15)">
            <circle cx="5" cy="10" r="4" fill="#0f172a" />
            <text x="15" y="13" fontSize="6.5" fontWeight="bold" fill="#0f172a">0. Central City / Market</text>
            <circle cx="5" cy="25" r="4" fill="#fbcfe8" stroke="#db2777" />
            <text x="15" y="28" fontSize="6.5" fontWeight="bold" fill="#db2777">1. Market Gardening & Dairy</text>
            <text x="25" y="36" fontSize="5.5" fill="#64748b">Perishable, high land rent</text>
            <circle cx="5" cy="48" r="4" fill="#bbf7d0" stroke="#16a34a" />
            <text x="15" y="51" fontSize="6.5" fontWeight="bold" fill="#16a34a">2. Forestry & Fuel Wood</text>
            <text x="25" y="59" fontSize="5.5" fill="#64748b">Heavy, high transport cost</text>
            <circle cx="5" cy="71" r="4" fill="#fed7aa" stroke="#ea580c" />
            <text x="15" y="74" fontSize="6.5" fontWeight="bold" fill="#ea580c">3. Grains & Field Crops</text>
            <text x="25" y="82" fontSize="5.5" fill="#64748b">Extensive, durable goods</text>
            <circle cx="5" cy="94" r="4" fill="#fef3c7" stroke="#d97706" />
            <text x="15" y="97" fontSize="6.5" fontWeight="bold" fill="#d97706">4. Ranching & Livestock</text>
            <text x="25" y="105" fontSize="5.5" fill="#64748b">Animals walk to market</text>
          </g>
          <text x="150" y="152" fontSize="8" fontWeight="black" textAnchor="middle" fill="#0f172a">Von Thünen Model: Intensive perishable farming closest; extensive ranching farthest</text>
        </svg>
      );

    case 'urban_models_diagram':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* 1. Burgess Concentric Zone */}
          <g transform="translate(10, 15)">
            <text x="40" y="12" fontSize="7" fontWeight="black" textAnchor="middle" fill="#1e3a8a">1. Burgess (1925)</text>
            <text x="40" y="22" fontSize="6" textAnchor="middle" fill="#64748b">Concentric Zones</text>
            <circle cx="40" cy="65" r="38" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1" />
            <circle cx="40" cy="65" r="28" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1" />
            <circle cx="40" cy="65" r="18" fill="#a5b4fc" stroke="#4f46e5" strokeWidth="1" />
            <circle cx="40" cy="65" r="8" fill="#4338ca" />
            <text x="40" y="67" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">CBD</text>
            <text x="40" y="115" fontSize="5.5" textAnchor="middle" fill="#475569">Ripples outward from CBD</text>
          </g>
          {/* 2. Hoyt Sector Model */}
          <g transform="translate(105, 15)">
            <text x="45" y="12" fontSize="7" fontWeight="black" textAnchor="middle" fill="#065f46">2. Hoyt (1939)</text>
            <text x="45" y="22" fontSize="6" textAnchor="middle" fill="#64748b">Sector / Wedges</text>
            <circle cx="45" cy="65" r="38" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
            {/* Sector wedges */}
            <path d="M 45 65 L 75 40 A 38 38 0 0 1 83 65 Z" fill="#34d399" opacity="0.8" />
            <path d="M 45 65 L 15 85 A 38 38 0 0 1 20 50 Z" fill="#6ee7b7" opacity="0.8" />
            <circle cx="45" cy="65" r="8" fill="#047857" />
            <text x="45" y="67" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">CBD</text>
            <text x="45" y="115" fontSize="5.5" textAnchor="middle" fill="#475569">Spreads along rail/transit</text>
          </g>
          {/* 3. Harris-Ullman Multiple Nuclei */}
          <g transform="translate(205, 15)">
            <text x="40" y="12" fontSize="7" fontWeight="black" textAnchor="middle" fill="#854d0e">3. Harris-Ullman (1945)</text>
            <text x="40" y="22" fontSize="6" textAnchor="middle" fill="#64748b">Multiple Nuclei</text>
            <rect x="5" y="28" width="75" height="75" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
            <rect x="25" y="45" width="18" height="18" rx="2" fill="#ca8a04" />
            <text x="34" y="56" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">CBD</text>
            <rect x="52" y="35" width="16" height="14" rx="2" fill="#eab308" />
            <text x="60" y="44" fontSize="4.5" textAnchor="middle" fill="#713f12">Wholesale</text>
            <rect x="48" y="65" width="18" height="16" rx="2" fill="#facc15" />
            <text x="57" y="75" fontSize="4.5" textAnchor="middle" fill="#713f12">Sub Center</text>
            <circle cx="18" cy="80" r="8" fill="#fbbf24" />
            <text x="18" y="82" fontSize="4" textAnchor="middle" fill="#713f12">Airport</text>
            <text x="42" y="115" fontSize="5.5" textAnchor="middle" fill="#475569">Multiple specialized nodes</text>
          </g>
          <text x="150" y="148" fontSize="8" fontWeight="black" textAnchor="middle" fill="#0f172a">Classic North American Urban Morphology Models Tested on AP FRQs</text>
        </svg>
      );

    case 'weber_triangle':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Triangle vertices */}
          {/* Raw Material 1 */}
          <circle cx="70" cy="40" r="14" fill="#ef4444" opacity="0.8" />
          <text x="70" y="43" fontSize="7" fontWeight="black" textAnchor="middle" fill="#FAF9F6">RM 1</text>
          {/* Raw Material 2 */}
          <circle cx="70" cy="115" r="14" fill="#ef4444" opacity="0.8" />
          <text x="70" y="118" fontSize="7" fontWeight="black" textAnchor="middle" fill="#FAF9F6">RM 2</text>
          {/* Market */}
          <circle cx="230" cy="78" r="16" fill="#3b82f6" opacity="0.8" />
          <text x="230" y="81" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#FAF9F6">Market</text>
          {/* Triangle lines */}
          <line x1="70" y1="40" x2="70" y2="115" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="70" y1="40" x2="230" y2="78" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="70" y1="115" x2="230" y2="78" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Bulk Reducing Factory Location (Closer to RM) */}
          <circle cx="105" cy="70" r="9" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
          <text x="105" y="73" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">P₁</text>
          <text x="105" y="90" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#b45309">Bulk-Reducing</text>
          <text x="105" y="98" fontSize="5" textAnchor="middle" fill="#78350f">(e.g. Copper smelting, Paper)</text>
          {/* Bulk Gaining Factory Location (Closer to Market) */}
          <circle cx="190" cy="78" r="9" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
          <text x="190" y="81" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">P₂</text>
          <text x="190" y="98" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#047857">Bulk-Gaining</text>
          <text x="190" y="106" fontSize="5" textAnchor="middle" fill="#065f46">(e.g. Soft drinks, Cars)</text>
          <text x="150" y="18" fontSize="8" fontWeight="black" textAnchor="middle" fill="#0f172a">Weber's Least Cost Theory: Raw Materials vs. Market Weight Pull</text>
          <text x="150" y="148" fontSize="7.5" fill="#475569" textAnchor="middle">Minimizes Total Transportation Costs based on Weight Loss vs. Weight Gain</text>
        </svg>
      );

    // =========================================================================
    // AP ENVIRONMENTAL SCIENCE (9 DIAGRAMS)
    // =========================================================================
    case 'nitrogen_cycle_flow':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Atmosphere N2 */}
          <rect x="95" y="10" width="110" height="24" rx="5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          <text x="150" y="24" fontSize="8" fontWeight="black" textAnchor="middle" fill="#0369a1">Atmospheric N₂ (78%)</text>
          {/* Step 1: Nitrogen Fixation */}
          <path d="M 105 34 L 50 58" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="55" y="44" fontSize="6" fontWeight="bold" fill="#15803d">1. Fixation (Rhizobium)</text>
          <rect x="15" y="60" width="80" height="25" rx="4" fill="#dcfce7" stroke="#22c55e" />
          <text x="55" y="74" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#166534">Ammonia (NH₃/NH₄⁺)</text>
          {/* Step 2: Nitrification */}
          <path d="M 95 72 L 135 72" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="115" y="66" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#1d4ed8">2. Nitrification</text>
          <rect x="135" y="60" width="75" height="25" rx="4" fill="#dbeafe" stroke="#3b82f6" />
          <text x="172" y="74" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#1e40af">Nitrates (NO₃⁻)</text>
          {/* Step 3: Assimilation */}
          <path d="M 172 85 L 172 108" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="180" y="98" fontSize="6" fontWeight="bold" fill="#b45309">3. Assimilation</text>
          <rect x="130" y="110" width="85" height="22" rx="4" fill="#fef3c7" stroke="#f59e0b" />
          <text x="172" y="124" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#92400e">Plant Protein & DNA</text>
          {/* Step 4: Ammonification */}
          <path d="M 130 120 L 55 120 L 55 85" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="80" y="132" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#7e22ce">4. Ammonification (Decomposers)</text>
          {/* Step 5: Denitrification */}
          <path d="M 195 60 Q 250 45 205 24" stroke="#dc2626" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          <text x="245" y="42" fontSize="6" fontWeight="bold" fill="#b91c1c">5. Denitrification (Anaerobic)</text>
          <text x="150" y="150" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Nitrogen Cycle: Bacteria govern Fixation, Nitrification, and Denitrification</text>
        </svg>
      );

    case 'island_biogeography_curves':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="35" y1="125" x2="270" y2="125" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="35" y1="15" x2="35" y2="125" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="270" y1="15" x2="270" y2="125" stroke="#cbd5e1" strokeWidth="2" />
          <text x="150" y="140" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#64748b">Number of Species on Island (Richness S)</text>
          <text x="30" y="18" fontSize="6.5" fontWeight="bold" textAnchor="end" fill="#16a34a">Immigration Rate</text>
          <text x="275" y="18" fontSize="6.5" fontWeight="bold" fill="#dc2626">Extinction Rate</text>
          {/* Immigration curves (sloping downward) */}
          <path d="M 35 25 Q 90 90 270 120" fill="none" stroke="#16a34a" strokeWidth="2.5" />
          <text x="80" y="45" fontSize="6" fontWeight="bold" fill="#15803d">Near Mainland</text>
          <path d="M 35 60 Q 90 105 270 125" fill="none" stroke="#86efac" strokeWidth="2" strokeDasharray="4 2" />
          <text x="75" y="80" fontSize="6" fill="#15803d">Far Island</text>
          {/* Extinction curves (sloping upward) */}
          <path d="M 35 120 Q 210 90 270 25" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x="220" y="45" fontSize="6" fontWeight="bold" fill="#b91c1c">Small Island</text>
          <path d="M 35 125 Q 210 105 270 60" fill="none" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4 2" />
          <text x="225" y="80" fontSize="6" fill="#b91c1c">Large Island</text>
          {/* Optimum point (Near & Large) */}
          <circle cx="160" cy="85" r="4.5" fill="#2563eb" />
          <text x="160" y="78" fontSize="6" fontWeight="black" textAnchor="middle" fill="#1d4ed8">Equilibrium S*</text>
          <text x="150" y="152" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">MacArthur-Wilson Model: Highest Richness = LARGE & NEAR Mainland</text>
        </svg>
      );

    case 'survivorship_curves':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="40" y1="125" x2="275" y2="125" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="40" y1="15" x2="40" y2="125" stroke="#cbd5e1" strokeWidth="2" />
          <text x="160" y="140" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#64748b">Lifespan Percentage (Young ➔ Old Age)</text>
          <text x="35" y="18" fontSize="7" fontWeight="bold" textAnchor="end" fill="#64748b">Survivors</text>
          {/* Type I (Red - Convex) */}
          <path d="M 40 25 Q 190 25 270 120" fill="none" stroke="#dc2626" strokeWidth="3" />
          <text x="135" y="22" fontSize="7" fontWeight="black" fill="#dc2626">Type I (K-selected, Humans): High parental care, die late</text>
          {/* Type II (Blue - Diagonal) */}
          <line x1="40" y1="25" x2="270" y2="120" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="5 3" />
          <text x="165" y="65" fontSize="6.5" fontWeight="bold" fill="#2563eb">Type II (Birds): Constant death rate</text>
          {/* Type III (Green - Concave) */}
          <path d="M 40 25 Q 60 115 270 125" fill="none" stroke="#16a34a" strokeWidth="3" />
          <text x="75" y="105" fontSize="7" fontWeight="black" fill="#16a34a">Type III (r-selected, Trees/Insects): High infant mortality</text>
          <text x="150" y="152" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Survivorship Curves Dictate r vs. K Life History Strategies</text>
        </svg>
      );

    case 'soil_triangle':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Triangle */}
          <polygon points="150,20 60,125 240,125" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
          <text x="150" y="14" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#991b1b">100% Clay (Top)</text>
          <text x="45" y="132" fontSize="7.5" fontWeight="black" fill="#ca8a04">100% Sand</text>
          <text x="245" y="132" fontSize="7.5" fontWeight="black" fill="#0284c7">100% Silt</text>
          {/* Internal target zones */}
          <polygon points="150,55 125,90 175,90" fill="#fca5a5" opacity="0.5" />
          <text x="150" y="78" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#991b1b">Clay</text>
          <circle cx="150" cy="110" r="14" fill="#86efac" opacity="0.6" stroke="#16a34a" strokeWidth="1.5" />
          <text x="150" y="112" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#166534">LOAM (Ideal)</text>
          <text x="150" y="120" fontSize="5" textAnchor="middle" fill="#166534">40% Sand, 40% Silt, 20% Clay</text>
          {/* Particle size legend */}
          <g transform="translate(195, 20)">
            <text x="0" y="10" fontSize="5.5" fontWeight="bold" fill="#ca8a04">● Sand: 0.05 - 2 mm (High perm)</text>
            <text x="0" y="20" fontSize="5.5" fontWeight="bold" fill="#0284c7">● Silt: 0.002 - 0.05 mm</text>
            <text x="0" y="30" fontSize="5.5" fontWeight="bold" fill="#991b1b">● Clay: &lt; 0.002 mm (High water cap)</text>
          </g>
          <text x="150" y="150" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">USDA Soil Texture Triangle: Loam provides balanced drainage and nutrient retention</text>
        </svg>
      );

    case 'ipm_hierarchy_pyramid':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Top: Chemical */}
          <polygon points="120,20 180,20 195,45 105,45" fill="#ef4444" opacity="0.9" />
          <text x="150" y="35" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#FAF9F6">4. Chemical: Pesticides (LAST RESORT)</text>
          {/* Tier 2: Biological */}
          <polygon points="105,47 195,47 215,75 85,75" fill="#f59e0b" opacity="0.9" />
          <text x="150" y="64" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">3. Biological: Natural Predators (Ladybugs, Parasitic Wasps)</text>
          {/* Tier 3: Physical/Mechanical */}
          <polygon points="85,77 215,77 235,105 65,105" fill="#3b82f6" opacity="0.9" />
          <text x="150" y="93" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">2. Physical: Traps, Netting, Mulch, Handpicking</text>
          {/* Tier 4: Cultural/Prevention */}
          <polygon points="65,107 235,107 255,135 45,135" fill="#10b981" opacity="0.9" />
          <text x="150" y="123" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">1. Cultural (BASE): Crop Rotation, Intercropping, Pest-Resistant Crops</text>
          <text x="150" y="150" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Integrated Pest Management (IPM): Minimize pesticide resistance and bioaccumulation</text>
        </svg>
      );

    case 'power_plant_flow':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Fuel / Boiler */}
          <rect x="15" y="45" width="55" height="55" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="42" y="65" fontSize="7" fontWeight="black" textAnchor="middle" fill="#991b1b">Boiler</text>
          <text x="42" y="77" fontSize="5.5" textAnchor="middle" fill="#7f1d1d">Combustion</text>
          <text x="42" y="87" fontSize="5" textAnchor="middle" fill="#7f1d1d">(Coal/Gas/Uranium)</text>
          {/* Steam pipe */}
          <path d="M 70 70 L 95 70" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="82" y="63" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#ef4444">High-P Steam</text>
          {/* Turbine */}
          <polygon points="95,50 145,62 145,78 95,90" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="118" y="73" fontSize="7" fontWeight="black" textAnchor="middle" fill="#92400e">Turbine</text>
          {/* Shaft */}
          <line x1="145" y1="70" x2="175" y2="70" stroke="#334155" strokeWidth="4" />
          <text x="160" y="63" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#334155">Shaft</text>
          {/* Generator */}
          <circle cx="205" cy="70" r="22" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="205" y="68" fontSize="7" fontWeight="black" textAnchor="middle" fill="#1e40af">Generator</text>
          <text x="205" y="78" fontSize="5.5" textAnchor="middle" fill="#1e40af">EM Induction</text>
          {/* Power grid line */}
          <path d="M 227 70 L 275 70" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <text x="255" y="63" fontSize="6" fontWeight="black" fill="#b45309">⚡ Grid</text>
          {/* Cooling Tower below */}
          <path d="M 120 90 L 120 120 L 70 120 L 70 100" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
          <text x="95" y="115" fontSize="5.5" fill="#0369a1">Condenser Cooling Loop</text>
          <text x="150" y="148" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Thermal Power Generation: Thermal ➔ Mechanical (Turbine) ➔ Electrical (Generator)</text>
        </svg>
      );

    case 'photochemical_smog_timeline':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="30" y1="125" x2="280" y2="125" stroke="#cbd5e1" strokeWidth="2" />
          <text x="50" y="137" fontSize="6.5" fontWeight="bold" fill="#64748b">6:00 AM (Rush)</text>
          <text x="150" y="137" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#64748b">12:00 PM (Noon UV)</text>
          <text x="245" y="137" fontSize="6.5" fontWeight="bold" fill="#64748b">3:00 PM (Peak Smog)</text>
          {/* NO and VOC morning peak (Red) */}
          <path d="M 35 110 Q 55 35 90 85 T 160 115 L 275 120" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x="55" y="38" fontSize="6.5" fontWeight="bold" fill="#dc2626">NOx & VOCs (Car Exhaust)</text>
          {/* Sunlight UV intensity (Yellow) */}
          <path d="M 70 120 Q 150 25 230 120" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="4 2" />
          <text x="150" y="38" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#ca8a04">Solar Radiation (UV)</text>
          {/* Tropospheric Ozone O3 & PANs afternoon peak (Purple) */}
          <path d="M 35 122 L 110 118 Q 180 110 215 45 T 275 90" fill="none" stroke="#9333ea" strokeWidth="3" />
          <text x="215" y="38" fontSize="7" fontWeight="black" textAnchor="middle" fill="#7e22ce">O₃ & PANs (Photochemical Smog)</text>
          <text x="150" y="152" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">NOx + VOCs + Sunlight (UV) ➔ Ground-level Ozone (O₃) + PANs</text>
        </svg>
      );

    case 'oxygen_sag_curve':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <line x1="30" y1="125" x2="280" y2="125" stroke="#cbd5e1" strokeWidth="2" />
          {/* Zones */}
          <line x1="75" y1="20" x2="75" y2="125" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="135" y1="20" x2="135" y2="125" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="205" y1="20" x2="205" y2="125" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" />
          <text x="50" y="25" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#0284c7">Clean Zone</text>
          <text x="105" y="25" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#ea580c">Decomposition</text>
          <text x="170" y="25" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#dc2626">Septic Zone</text>
          <text x="240" y="25" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#16a34a">Recovery Zone</text>
          {/* Point source pipe */}
          <rect x="70" y="40" width="8" height="15" fill="#475569" />
          <text x="74" y="36" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#dc2626">Sewage Outfall</text>
          {/* BOD curve (Red - rises sharply then decays) */}
          <path d="M 30 110 L 75 110 Q 90 35 115 45 T 205 105 L 280 112" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x="98" y="48" fontSize="6.5" fontWeight="bold" fill="#dc2626">BOD (Biological Oxygen Demand)</text>
          {/* DO curve (Blue - sags deeply then recovers) */}
          <path d="M 30 40 L 75 40 Q 115 45 150 115 T 230 50 L 280 42" fill="none" stroke="#0284c7" strokeWidth="3" />
          <text x="150" y="112" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0369a1">DO Sag (Critical Fish Kill)</text>
          <text x="150" y="150" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Point Source Organic Waste: Aerobic decomposers consume DO, driving BOD up</text>
        </svg>
      );

    case 'greenhouse_effect_diagram':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Sun */}
          <circle cx="35" cy="25" r="14" fill="#facc15" stroke="#eab308" strokeWidth="2" />
          <text x="35" y="28" fontSize="6" fontWeight="black" textAnchor="middle" fill="#713f12">Sun</text>
          {/* Earth surface */}
          <path d="M 0 130 Q 150 120 300 130 L 300 160 L 0 160 Z" fill="#bbf7d0" stroke="#16a34a" />
          <text x="150" y="145" fontSize="7" fontWeight="black" textAnchor="middle" fill="#14532d">Earth Surface (Absorbs & Warms)</text>
          {/* Atmosphere GHG layer */}
          <rect x="40" y="55" width="240" height="20" rx="4" fill="#f1f5f9" opacity="0.8" stroke="#94a3b8" strokeDasharray="4 3" />
          <text x="160" y="68" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#475569">Greenhouse Gas Layer (CO₂, CH₄, N₂O, H₂O)</text>
          {/* Incoming shortwave solar radiation */}
          <path d="M 45 38 L 95 125" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <text x="50" y="80" fontSize="6" fontWeight="bold" fill="#b45309">Shortwave UV/Vis</text>
          {/* Outgoing re-radiated Infrared (IR) */}
          <path d="M 130 122 L 155 75" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 2" />
          <text x="125" y="98" fontSize="6" fontWeight="bold" fill="#dc2626">Infrared (IR)</text>
          {/* Trapped heat re-radiated downward */}
          <path d="M 165 75 Q 185 105 210 122" stroke="#b91c1c" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <text x="215" y="95" fontSize="6" fontWeight="black" fill="#b91c1c">Trapped IR Heat</text>
          <text x="150" y="16" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Greenhouse Effect: GHGs absorb outgoing longwave infrared (IR) and re-radiate heat</text>
        </svg>
      );

    // =========================================================================
    // AP U.S. HISTORY (9 DIAGRAMS)
    // =========================================================================
    case 'columbian_exchange_map':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Americas (Left) */}
          <rect x="15" y="25" width="105" height="105" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
          <text x="67" y="38" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#065f46">NEW WORLD (Americas)</text>
          <text x="67" y="52" fontSize="6" fill="#047857">• Corn (Maize), Potatoes</text>
          <text x="67" y="64" fontSize="6" fill="#047857">• Tomatoes, Tobacco</text>
          <text x="67" y="76" fontSize="6" fill="#047857">• Cocoa, Vanilla, Beans</text>
          <text x="67" y="88" fontSize="6" fill="#047857">• Gold & Silver (Potosí)</text>
          <text x="67" y="100" fontSize="5.5" fontStyle="italic" fill="#065f46">Fueled European capitalism</text>
          {/* Old World (Right) */}
          <rect x="180" y="25" width="105" height="105" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="232" y="38" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#1e3a8a">OLD WORLD (Europe/Africa)</text>
          <text x="232" y="52" fontSize="6" fill="#1d4ed8">• Horses, Cattle, Pigs</text>
          <text x="232" y="64" fontSize="6" fill="#1d4ed8">• Wheat, Sugar, Rice, Coffee</text>
          <text x="232" y="76" fontSize="6" fontWeight="bold" fill="#dc2626">• Smallpox, Measles, Flu</text>
          <text x="232" y="88" fontSize="6" fill="#1d4ed8">• Enslaved African Labor</text>
          <text x="232" y="100" fontSize="5.5" fontStyle="italic" fill="#1e3a8a">90% Indigenous depopulation</text>
          {/* Arrows */}
          <path d="M 122 55 L 175 55" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <text x="148" y="50" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#059669">Crops ➔</text>
          <path d="M 175 90 L 122 90" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <text x="148" y="102" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#2563eb">🠔 Disease/Horses</text>
          <text x="150" y="148" fontSize="8" fontWeight="black" textAnchor="middle" fill="#0f172a">Columbian Exchange (Post-1492): Transformed Global Ecology & Demographics</text>
        </svg>
      );

    case 'triangular_trade_map':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Triangle nodes */}
          {/* 1. Britain / Europe */}
          <rect x="185" y="15" width="95" height="34" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="232" y="27" fontSize="7" fontWeight="black" textAnchor="middle" fill="#1e3a8a">1. Europe (Britain)</text>
          <text x="232" y="38" fontSize="5.5" textAnchor="middle" fill="#1d4ed8">Guns, Textiles, Rum, Pots</text>
          {/* 2. West Africa */}
          <rect x="185" y="95" width="95" height="34" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="232" y="107" fontSize="7" fontWeight="black" textAnchor="middle" fill="#991b1b">2. West Africa</text>
          <text x="232" y="118" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#dc2626">Enslaved Captives</text>
          {/* 3. American Colonies & Caribbean */}
          <rect x="20" y="55" width="105" height="38" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
          <text x="72" y="67" fontSize="7" fontWeight="black" textAnchor="middle" fill="#065f46">3. Colonies & Caribbean</text>
          <text x="72" y="77" fontSize="5.5" textAnchor="middle" fill="#047857">Sugar, Tobacco, Cotton, Molasses</text>
          <text x="72" y="86" fontSize="5" fontStyle="italic" textAnchor="middle" fill="#047857">Plantation Cash Crops</text>
          {/* Flow 1: Europe to Africa */}
          <path d="M 232 50 L 232 92" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="255" y="73" fontSize="5.5" fill="#1d4ed8">Manufactured Goods</text>
          {/* Flow 2: Africa to Americas (The Middle Passage) */}
          <path d="M 183 110 L 128 85" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="148" y="115" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#dc2626">Middle Passage</text>
          {/* Flow 3: Americas to Europe */}
          <path d="M 126 62 L 183 35" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="140" y="42" fontSize="5.5" fill="#047857">Raw Materials ➔</text>
          <text x="150" y="150" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Transatlantic Triangular Trade: Mercantilist Resource and Enslaved Labor System</text>
        </svg>
      );

    case 'checks_and_balances':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Legislative (Top) */}
          <rect x="95" y="10" width="110" height="35" rx="5" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
          <text x="150" y="24" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#1d4ed8">LEGISLATIVE (Congress)</text>
          <text x="150" y="36" fontSize="6" textAnchor="middle" fill="#1e40af">House + Senate (Makes Laws)</text>
          {/* Executive (Bottom-Left) */}
          <rect x="15" y="90" width="110" height="35" rx="5" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
          <text x="70" y="104" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#b91c1c">EXECUTIVE (President)</text>
          <text x="70" y="116" fontSize="6" textAnchor="middle" fill="#991b1b">Enforces Laws & Military</text>
          {/* Judicial (Bottom-Right) */}
          <rect x="175" y="90" width="110" height="35" rx="5" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
          <text x="230" y="104" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#047857">JUDICIAL (Supreme Court)</text>
          <text x="230" y="116" fontSize="6" textAnchor="middle" fill="#065f46">Interprets Laws (Judicial Review)</text>
          {/* Checks lines */}
          {/* Pres ➔ Congress (Veto) */}
          <path d="M 55 88 L 105 48" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="65" y="65" fontSize="5.5" fontWeight="bold" fill="#dc2626">Vetoes Bills</text>
          {/* Congress ➔ Pres (Override, Impeach) */}
          <path d="M 125 48 L 75 88" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="105" y="75" fontSize="5" fontWeight="bold" fill="#2563eb">Override (2/3)</text>
          {/* Court ➔ Congress & Pres (Judicial Review) */}
          <path d="M 180 88 L 165 48" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="195" y="65" fontSize="5.5" fontWeight="bold" fill="#059669">Judicial Review</text>
          <text x="150" y="148" fontSize="8" fontWeight="black" textAnchor="middle" fill="#0f172a">US Constitution Tripartite Checks and Balances (Madisonian Model)</text>
        </svg>
      );

    case 'missouri_compromise_map':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Free North (Blue) */}
          <rect x="25" y="20" width="250" height="48" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="150" y="38" fontSize="8" fontWeight="black" textAnchor="middle" fill="#1e40af">FREE TERRITORY (North of 36°30')</text>
          <text x="150" y="52" fontSize="6.5" textAnchor="middle" fill="#1d4ed8">Slavery Forever Prohibited in Louisiana Purchase Territory</text>
          <text x="45" y="35" fontSize="6" fontWeight="bold" fill="#1e3a8a">Maine (Free)</text>
          {/* 36°30' Parallel Dividing Line */}
          <line x1="25" y1="70" x2="275" y2="70" stroke="#dc2626" strokeWidth="3" />
          <rect x="110" y="62" width="80" height="16" rx="3" fill="#dc2626" />
          <text x="150" y="73" fontSize="7" fontWeight="black" textAnchor="middle" fill="#FAF9F6">36°30' Parallel</text>
          {/* Missouri Anomaly */}
          <rect x="195" y="45" width="45" height="23" rx="2" fill="#fed7aa" stroke="#ea580c" />
          <text x="217" y="57" fontSize="6" fontWeight="black" textAnchor="middle" fill="#7c2d12">Missouri</text>
          <text x="217" y="64" fontSize="5" textAnchor="middle" fill="#7c2d12">(Slave Exception)</text>
          {/* Slave South (Red) */}
          <rect x="25" y="74" width="250" height="48" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="150" y="94" fontSize="8" fontWeight="black" textAnchor="middle" fill="#991b1b">SLAVE TERRITORY (South of 36°30')</text>
          <text x="150" y="108" fontSize="6.5" textAnchor="middle" fill="#b91c1c">Slavery Permitted (Arkansas Territory & South)</text>
          <text x="150" y="148" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Missouri Compromise (1820): Maintained Senate Free vs. Slave State Balance (12-12)</text>
        </svg>
      );

    case 'civil_war_map':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Union (North) */}
          <rect x="20" y="15" width="260" height="38" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="150" y="30" fontSize="8" fontWeight="black" textAnchor="middle" fill="#1e40af">THE UNION (Northern Free States)</text>
          <text x="150" y="43" fontSize="6" textAnchor="middle" fill="#1d4ed8">Industrial base, 70% of railroads, larger population (22M vs 9M)</text>
          {/* Border States */}
          <rect x="35" y="57" width="230" height="26" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="150" y="70" fontSize="7" fontWeight="black" textAnchor="middle" fill="#92400e">BORDER STATES (Slave states remaining in Union)</text>
          <text x="150" y="79" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#b45309">Maryland, Delaware, Kentucky, Missouri (Crucial strategic buffers)</text>
          {/* Confederacy (South) */}
          <rect x="20" y="87" width="260" height="38" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
          <text x="150" y="102" fontSize="8" fontWeight="black" textAnchor="middle" fill="#991b1b">THE CONFEDERACY (11 Seceded States)</text>
          <text x="150" y="115" fontSize="6" textAnchor="middle" fill="#b91c1c">Cotton economy, defensive home turf, elite military leadership (Lee)</text>
          <text x="150" y="148" fontSize="8" fontWeight="black" textAnchor="middle" fill="#0f172a">Civil War (1861–1865): Lincoln's primary initial goal was preserving the Union</text>
        </svg>
      );

    case 'monopoly_diagram':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Horizontal Integration (Rockefeller) */}
          <g transform="translate(15, 15)">
            <rect x="0" y="0" width="125" height="110" rx="5" fill="#f8fafc" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="62" y="16" fontSize="7" fontWeight="black" textAnchor="middle" fill="#1d4ed8">Horizontal Integration</text>
            <text x="62" y="26" fontSize="5.5" fontStyle="italic" textAnchor="middle" fill="#64748b">Rockefeller (Standard Oil)</text>
            {/* Competitor boxes merged */}
            <rect x="10" y="35" width="30" height="20" rx="2" fill="#e2e8f0" />
            <text x="25" y="48" fontSize="5" textAnchor="middle" fill="#475569">Refinery A</text>
            <rect x="48" y="35" width="30" height="20" rx="2" fill="#3b82f6" />
            <text x="63" y="48" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">Standard</text>
            <rect x="85" y="35" width="30" height="20" rx="2" fill="#e2e8f0" />
            <text x="100" y="48" fontSize="5" textAnchor="middle" fill="#475569">Refinery C</text>
            <path d="M 25 58 L 60 70 M 100 58 L 65 70" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <rect x="25" y="72" width="75" height="22" rx="3" fill="#1e40af" />
            <text x="62" y="86" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">MONOPOLY TRUST (90%)</text>
            <text x="62" y="103" fontSize="4.5" textAnchor="middle" fill="#475569">Buys out competing rivals</text>
          </g>
          {/* Vertical Integration (Carnegie) */}
          <g transform="translate(160, 15)">
            <rect x="0" y="0" width="125" height="110" rx="5" fill="#f8fafc" stroke="#10b981" strokeWidth="1.5" />
            <text x="62" y="16" fontSize="7" fontWeight="black" textAnchor="middle" fill="#047857">Vertical Integration</text>
            <text x="62" y="26" fontSize="5.5" fontStyle="italic" textAnchor="middle" fill="#64748b">Carnegie (US Steel)</text>
            {/* Step boxes top to bottom */}
            <rect x="25" y="32" width="75" height="14" rx="2" fill="#d1fae5" stroke="#059669" />
            <text x="62" y="42" fontSize="5" textAnchor="middle" fill="#065f46">1. Iron Ore Mines & Coal</text>
            <line x1="62" y1="47" x2="62" y2="52" stroke="#059669" strokeWidth="1.5" />
            <rect x="25" y="53" width="75" height="14" rx="2" fill="#a7f3d0" stroke="#059669" />
            <text x="62" y="63" fontSize="5" textAnchor="middle" fill="#065f46">2. Railroads & Steamships</text>
            <line x1="62" y1="68" x2="62" y2="73" stroke="#059669" strokeWidth="1.5" />
            <rect x="25" y="74" width="75" height="14" rx="2" fill="#6ee7b7" stroke="#059669" />
            <text x="62" y="84" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#065f46">3. Steel Mills / Refineries</text>
            <text x="62" y="103" fontSize="4.5" textAnchor="middle" fill="#475569">Controls all production phases</text>
          </g>
          <text x="150" y="148" fontSize="8" fontWeight="black" textAnchor="middle" fill="#0f172a">Gilded Age Corporate Consolidation Strategies (Robber Barons vs. Captains)</text>
        </svg>
      );

    case 'new_deal_branches':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Top Banner */}
          <rect x="60" y="10" width="180" height="22" rx="4" fill="#0f172a" />
          <text x="150" y="24" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#FAF9F6">FDR's NEW DEAL (The 3 R's)</text>
          {/* 1. Relief */}
          <g transform="translate(15, 38)">
            <rect x="0" y="0" width="85" height="85" rx="5" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="42" y="15" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#1d4ed8">1. RELIEF</text>
            <text x="42" y="27" fontSize="5.5" fontStyle="italic" textAnchor="middle" fill="#64748b">Immediate Aid</text>
            <text x="8" y="42" fontSize="5.5" fontWeight="bold" fill="#1e40af">• CCC (Forestry jobs)</text>
            <text x="8" y="55" fontSize="5.5" fontWeight="bold" fill="#1e40af">• WPA (Public works)</text>
            <text x="8" y="68" fontSize="5.5" fontWeight="bold" fill="#1e40af">• FERA (Direct cash)</text>
            <text x="8" y="79" fontSize="5" fill="#475569">Halt starvation & despair</text>
          </g>
          {/* 2. Recovery */}
          <g transform="translate(108, 38)">
            <rect x="0" y="0" width="85" height="85" rx="5" fill="#fefce8" stroke="#eab308" strokeWidth="1.5" />
            <text x="42" y="15" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#a16207">2. RECOVERY</text>
            <text x="42" y="27" fontSize="5.5" fontStyle="italic" textAnchor="middle" fill="#64748b">Prime the Pump</text>
            <text x="8" y="42" fontSize="5.5" fontWeight="bold" fill="#854d0e">• AAA (Farm subsidies)</text>
            <text x="8" y="55" fontSize="5.5" fontWeight="bold" fill="#854d0e">• NIRA (Codes/wages)</text>
            <text x="8" y="68" fontSize="5.5" fontWeight="bold" fill="#854d0e">• TVA (Hydro power)</text>
            <text x="8" y="79" fontSize="5" fill="#475569">Restart economic engine</text>
          </g>
          {/* 3. Reform */}
          <g transform="translate(200, 38)">
            <rect x="0" y="0" width="85" height="85" rx="5" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
            <text x="42" y="15" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#047857">3. REFORM</text>
            <text x="42" y="27" fontSize="5.5" fontStyle="italic" textAnchor="middle" fill="#64748b">Permanent Safeguards</text>
            <text x="8" y="42" fontSize="5.5" fontWeight="bold" fill="#065f46">• FDIC (Insure deposits)</text>
            <text x="8" y="55" fontSize="5.5" fontWeight="bold" fill="#065f46">• SEC (Regulate stocks)</text>
            <text x="8" y="68" fontSize="5.5" fontWeight="bold" fill="#065f46">• Social Security (1935)</text>
            <text x="8" y="79" fontSize="5" fill="#475569">Prevent future depression</text>
          </g>
          <text x="150" y="148" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">New Deal Realigned the Democratic Party and Created Modern Welfare State</text>
        </svg>
      );

    case 'cold_war_map':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Western Bloc (NATO) */}
          <rect x="15" y="25" width="115" height="95" rx="5" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
          <text x="72" y="40" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#1d4ed8">WESTERN BLOC (NATO)</text>
          <text x="72" y="54" fontSize="6" textAnchor="middle" fill="#1e40af">• United States, Britain, France</text>
          <text x="72" y="66" fontSize="6" textAnchor="middle" fill="#1e40af">• Capitalist Democracy</text>
          <text x="72" y="78" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#2563eb">• Truman Doctrine (Containment)</text>
          <text x="72" y="90" fontSize="6" textAnchor="middle" fill="#1e40af">• Marshall Plan Aid ($13B)</text>
          <text x="72" y="105" fontSize="5.5" fontStyle="italic" textAnchor="middle" fill="#64748b">Collective defense pact</text>
          {/* The Iron Curtain */}
          <line x1="145" y1="20" x2="145" y2="125" stroke="#334155" strokeWidth="3" strokeDasharray="4 3" />
          <rect x="133" y="60" width="24" height="24" rx="3" fill="#334155" />
          <text x="145" y="74" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#FAF9F6">IRON</text>
          <text x="145" y="81" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#FAF9F6">CURTAIN</text>
          {/* Eastern Bloc (Warsaw Pact) */}
          <rect x="165" y="25" width="120" height="95" rx="5" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
          <text x="225" y="40" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#b91c1c">SOVIET BLOC (Warsaw)</text>
          <text x="225" y="54" fontSize="6" textAnchor="middle" fill="#991b1b">• USSR, Poland, E. Germany</text>
          <text x="225" y="66" fontSize="6" textAnchor="middle" fill="#991b1b">• Command Economy / Communism</text>
          <text x="225" y="78" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#dc2626">• Satellite Puppet States</text>
          <text x="225" y="90" fontSize="6" textAnchor="middle" fill="#991b1b">• Berlin Wall (Built 1961)</text>
          <text x="225" y="105" fontSize="5.5" fontStyle="italic" textAnchor="middle" fill="#64748b">Totalitarian control</text>
          <text x="150" y="148" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Cold War Ideological Divide (1945–1991): Containment, Nuclear Arms Race & Proxy Wars</text>
        </svg>
      );

    case 'migration_flow_map':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Great Migration Box */}
          <g transform="translate(15, 20)">
            <rect x="0" y="0" width="125" height="100" rx="5" fill="#f8fafc" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="62" y="16" fontSize="7" fontWeight="black" textAnchor="middle" fill="#1d4ed8">1. The Great Migration</text>
            <text x="62" y="26" fontSize="5.5" textAnchor="middle" fill="#64748b">1916–1970 (6 Million People)</text>
            <rect x="15" y="35" width="95" height="18" rx="2" fill="#fee2e2" />
            <text x="62" y="47" fontSize="5.5" textAnchor="middle" fill="#991b1b">From: Rural Jim Crow South</text>
            <path d="M 62 55 L 62 70" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="15" y="72" width="95" height="18" rx="2" fill="#dbeafe" />
            <text x="62" y="84" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#1e40af">To: North & West Cities</text>
            <text x="62" y="95" fontSize="4.5" textAnchor="middle" fill="#475569">(Chicago, NYC, Detroit, LA)</text>
          </g>
          {/* Sunbelt Migration Box */}
          <g transform="translate(160, 20)">
            <rect x="0" y="0" width="125" height="100" rx="5" fill="#f8fafc" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="62" y="16" fontSize="7" fontWeight="black" textAnchor="middle" fill="#b45309">2. The Sunbelt Migration</text>
            <text x="62" y="26" fontSize="5.5" textAnchor="middle" fill="#64748b">Post-WWII to Present</text>
            <rect x="15" y="35" width="95" height="18" rx="2" fill="#e2e8f0" />
            <text x="62" y="47" fontSize="5.5" textAnchor="middle" fill="#475569">From: Rust Belt (NE & Midwest)</text>
            <path d="M 62 55 L 62 70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="15" y="72" width="95" height="18" rx="2" fill="#fef3c7" />
            <text x="62" y="84" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#92400e">To: South & Southwest (Sunbelt)</text>
            <text x="62" y="95" fontSize="4.5" textAnchor="middle" fill="#475569">(Air conditioning, Defense jobs, Lower taxes)</text>
          </g>
          <text x="150" y="148" fontSize="7.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Internal Migrations Reshaped US Electoral Power, Cities, and Civil Rights</text>
        </svg>
      );

    // =========================================================================
    // AP ENGLISH LANGUAGE & COMPOSITION (9 DIAGRAMS)
    // =========================================================================
    case 'rhetoric_triangle':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Triangular outline */}
          <polygon points="150,22 45,125 255,125" fill="#f8fafc" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 2" />
          
          {/* Top Vertex: Subject/Message (Logos) */}
          <g transform="translate(150, 22)">
            <circle cx="0" cy="0" r="18" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
            <text x="0" y="-3" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#312e81">LOGOS</text>
            <text x="0" y="5" fontSize="4.5" textAnchor="middle" fill="#4338ca">Logic / Facts</text>
            <text x="0" y="-22" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#1e1b4b">Subject / Message</text>
          </g>

          {/* Bottom Left: Speaker (Ethos) */}
          <g transform="translate(45, 125)">
            <circle cx="0" cy="0" r="18" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <text x="0" y="-3" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#14532d">ETHOS</text>
            <text x="0" y="5" fontSize="4.5" textAnchor="middle" fill="#15803d">Credibility</text>
            <text x="0" y="26" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#14532d">Speaker / Persona</text>
          </g>

          {/* Bottom Right: Audience (Pathos) */}
          <g transform="translate(255, 125)">
            <circle cx="0" cy="0" r="18" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
            <text x="0" y="-3" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#7f1d1d">PATHOS</text>
            <text x="0" y="5" fontSize="4.5" textAnchor="middle" fill="#b91c1c">Emotion / Values</text>
            <text x="0" y="26" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#7f1d1d">Audience / Needs</text>
          </g>

          {/* Central Core: Rhetorical Situation */}
          <rect x="95" y="65" width="110" height="30" rx="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="150" y="77" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">RHETORICAL SITUATION</text>
          <text x="150" y="87" fontSize="5" textAnchor="middle" fill="#64748b">Exigence • Context • Purpose (SPACE-CAT)</text>

          <text x="150" y="152" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">The Aristotelian Rhetorical Triangle: Dynamic Speaker-Audience-Message Interplay</text>
        </svg>
      );

    case 'toulmin_structure':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Data / Evidence Box */}
          <rect x="15" y="25" width="70" height="40" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="50" y="42" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#1e40af">DATA / EVIDENCE</text>
          <text x="50" y="53" fontSize="4.5" textAnchor="middle" fill="#475569">Grounds, facts, stats,</text>
          <text x="50" y="60" fontSize="4.5" textAnchor="middle" fill="#475569">concrete support</text>

          {/* Arrow to Claim */}
          <path d="M 85 45 L 205 45" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Qualifier & Claim */}
          <rect x="205" y="25" width="80" height="40" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
          <text x="245" y="38" fontSize="5.5" fontStyle="italic" textAnchor="middle" fill="#15803d">[Qualifier: usually / often]</text>
          <text x="245" y="50" fontSize="7" fontWeight="black" textAnchor="middle" fill="#14532d">CLAIM (Thesis)</text>
          <text x="245" y="60" fontSize="4.5" textAnchor="middle" fill="#475569">Defensible central stance</text>

          {/* Warrant (The Bridge) */}
          <rect x="95" y="80" width="105" height="35" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="147" y="93" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#92400e">WARRANT (The Bridge)</text>
          <text x="147" y="102" fontSize="4.5" textAnchor="middle" fill="#78350f">Underlying principle/assumption</text>
          <text x="147" y="109" fontSize="4.5" textAnchor="middle" fill="#78350f">connecting Evidence to Claim</text>

          {/* Connector dashed lines */}
          <line x1="147" y1="45" x2="147" y2="80" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="147" y1="115" x2="147" y2="125" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />

          {/* Backing Box */}
          <rect x="105" y="125" width="85" height="18" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
          <text x="147" y="137" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#475569">Backing: Evidence for Warrant</text>

          <text x="150" y="153" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Toulmin Model: Claim $\leftarrow$ Warrant (Assumption) $\leftarrow$ Data</text>
        </svg>
      );

    case 'synthesis_mapping':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Center: Writer's Independent Thesis */}
          <circle cx="150" cy="75" r="28" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
          <text x="150" y="70" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#5b21b6">WRITER'S</text>
          <text x="150" y="79" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#5b21b6">THESIS</text>
          <text x="150" y="87" fontSize="4.5" textAnchor="middle" fill="#6d28d9">(Host of debate)</text>

          {/* Source A (Northwest) */}
          <rect x="20" y="15" width="70" height="30" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="55" y="27" fontSize="6" fontWeight="black" textAnchor="middle" fill="#1d4ed8">Source A: Academic</text>
          <text x="55" y="37" fontSize="4.5" textAnchor="middle" fill="#475569">Empirical Statistics</text>

          {/* Source B (Northeast) */}
          <rect x="210" y="15" width="70" height="30" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
          <text x="245" y="27" fontSize="6" fontWeight="black" textAnchor="middle" fill="#15803d">Source B: Narrative</text>
          <text x="245" y="37" fontSize="4.5" textAnchor="middle" fill="#475569">Worker Experience</text>

          {/* Source C (Southwest) */}
          <rect x="20" y="95" width="70" height="30" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="55" y="107" fontSize="6" fontWeight="black" textAnchor="middle" fill="#b91c1c">Source C: Skeptic</text>
          <text x="55" y="117" fontSize="4.5" textAnchor="middle" fill="#475569">Economic Counterpoint</text>

          {/* Source D (Southeast) */}
          <rect x="210" y="95" width="70" height="30" rx="4" fill="#fefce8" stroke="#eab308" strokeWidth="1.5" />
          <text x="245" y="107" fontSize="6" fontWeight="black" textAnchor="middle" fill="#a16207">Source D: Policy</text>
          <text x="245" y="117" fontSize="4.5" textAnchor="middle" fill="#475569">Legislative Proposal</text>

          {/* Conversation Lines */}
          <line x1="90" y1="30" x2="130" y2="55" stroke="#7c3aed" strokeWidth="1.5" />
          <line x1="210" y1="30" x2="170" y2="55" stroke="#7c3aed" strokeWidth="1.5" />
          <line x1="90" y1="105" x2="130" y2="90" stroke="#7c3aed" strokeWidth="1.5" />
          <line x1="210" y1="105" x2="170" y2="90" stroke="#7c3aed" strokeWidth="1.5" />

          {/* Cross Dialogue indicators */}
          <path d="M 55 45 Q 55 70 55 95" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2" />
          <text x="60" y="72" fontSize="5" fontWeight="bold" fill="#dc2626">Refutes</text>

          <path d="M 245 45 Q 245 70 245 95" stroke="#16a34a" strokeWidth="1" strokeDasharray="3 2" />
          <text x="250" y="72" fontSize="5" fontWeight="bold" fill="#16a34a">Qualifies</text>

          <text x="150" y="150" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Synthesis Dialogue: Entering the Conversation, Not Isolated Book Reports</text>
        </svg>
      );

    case 'logic_architecture':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Deductive Reasoning Column (Left) */}
          <g transform="translate(20, 15)">
            <rect x="0" y="0" width="120" height="115" rx="5" fill="#f8fafc" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="60" y="16" fontSize="7" fontWeight="black" textAnchor="middle" fill="#1d4ed8">1. DEDUCTIVE REASONING</text>
            <text x="60" y="26" fontSize="5" textAnchor="middle" fill="#64748b">Top-Down • Inescapable Certainty</text>
            <rect x="10" y="32" width="100" height="18" rx="2" fill="#eff6ff" />
            <text x="60" y="44" fontSize="5" fontStyle="italic" textAnchor="middle" fill="#1e40af">Major: All humans are mortal</text>
            <rect x="10" y="55" width="100" height="18" rx="2" fill="#eff6ff" />
            <text x="60" y="67" fontSize="5" fontStyle="italic" textAnchor="middle" fill="#1e40af">Minor: Socrates is human</text>
            <path d="M 60 74 L 60 82" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <rect x="10" y="84" width="100" height="20" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
            <text x="60" y="97" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#1d4ed8">∴ Socrates is mortal (Certain)</text>
          </g>

          {/* Inductive Reasoning Column (Right) */}
          <g transform="translate(160, 15)">
            <rect x="0" y="0" width="120" height="115" rx="5" fill="#f8fafc" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="60" y="16" fontSize="7" fontWeight="black" textAnchor="middle" fill="#b45309">2. INDUCTIVE REASONING</text>
            <text x="60" y="26" fontSize="5" textAnchor="middle" fill="#64748b">Bottom-Up • Probabilistic Leap</text>
            <rect x="10" y="32" width="100" height="35" rx="2" fill="#fef3c7" />
            <text x="60" y="44" fontSize="5" textAnchor="middle" fill="#92400e">• Swan 1 is white</text>
            <text x="60" y="52" fontSize="5" textAnchor="middle" fill="#92400e">• Swan 2 is white</text>
            <text x="60" y="60" fontSize="5" textAnchor="middle" fill="#92400e">• 10,000 swans observed white</text>
            <path d="M 60 69 L 60 78" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <rect x="10" y="80" width="100" height="24" rx="3" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            <text x="60" y="92" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#78350f">∴ All swans are white (Probable)</text>
            <text x="60" y="100" fontSize="4.5" textAnchor="middle" fill="#b45309">(Vulnerable to black swan counter-example)</text>
          </g>

          <text x="150" y="148" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Deduction (Premise Syllogism) vs. Induction (Observation Extrapolation)</text>
        </svg>
      );

    case 'syntax_flow':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Periodic Sentence Waveform */}
          <g transform="translate(20, 20)">
            <rect x="0" y="0" width="260" height="42" rx="4" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1.5" />
            <text x="10" y="14" fontSize="6" fontWeight="black" fill="#7e22ce">Periodic Sentence: Building Suspense to Final Climax</text>
            <rect x="10" y="20" width="60" height="16" rx="2" fill="#fae8ff" />
            <text x="40" y="30" fontSize="4.5" textAnchor="middle" fill="#86198f">Subordinate clause...</text>
            <rect x="75" y="20" width="65" height="16" rx="2" fill="#fae8ff" />
            <text x="107" y="30" fontSize="4.5" textAnchor="middle" fill="#86198f">Descriptive details...</text>
            <rect x="145" y="18" width="105" height="20" rx="3" fill="#a855f7" />
            <text x="197" y="30" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#ffffff">MAIN CLAUSE (Punchline!)</text>
          </g>

          {/* Cumulative / Loose Sentence */}
          <g transform="translate(20, 75)">
            <rect x="0" y="0" width="260" height="42" rx="4" fill="#eff6ff" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="10" y="14" fontSize="6" fontWeight="black" fill="#1e40af">Cumulative (Loose) Sentence: Main Point First, Expanding Flow</text>
            <rect x="10" y="18" width="105" height="20" rx="3" fill="#2563eb" />
            <text x="62" y="30" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#ffffff">MAIN CLAUSE (Asserts early)</text>
            <rect x="120" y="20" width="65" height="16" rx="2" fill="#dbeafe" />
            <text x="152" y="30" fontSize="4.5" textAnchor="middle" fill="#1e3a8a">Cascading modifier 1...</text>
            <rect x="190" y="20" width="60" height="16" rx="2" fill="#dbeafe" />
            <text x="220" y="30" fontSize="4.5" textAnchor="middle" fill="#1e3a8a">Elaborating detail 2...</text>
          </g>

          <text x="150" y="145" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Syntactic Architecture: Periodic Suspense vs. Cumulative Flow</text>
        </svg>
      );

    case 'mcq_strategy_chart':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Top Timer Bar */}
          <rect x="25" y="15" width="250" height="24" rx="4" fill="#0f172a" />
          <text x="150" y="30" fontSize="7" fontWeight="black" textAnchor="middle" fill="#f8fafc">AP LANG SECTION I: 60 MINUTES • 45 QUESTIONS</text>

          {/* Reading Questions Block (Left) */}
          <g transform="translate(25, 48)">
            <rect x="0" y="0" width="120" height="75" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
            <text x="60" y="16" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#15803d">1. Reading Passages (~30m)</text>
            <text x="60" y="26" fontSize="5" textAnchor="middle" fill="#64748b">22–25 Questions • 2 Passages</text>
            <line x1="15" y1="32" x2="105" y2="32" stroke="#bbf7d0" strokeWidth="1" />
            <text x="60" y="44" fontSize="4.5" textAnchor="middle" fill="#166534">• Author's Purpose & Arguments</text>
            <text x="60" y="54" fontSize="4.5" textAnchor="middle" fill="#166534">• Rhetorical Devices & Function</text>
            <text x="60" y="64" fontSize="4.5" textAnchor="middle" fill="#166534">• Words in Context & Tone Shifts</text>
          </g>

          {/* Writing/Revision Questions Block (Right) */}
          <g transform="translate(155, 48)">
            <rect x="0" y="0" width="120" height="75" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="60" y="16" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#1d4ed8">2. Writing/Revision (~30m)</text>
            <text x="60" y="26" fontSize="5" textAnchor="middle" fill="#64748b">20–22 Questions • 3 Passages</text>
            <line x1="15" y1="32" x2="105" y2="32" stroke="#bfdbfe" strokeWidth="1" />
            <text x="60" y="44" fontSize="4.5" textAnchor="middle" fill="#1e40af">• Strengthening Thesis Claims</text>
            <text x="60" y="54" fontSize="4.5" textAnchor="middle" fill="#1e40af">• Transitions & Sentence Combining</text>
            <text x="60" y="64" fontSize="4.5" textAnchor="middle" fill="#1e40af">• Cohesion & Evidence Placement</text>
          </g>

          <text x="150" y="148" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">MCQ Pacing Formula: 13–15 Minutes per Passage Set</text>
        </svg>
      );

    case 'rhetorical_analysis_flow':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* 3 Chronological Movements */}
          <g transform="translate(15, 25)">
            <rect x="0" y="0" width="80" height="90" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="40" y="18" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#1d4ed8">1. BEGINNING</text>
            <text x="40" y="28" fontSize="5" textAnchor="middle" fill="#64748b">Establishes Frame</text>
            <rect x="8" y="35" width="64" height="45" rx="2" fill="#dbeafe" />
            <text x="40" y="47" fontSize="4.5" textAnchor="middle" fill="#1e40af">• Identifies Exigence</text>
            <text x="40" y="57" fontSize="4.5" textAnchor="middle" fill="#1e40af">• Builds initial Ethos</text>
            <text x="40" y="67" fontSize="4.5" textAnchor="middle" fill="#1e40af">• Disarms audience bias</text>
          </g>

          <path d="M 100 70 L 115 70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

          <g transform="translate(115, 25)">
            <rect x="0" y="0" width="80" height="90" rx="4" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1.5" />
            <text x="40" y="18" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#7e22ce">2. MIDDLE</text>
            <text x="40" y="28" fontSize="5" textAnchor="middle" fill="#64748b">Develops Argument</text>
            <rect x="8" y="35" width="64" height="45" rx="2" fill="#f5d0fe" />
            <text x="40" y="47" fontSize="4.5" textAnchor="middle" fill="#701a75">• Juxtaposition / Contrast</text>
            <text x="40" y="57" fontSize="4.5" textAnchor="middle" fill="#701a75">• Visceral Pathos & Logos</text>
            <text x="40" y="67" fontSize="4.5" textAnchor="middle" fill="#701a75">• Strategic Tone Shifts</text>
          </g>

          <path d="M 200 70 L 215 70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

          <g transform="translate(215, 25)">
            <rect x="0" y="0" width="70" height="90" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
            <text x="35" y="18" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#15803d">3. CONCLUSION</text>
            <text x="35" y="28" fontSize="5" textAnchor="middle" fill="#64748b">Fulfills Purpose</text>
            <rect x="6" y="35" width="58" height="45" rx="2" fill="#bbf7d0" />
            <text x="35" y="47" fontSize="4.5" textAnchor="middle" fill="#14532d">• Climactic appeal</text>
            <text x="35" y="57" fontSize="4.5" textAnchor="middle" fill="#14532d">• Call to Action</text>
            <text x="35" y="67" fontSize="4.5" textAnchor="middle" fill="#14532d">• Moral imperative</text>
          </g>

          <text x="150" y="145" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">FRQ 2 Functional Analysis: Tracing the Chronological Progression of Choices</text>
        </svg>
      );

    case 'argument_evidence_pyramid':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* CHELPS Evidence Tiers */}
          <polygon points="150,15 50,120 250,120" fill="#f8fafc" stroke="#6366f1" strokeWidth="1.5" />

          {/* Tier 1: Top (History & Current Events) */}
          <rect x="120" y="30" width="60" height="15" rx="2" fill="#e0e7ff" />
          <text x="150" y="40" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#312e81">C • Current Events</text>

          {/* Tier 2: History */}
          <rect x="105" y="50" width="90" height="15" rx="2" fill="#dbeafe" />
          <text x="150" y="60" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#1e40af">H • Historical Precedents</text>

          {/* Tier 3: Literature & Philosophy */}
          <rect x="85" y="70" width="130" height="15" rx="2" fill="#fef3c7" />
          <text x="150" y="80" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#92400e">E / L • Experience & Literature</text>

          {/* Tier 4: Pop Culture & Science */}
          <rect x="65" y="90" width="170" height="18" rx="2" fill="#fee2e2" />
          <text x="150" y="102" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#991b1b">P / S • Pop Culture, Politics & Science</text>

          {/* Stance Banner */}
          <g transform="translate(30, 125)">
            <rect x="0" y="0" width="240" height="20" rx="3" fill="#0f172a" />
            <text x="120" y="13" fontSize="6" fontWeight="black" textAnchor="middle" fill="#ffffff">
              DEFEND ◄──────── QUALIFY (Recommended) ────────► CHALLENGE
            </text>
          </g>

          <text x="150" y="155" fontSize="6.5" fontStyle="italic" textAnchor="middle" fill="#475569">CHELPS / REHUGO Framework for AP Lang Argument FRQ (Q3)</text>
        </svg>
      );

    case 'sophistication_rubric':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Row C Title Banner */}
          <rect x="25" y="12" width="250" height="22" rx="4" fill="#7c3aed" />
          <text x="150" y="26" fontSize="7" fontWeight="black" textAnchor="middle" fill="#ffffff">ROW C SOPHISTICATION POINT (3 DISTINCT PATHWAYS)</text>

          {/* Pathway 1 */}
          <g transform="translate(15, 42)">
            <rect x="0" y="0" width="85" height="85" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="42" y="16" fontSize="6" fontWeight="black" textAnchor="middle" fill="#1e40af">Pathway 1</text>
            <text x="42" y="26" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#1e40af">Broader Context</text>
            <text x="42" y="44" fontSize="4.5" textAnchor="middle" fill="#475569">Situates argument</text>
            <text x="42" y="53" fontSize="4.5" textAnchor="middle" fill="#475569">within historical,</text>
            <text x="42" y="62" fontSize="4.5" textAnchor="middle" fill="#475569">philosophical, or</text>
            <text x="42" y="71" fontSize="4.5" textAnchor="middle" fill="#475569">cultural conversations.</text>
          </g>

          {/* Pathway 2 */}
          <g transform="translate(108, 42)">
            <rect x="0" y="0" width="85" height="85" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="42" y="16" fontSize="6" fontWeight="black" textAnchor="middle" fill="#15803d">Pathway 2</text>
            <text x="42" y="26" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#15803d">Nuance & Tensions</text>
            <text x="42" y="44" fontSize="4.5" textAnchor="middle" fill="#475569">Explains multi-faceted</text>
            <text x="42" y="53" fontSize="4.5" textAnchor="middle" fill="#475569">complexities, concessions,</text>
            <text x="42" y="62" fontSize="4.5" textAnchor="middle" fill="#475569">rebuttals, and limits of</text>
            <text x="42" y="71" fontSize="4.5" textAnchor="middle" fill="#475569">one's own argument.</text>
          </g>

          {/* Pathway 3 */}
          <g transform="translate(201, 42)">
            <rect x="0" y="0" width="85" height="85" rx="4" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1.5" />
            <text x="42" y="16" fontSize="6" fontWeight="black" textAnchor="middle" fill="#7e22ce">Pathway 3</text>
            <text x="42" y="26" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#7e22ce">Vivid Stylistic Voice</text>
            <text x="42" y="44" fontSize="4.5" textAnchor="middle" fill="#475569">Employs sophisticated</text>
            <text x="42" y="53" fontSize="4.5" textAnchor="middle" fill="#475569">diction, vivid metaphors,</text>
            <text x="42" y="62" fontSize="4.5" textAnchor="middle" fill="#475569">varied syntactic pacing,</text>
            <text x="42" y="71" fontSize="4.5" textAnchor="middle" fill="#475569">and compelling prose.</text>
          </g>

          <text x="150" y="148" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Sophistication must be sustained throughout the essay, not a single one-off phrase</text>
        </svg>
      );

    // =========================================================================
    // AP COMPUTER SCIENCE A (10 DIAGRAMS)
    // =========================================================================
    case 'type_hierarchy':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Type boxes in widening sequence */}
          <g transform="translate(15, 30)">
            <rect x="0" y="0" width="55" height="35" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            <text x="27" y="16" fontSize="6" fontWeight="black" textAnchor="middle" fill="#334155">byte</text>
            <text x="27" y="26" fontSize="5" textAnchor="middle" fill="#64748b">8 bits</text>
          </g>
          <g transform="translate(80, 30)">
            <rect x="0" y="0" width="55" height="35" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            <text x="27" y="16" fontSize="6" fontWeight="black" textAnchor="middle" fill="#334155">short</text>
            <text x="27" y="26" fontSize="5" textAnchor="middle" fill="#64748b">16 bits</text>
          </g>
          <g transform="translate(145, 25)">
            <rect x="0" y="0" width="65" height="42" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="32" y="18" fontSize="7" fontWeight="black" textAnchor="middle" fill="#1d4ed8">int</text>
            <text x="32" y="28" fontSize="5" textAnchor="middle" fill="#1e40af">32 bits</text>
            <text x="32" y="37" fontSize="4.5" textAnchor="middle" fill="#64748b">[-2³¹, 2³¹-1]</text>
          </g>
          <g transform="translate(220, 20)">
            <rect x="0" y="0" width="65" height="50" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
            <text x="32" y="18" fontSize="7" fontWeight="black" textAnchor="middle" fill="#15803d">double</text>
            <text x="32" y="28" fontSize="5" textAnchor="middle" fill="#166534">64 bits</text>
            <text x="32" y="37" fontSize="4.5" textAnchor="middle" fill="#64748b">64-bit IEEE 754</text>
            <text x="32" y="45" fontSize="4.5" textAnchor="middle" fill="#64748b">decimals</text>
          </g>

          {/* Automatic Widening Arrow */}
          <path d="M 70 80 L 230 80" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="150" y="75" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#15803d">
            Automatic Widening Conversion (Lossless)
          </text>

          {/* Explicit Narrowing Cast Arrow */}
          <path d="M 230 110 L 150 110" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="190" y="125" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#dc2626">
            Explicit Narrowing: (int) double ➔ Truncates decimal!
          </text>

          <text x="150" y="150" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Primitive Data Hierarchy: Widening vs. Explicit Cast Truncation</text>
        </svg>
      );

    case 'memory_reference':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Stack Frame (Left) */}
          <g transform="translate(20, 15)">
            <rect x="0" y="0" width="105" height="110" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
            <text x="52" y="16" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#334155">CALL STACK (References)</text>
            
            <rect x="10" y="25" width="85" height="24" rx="3" fill="#ffffff" stroke="#94a3b8" />
            <text x="18" y="37" fontSize="5" fontWeight="bold" fill="#0f172a">str1:</text>
            <text x="50" y="37" fontSize="5" fontFamily="monospace" fill="#2563eb">0x4A3F (ref)</text>

            <rect x="10" y="55" width="85" height="24" rx="3" fill="#ffffff" stroke="#94a3b8" />
            <text x="18" y="67" fontSize="5" fontWeight="bold" fill="#0f172a">str2 = str1:</text>
            <text x="60" y="67" fontSize="5" fontFamily="monospace" fill="#2563eb">0x4A3F (alias)</text>

            <rect x="10" y="85" width="85" height="20" rx="2" fill="#eff6ff" />
            <text x="52" y="98" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#1e40af">str1 == str2 is TRUE</text>
          </g>

          {/* Pointer Arrows to Heap */}
          <path d="M 95 40 Q 130 40 160 50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 95 70 Q 130 65 160 55" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Heap Memory (Right) */}
          <g transform="translate(160, 15)">
            <rect x="0" y="0" width="125" height="110" rx="4" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="62" y="16" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#854d0e">HEAP (Objects in Memory)</text>
            <rect x="10" y="26" width="105" height="40" rx="3" fill="#ffffff" stroke="#eab308" />
            <text x="15" y="38" fontSize="4.5" fontFamily="monospace" fill="#854d0e">Address: 0x4A3F</text>
            <text x="62" y="55" fontSize="8" fontWeight="black" fontFamily="monospace" textAnchor="middle" fill="#0f172a">"Hello"</text>

            {/* Substring Index Guide */}
            <rect x="10" y="75" width="105" height="28" rx="2" fill="#fef08a" />
            <text x="62" y="86" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#713f12">str.substring(1, 4) ➔ "ell"</text>
            <text x="62" y="96" fontSize="4" textAnchor="middle" fill="#854d0e">[start=inclusive, end=exclusive]</text>
          </g>

          <text x="150" y="148" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Reference Semantics: == compares Memory Addresses; .equals() compares Content</text>
        </svg>
      );

    case 'boolean_circuit':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* AND Logic Gate with Short Circuit */}
          <g transform="translate(20, 18)">
            <rect x="0" y="0" width="120" height="85" rx="4" fill="#f8fafc" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="60" y="16" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#1d4ed8">A && B (Logical AND)</text>
            <rect x="10" y="25" width="100" height="22" rx="2" fill="#fee2e2" />
            <text x="60" y="36" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#991b1b">If A is false ➔ B is BYPASSED</text>
            <text x="60" y="44" fontSize="4" textAnchor="middle" fill="#b91c1c">(Guarantees no NullPointerException!)</text>

            <rect x="10" y="53" width="100" height="24" rx="2" fill="#f1f5f9" />
            <text x="60" y="65" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fill="#334155">str != null && str.length() &gt; 0</text>
            <text x="60" y="73" fontSize="4" fontStyle="italic" textAnchor="middle" fill="#64748b">Safe Guard Clause Pattern</text>
          </g>

          {/* OR Logic Gate with Short Circuit */}
          <g transform="translate(160, 18)">
            <rect x="0" y="0" width="120" height="85" rx="4" fill="#f8fafc" stroke="#16a34a" strokeWidth="1.5" />
            <text x="60" y="16" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#15803d">A || B (Logical OR)</text>
            <rect x="10" y="25" width="100" height="22" rx="2" fill="#dcfce7" />
            <text x="60" y="36" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#14532d">If A is true ➔ B is BYPASSED</text>
            <text x="60" y="44" fontSize="4" textAnchor="middle" fill="#15803d">(Immediate true result evaluation)</text>

            <rect x="10" y="53" width="100" height="24" rx="2" fill="#f1f5f9" />
            <text x="60" y="65" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fill="#334155">x == 0 || y / x &gt; 2</text>
            <text x="60" y="73" fontSize="4" fontStyle="italic" textAnchor="middle" fill="#64748b">Prevents Division by Zero!</text>
          </g>

          {/* De Morgan's Law Banner */}
          <rect x="20" y="112" width="260" height="22" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
          <text x="150" y="126" fontSize="6" fontWeight="black" textAnchor="middle" fill="#92400e">
            De Morgan's Laws: !(A && B) == (!A || !B)   |   !(A || B) == (!A && !B)
          </text>

          <text x="150" y="150" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Boolean Short-Circuit Evaluation and De Morgan's Transformations</text>
        </svg>
      );

    case 'nested_grid':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Row Loop Indicator (Vertical) */}
          <g transform="translate(15, 20)">
            <text x="8" y="12" fontSize="5.5" fontWeight="bold" fill="#2563eb">Outer: r (Rows)</text>
            <path d="M 10 20 L 10 85" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="2" y="55" fontSize="5" fontWeight="bold" transform="rotate(-90, 2, 55)" fill="#2563eb">for(int r=0; r&lt;3; r++)</text>
          </g>

          {/* Col Loop Indicator (Horizontal) */}
          <g transform="translate(45, 10)">
            <text x="80" y="10" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#16a34a">Inner: c (Cols) ➔ for(int c=0; c&lt;4; c++)</text>
            <path d="M 25 14 L 175 14" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow)" />
          </g>

          {/* 3x4 Matrix Grid */}
          <g transform="translate(50, 30)">
            {[0, 1, 2].map(r => (
              <g key={r}>
                {[0, 1, 2, 3].map(c => (
                  <g key={c} transform={`translate(${c * 42}, ${r * 26})`}>
                    <rect x="0" y="0" width="38" height="22" rx="2" fill={r === 0 ? "#eff6ff" : r === 1 ? "#f0fdf4" : "#fdf4ff"} stroke="#cbd5e1" />
                    <text x="19" y="14" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fill="#334155">{`[${r}][${c}]`}</text>
                  </g>
                ))}
              </g>
            ))}
          </g>

          {/* Code Annotation */}
          <rect x="50" y="115" width="205" height="22" rx="3" fill="#0f172a" />
          <text x="152" y="128" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fill="#38bdf8">
            Total Iterations = Rows × Cols = 3 × 4 = 12 steps
          </text>

          <text x="150" y="150" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Nested Loop Coordinate Traversal: Outer Loop (Row) × Inner Loop (Column)</text>
        </svg>
      );

    case 'encapsulation_diagram':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Outer Encapsulation Capsule (Class) */}
          <rect x="35" y="15" width="230" height="110" rx="30" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
          <text x="150" y="28" fontSize="7" fontWeight="black" textAnchor="middle" fill="#1e40af">PUBLIC CLASS: BankAccount</text>

          {/* Protected Private State Core */}
          <rect x="85" y="40" width="130" height="42" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
          <text x="150" y="55" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#991b1b">PRIVATE STATE</text>
          <text x="150" y="67" fontSize="5" fontFamily="monospace" textAnchor="middle" fill="#7f1d1d">private double balance;</text>
          <text x="150" y="76" fontSize="4" fontStyle="italic" textAnchor="middle" fill="#991b1b">(Hidden from outside modification)</text>

          {/* Public Methods (Controlled Gates) */}
          <g transform="translate(45, 90)">
            <rect x="0" y="0" width="100" height="24" rx="3" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
            <text x="50" y="11" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#14532d">public void deposit(amt)</text>
            <text x="50" y="19" fontSize="4" textAnchor="middle" fill="#15803d">{'{ if(amt &gt; 0) balance += amt; }'}</text>
          </g>

          <g transform="translate(155, 90)">
            <rect x="0" y="0" width="100" height="24" rx="3" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
            <text x="50" y="11" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#14532d">public double getBalance()</text>
            <text x="50" y="19" fontSize="4" textAnchor="middle" fill="#15803d">{'{ return balance; }'}</text>
          </g>

          <text x="150" y="148" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Information Hiding: Public API Methods Shielding Private Instance State</text>
        </svg>
      );

    case 'memory_array':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Title */}
          <text x="150" y="18" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">1D Array Left-Shift Mechanism (arr.length = 5)</text>

          {/* Original Array with Indices */}
          <g transform="translate(25, 25)">
            {[0, 1, 2, 3, 4].map(idx => (
              <g key={idx} transform={`translate(${idx * 50}, 0)`}>
                <text x="24" y="10" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#64748b">[{idx}]</text>
                <rect x="0" y="14" width="48" height="30" rx="3" fill={idx === 0 ? "#fee2e2" : "#eff6ff"} stroke={idx === 0 ? "#ef4444" : "#3b82f6"} strokeWidth="1.5" />
                <text x="24" y="33" fontSize="8" fontWeight="black" textAnchor="middle" fill={idx === 0 ? "#991b1b" : "#1e40af"}>
                  {idx === 0 ? "A" : idx === 1 ? "B" : idx === 2 ? "C" : idx === 3 ? "D" : "E"}
                </text>
              </g>
            ))}
          </g>

          {/* Shift Left Arrows */}
          <g transform="translate(25, 75)">
            {/* Temp holding arr[0] */}
            <rect x="0" y="12" width="48" height="25" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="24" y="24" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#92400e">int temp = A</text>
            <text x="24" y="32" fontSize="4" textAnchor="middle" fill="#b45309">(Saved first)</text>

            {/* Shift arrows */}
            <path d="M 68 0 Q 48 -10 28 0" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M 118 0 Q 98 -10 78 0" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M 168 0 Q 148 -10 128 0" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M 218 0 Q 198 -10 178 0" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow)" />

            {/* Circular wrap arrow */}
            <path d="M 24 37 Q 120 70 220 37" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow)" />
            <text x="120" y="55" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#92400e">arr[arr.length - 1] = temp (Wrap around)</text>
          </g>

          <text x="150" y="150" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Left Shift: arr[i] = arr[i+1] requires temp variable to prevent overwriting index 0</text>
        </svg>
      );

    case 'arraylist_shift':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Danger / Buggy Forward Loop (Left) */}
          <g transform="translate(15, 15)">
            <rect x="0" y="0" width="130" height="98" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
            <text x="65" y="16" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#991b1b">⚠️ THE FORWARD REMOVAL BUG</text>
            <text x="65" y="26" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fill="#b91c1c">for(int i=0; i&lt;list.size(); i++)</text>
            
            <rect x="10" y="32" width="110" height="20" rx="2" fill="#ffffff" stroke="#fca5a5" />
            <text x="65" y="44" fontSize="4.5" textAnchor="middle" fill="#991b1b">Index 1 removed ➔ Elements shift left!</text>
            
            <rect x="10" y="56" width="110" height="34" rx="2" fill="#fee2e2" />
            <text x="65" y="68" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#7f1d1d">i increments to 2:</text>
            <text x="65" y="78" fontSize="4.5" textAnchor="middle" fill="#991b1b">Consecutive match at index 1 is</text>
            <text x="65" y="86" fontSize="5" fontWeight="black" textAnchor="middle" fill="#dc2626">SKIPPED COMPLETELY!</text>
          </g>

          {/* Safe Backward Loop (Right) */}
          <g transform="translate(155, 15)">
            <rect x="0" y="0" width="130" height="98" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="65" y="16" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#14532d">✅ SAFE BACKWARD LOOP</text>
            <text x="65" y="26" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fill="#15803d">for(int i=list.size()-1; i&gt;=0; i--)</text>
            
            <rect x="10" y="32" width="110" height="20" rx="2" fill="#ffffff" stroke="#86efac" />
            <text x="65" y="44" fontSize="4.5" textAnchor="middle" fill="#166534">Removes from right to left</text>
            
            <rect x="10" y="56" width="110" height="34" rx="2" fill="#dcfce7" />
            <text x="65" y="68" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#14532d">Shifts only affect higher indices</text>
            <text x="65" y="78" fontSize="4.5" textAnchor="middle" fill="#15803d">Indices &lt; i remain undisturbed</text>
            <text x="65" y="86" fontSize="5" fontWeight="black" textAnchor="middle" fill="#15803d">100% RELIABLE REMOVAL</text>
          </g>

          <text x="150" y="148" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">ArrayList Concurrent Deletion: Always Traverse Backwards in Removal Loops</text>
        </svg>
      );

    case 'matrix_grid':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Matrix Dimension Labels */}
          <text x="150" y="16" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">
            2D Array Coordinate System: mat[row][col]
          </text>

          {/* Grid Rows Indicator */}
          <g transform="translate(15, 25)">
            <text x="10" y="15" fontSize="5" fontWeight="bold" fill="#2563eb">mat.length</text>
            <text x="10" y="24" fontSize="4.5" fill="#64748b">(Rows = 3)</text>
            <path d="M 20 30 L 20 85" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />
          </g>

          {/* Grid Cols Indicator */}
          <g transform="translate(60, 20)">
            <text x="90" y="8" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#16a34a">mat[0].length (Cols = 4)</text>
            <path d="M 20 12 L 160 12" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrow)" />
          </g>

          {/* 3x4 Matrix */}
          <g transform="translate(60, 35)">
            {[0, 1, 2].map(r => (
              <g key={r}>
                {[0, 1, 2, 3].map(c => (
                  <g key={c} transform={`translate(${c * 42}, ${r * 24})`}>
                    <rect x="0" y="0" width="38" height="20" rx="2" fill={r === 1 && c === 2 ? "#fef08a" : "#f8fafc"} stroke={r === 1 && c === 2 ? "#ca8a04" : "#cbd5e1"} strokeWidth={r === 1 && c === 2 ? "2" : "1"} />
                    <text x="19" y="13" fontSize="4.5" fontFamily="monospace" fontWeight={r === 1 && c === 2 ? "bold" : "normal"} textAnchor="middle" fill={r === 1 && c === 2 ? "#854d0e" : "#334155"}>
                      {r === 1 && c === 2 ? "[1][2]" : `[${r}][${c}]`}
                    </text>
                  </g>
                ))}
              </g>
            ))}
          </g>

          {/* Row-Major vs Column-Major Explanation */}
          <g transform="translate(30, 115)">
            <rect x="0" y="0" width="115" height="22" rx="3" fill="#eff6ff" stroke="#3b82f6" />
            <text x="57" y="10" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#1e40af">Row-Major (Default)</text>
            <text x="57" y="18" fontSize="4" textAnchor="middle" fill="#3b82f6">Rows outer, cols inner (➔ across)</text>
          </g>

          <g transform="translate(155, 115)">
            <rect x="0" y="0" width="115" height="22" rx="3" fill="#f0fdf4" stroke="#16a34a" />
            <text x="57" y="10" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#14532d">Column-Major</text>
            <text x="57" y="18" fontSize="4" textAnchor="middle" fill="#16a34a">Cols outer, rows inner (⬇ down)</text>
          </g>

          <text x="150" y="150" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Row-Major (Row by Row) vs. Column-Major (Column by Column) Traversal</text>
        </svg>
      );

    case 'polymorphic_dispatch':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Class Hierarchy (Left) */}
          <g transform="translate(15, 15)">
            <rect x="0" y="0" width="110" height="40" rx="3" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="55" y="16" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#1e40af">Superclass: Animal</text>
            <text x="55" y="28" fontSize="5" fontFamily="monospace" textAnchor="middle" fill="#2563eb">public void speak()</text>

            <path d="M 55 58 L 55 42" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="65" y="52" fontSize="4.5" fontStyle="italic" fill="#64748b">extends</text>

            <rect x="0" y="60" width="110" height="40" rx="3" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <text x="55" y="75" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#14532d">Subclass: Dog</text>
            <text x="55" y="87" fontSize="5" fontFamily="monospace" textAnchor="middle" fill="#15803d">@Override speak()</text>
          </g>

          {/* Invocation Statement */}
          <g transform="translate(140, 15)">
            <rect x="0" y="0" width="145" height="30" rx="3" fill="#0f172a" />
            <text x="72" y="18" fontSize="5.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle" fill="#38bdf8">
              Animal a = new Dog();
            </text>
            <text x="72" y="26" fontSize="5" fontFamily="monospace" textAnchor="middle" fill="#a5f3fc">
              a.speak();
            </text>

            {/* Compile-Time Check Box */}
            <rect x="0" y="38" width="145" height="32" rx="3" fill="#eff6ff" stroke="#3b82f6" />
            <text x="72" y="49" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#1d4ed8">1. COMPILE-TIME CHECK</text>
            <text x="72" y="58" fontSize="4.5" textAnchor="middle" fill="#1e40af">Compiler checks DECLARED type (Animal):</text>
            <text x="72" y="66" fontSize="4.5" fontStyle="italic" textAnchor="middle" fill="#1e40af">Does Animal have speak()? ➔ YES! Valid.</text>

            {/* Runtime Dynamic Dispatch Box */}
            <rect x="0" y="76" width="145" height="32" rx="3" fill="#dcfce7" stroke="#16a34a" />
            <text x="72" y="87" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#15803d">2. RUNTIME DISPATCH</text>
            <text x="72" y="96" fontSize="4.5" textAnchor="middle" fill="#14532d">JVM checks ACTUAL object on heap (Dog):</text>
            <text x="72" y="104" fontSize="5" fontWeight="black" textAnchor="middle" fill="#15803d">Executes Dog's speak() ➔ Prints "Bark"</text>
          </g>

          <text x="150" y="148" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Polymorphism Rule: Declared Reference Type dictates WHAT; Actual Object Type dictates WHICH</text>
        </svg>
      );

    case 'stack_diagram':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Call Stack Growth (Push) */}
          <g transform="translate(15, 15)">
            <text x="40" y="12" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#2563eb">CALL PHASE (Push)</text>
            <path d="M 40 20 L 40 105" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="28" y="65" fontSize="4.5" fontStyle="italic" transform="rotate(-90, 28, 65)" fill="#2563eb">Stack Growth (LIFO)</text>
          </g>

          {/* The Stack Frames */}
          <g transform="translate(60, 20)">
            {/* Frame 4: Base Case */}
            <rect x="0" y="0" width="180" height="22" rx="3" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
            <text x="90" y="14" fontSize="5.5" fontFamily="monospace" fontWeight="black" textAnchor="middle" fill="#991b1b">
              fact(1) ➔ BASE CASE: Returns 1
            </text>

            {/* Frame 3 */}
            <rect x="0" y="26" width="180" height="22" rx="3" fill="#fef3c7" stroke="#d97706" />
            <text x="90" y="40" fontSize="5" fontFamily="monospace" textAnchor="middle" fill="#92400e">
              fact(2) ➔ 2 * fact(1) = 2 * 1 = 2
            </text>

            {/* Frame 2 */}
            <rect x="0" y="52" width="180" height="22" rx="3" fill="#eff6ff" stroke="#3b82f6" />
            <text x="90" y="66" fontSize="5" fontFamily="monospace" textAnchor="middle" fill="#1e40af">
              fact(3) ➔ 3 * fact(2) = 3 * 2 = 6
            </text>

            {/* Frame 1: Initial Call */}
            <rect x="0" y="78" width="180" height="22" rx="3" fill="#f8fafc" stroke="#64748b" />
            <text x="90" y="92" fontSize="5" fontFamily="monospace" textAnchor="middle" fill="#334155">
              fact(4) ➔ 4 * fact(3) = 4 * 6 = 24
            </text>
          </g>

          {/* Return Phase (Pop & Unwind) */}
          <g transform="translate(255, 15)">
            <text x="20" y="12" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#16a34a">RETURN (Pop)</text>
            <path d="M 20 105 L 20 20" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrow)" />
          </g>
          <text x="150" y="148" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Recursive Call Stack Execution: Frames Push downward until Base Case, then Pop & Unwind upward</text>
        </svg>
      );

    // =========================================================================
    // AP MICROECONOMICS & MACROECONOMICS (11 DIAGRAMS)
    // =========================================================================
    case 'ppc_frontier_graph':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="45" y1="20" x2="45" y2="135" stroke="#475569" strokeWidth="2" />
          <line x1="45" y1="135" x2="280" y2="135" stroke="#475569" strokeWidth="2" />
          <text x="35" y="25" fontSize="6" fontWeight="bold" textAnchor="end" fill="#1e293b">Capital Goods</text>
          <text x="275" y="146" fontSize="6" fontWeight="bold" textAnchor="end" fill="#1e293b">Consumer Goods</text>

          {/* Original PPC Curve (Concave to origin: Increasing Opportunity Cost) */}
          <path d="M 45 35 Q 140 45 220 135" fill="none" stroke="#2563eb" strokeWidth="2.5" />
          <text x="225" y="128" fontSize="5.5" fontWeight="bold" fill="#2563eb">PPC₁</text>

          {/* Outward Shift PPC Curve (Economic Growth) */}
          <path d="M 45 25 Q 165 32 255 135" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="260" y="128" fontSize="5.5" fontWeight="bold" fill="#16a34a">PPC₂ (Growth)</text>

          {/* Point A (On curve: Efficient) */}
          <circle cx="120" cy="58" r="3.5" fill="#2563eb" />
          <text x="128" y="55" fontSize="5.5" fontWeight="black" fill="#1e40af">A (Efficient)</text>

          {/* Point B (Inside curve: Inefficient) */}
          <circle cx="85" cy="95" r="3.5" fill="#dc2626" />
          <text x="92" y="93" fontSize="5.5" fontWeight="black" fill="#dc2626">B (Inefficient / Unemployment)</text>

          {/* Point C (Outside curve: Unattainable) */}
          <circle cx="215" cy="45" r="3.5" fill="#7c3aed" />
          <text x="222" y="43" fontSize="5.5" fontWeight="black" fill="#7c3aed">C (Unattainable now)</text>

          {/* Economic Growth arrow */}
          <path d="M 140 50 Q 160 45 175 42" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <text x="150" y="152" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Production Possibilities Curve: Scarcity, Trade-offs & Economic Growth</text>
        </svg>
      );

    case 'supply_demand_graph':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="45" y1="15" x2="45" y2="135" stroke="#475569" strokeWidth="2" />
          <line x1="45" y1="135" x2="275" y2="135" stroke="#475569" strokeWidth="2" />
          <text x="38" y="20" fontSize="6" fontWeight="bold" textAnchor="end" fill="#1e293b">Price ($)</text>
          <text x="270" y="146" fontSize="6" fontWeight="bold" textAnchor="end" fill="#1e293b">Quantity (Q)</text>

          {/* Demand and Supply Lines */}
          <line x1="60" y1="25" x2="250" y2="125" stroke="#dc2626" strokeWidth="2" />
          <text x="253" y="128" fontSize="6" fontWeight="black" fill="#dc2626">D</text>

          <line x1="60" y1="125" x2="250" y2="25" stroke="#2563eb" strokeWidth="2" />
          <text x="253" y="25" fontSize="6" fontWeight="black" fill="#2563eb">S</text>

          {/* Consumer Surplus Polygon (Top Green) */}
          <polygon points="60,25 155,75 60,75" fill="#dcfce7" opacity="0.7" />
          <text x="80" y="55" fontSize="5.5" fontWeight="bold" fill="#14532d">CS</text>

          {/* Producer Surplus Polygon (Bottom Blue) */}
          <polygon points="60,125 155,75 60,75" fill="#dbeafe" opacity="0.7" />
          <text x="80" y="98" fontSize="5.5" fontWeight="bold" fill="#1e40af">PS</text>

          {/* Tax Wedge and Deadweight Loss Triangle */}
          <line x1="125" y1="59" x2="125" y2="91" stroke="#d97706" strokeWidth="2" />
          <polygon points="125,59 155,75 125,91" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
          <text x="135" y="77" fontSize="5" fontWeight="black" fill="#991b1b">DWL</text>

          {/* Tax Revenue Box */}
          <rect x="60" y="59" width="65" height="32" fill="#fef3c7" opacity="0.5" stroke="#d97706" strokeDasharray="2 2" />
          <text x="85" y="77" fontSize="5" fontWeight="bold" fill="#92400e">Tax Rev</text>

          {/* Price & Quantity Projections */}
          <line x1="45" y1="59" x2="125" y2="59" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="40" y="62" fontSize="5" textAnchor="end" fill="#92400e">Pc</text>
          <line x1="45" y1="75" x2="155" y2="75" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="40" y="78" fontSize="5" textAnchor="end" fill="#475569">Pe</text>
          <line x1="45" y1="91" x2="125" y2="91" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="40" y="94" fontSize="5" textAnchor="end" fill="#92400e">Pp</text>

          <text x="150" y="152" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Market Equilibrium: Consumer Surplus, Producer Surplus & Tax Deadweight Loss</text>
        </svg>
      );

    case 'side_by_side_econ':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Left Graph: Industry (Market) */}
          <g transform="translate(15, 15)">
            <line x1="25" y1="10" x2="25" y2="105" stroke="#475569" strokeWidth="1.5" />
            <line x1="25" y1="105" x2="115" y2="105" stroke="#475569" strokeWidth="1.5" />
            <text x="65" y="8" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#1e293b">1. INDUSTRY (MARKET)</text>
            
            <line x1="35" y1="20" x2="105" y2="95" stroke="#dc2626" strokeWidth="1.5" />
            <text x="108" y="97" fontSize="5" fontWeight="bold" fill="#dc2626">D</text>
            <line x1="35" y1="95" x2="105" y2="20" stroke="#2563eb" strokeWidth="1.5" />
            <text x="108" y="22" fontSize="5" fontWeight="bold" fill="#2563eb">S</text>
            
            <circle cx="70" cy="57" r="3" fill="#0f172a" />
            <line x1="25" y1="57" x2="70" y2="57" stroke="#94a3b8" strokeDasharray="2 2" />
            <text x="20" y="60" fontSize="5" textAnchor="end" fill="#0f172a">Pe</text>
            <line x1="70" y1="57" x2="70" y2="105" stroke="#94a3b8" strokeDasharray="2 2" />
            <text x="70" y="113" fontSize="5" textAnchor="middle" fill="#0f172a">Qe</text>
          </g>

          {/* Crossing Horizontal Price Link Line */}
          <line x1="85" y1="72" x2="165" y2="72" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="135" y="68" fontSize="4.5" fontWeight="bold" fill="#7c3aed">Price Taker ➔</text>

          {/* Right Graph: Firm (Mr. DARP) */}
          <g transform="translate(160, 15)">
            <line x1="25" y1="10" x2="25" y2="105" stroke="#475569" strokeWidth="1.5" />
            <line x1="25" y1="105" x2="120" y2="105" stroke="#475569" strokeWidth="1.5" />
            <text x="70" y="8" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#1e293b">2. FIRM (PRICE TAKER)</text>

            {/* Horizontal Demand line (Mr. DARP) */}
            <line x1="25" y1="57" x2="115" y2="57" stroke="#7c3aed" strokeWidth="2" />
            <text x="117" y="60" fontSize="4.5" fontWeight="black" fill="#7c3aed">P=MR=AR=D</text>

            {/* MC Checkmark */}
            <path d="M 35 75 Q 50 85 55 75 L 85 20" fill="none" stroke="#dc2626" strokeWidth="2" />
            <text x="88" y="22" fontSize="5" fontWeight="bold" fill="#dc2626">MC</text>

            {/* ATC U-shape curve intersecting MC at minimum */}
            <path d="M 35 45 Q 68 62 105 45" fill="none" stroke="#2563eb" strokeWidth="2" />
            <text x="108" y="47" fontSize="5" fontWeight="bold" fill="#2563eb">ATC</text>

            {/* Equilibrium dot at MR = MC = min ATC */}
            <circle cx="68" cy="57" r="3" fill="#16a34a" />
            <line x1="68" y1="57" x2="68" y2="105" stroke="#94a3b8" strokeDasharray="2 2" />
            <text x="68" y="113" fontSize="5" textAnchor="middle" fill="#0f172a">qe</text>
          </g>

          <text x="150" y="152" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Perfect Competition: Industry Sets Price ➔ Firm Faces Perfectly Elastic "Mr. DARP"</text>
        </svg>
      );

    case 'monopoly_graph':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="45" y1="15" x2="45" y2="135" stroke="#475569" strokeWidth="2" />
          <line x1="45" y1="135" x2="275" y2="135" stroke="#475569" strokeWidth="2" />
          <text x="38" y="20" fontSize="6" fontWeight="bold" textAnchor="end" fill="#1e293b">Price ($)</text>
          <text x="270" y="146" fontSize="6" fontWeight="bold" textAnchor="end" fill="#1e293b">Quantity (Q)</text>

          {/* Demand curve */}
          <line x1="60" y1="20" x2="250" y2="125" stroke="#2563eb" strokeWidth="2" />
          <text x="253" y="128" fontSize="6" fontWeight="black" fill="#2563eb">D = P</text>

          {/* MR curve (steeper, below Demand) */}
          <line x1="60" y1="20" x2="160" y2="135" stroke="#7c3aed" strokeWidth="2" />
          <text x="165" y="132" fontSize="6" fontWeight="black" fill="#7c3aed">MR</text>

          {/* MC curve */}
          <path d="M 60 110 Q 90 100 110 85 L 180 25" fill="none" stroke="#dc2626" strokeWidth="2" />
          <text x="183" y="27" fontSize="6" fontWeight="bold" fill="#dc2626">MC</text>

          {/* ATC curve */}
          <path d="M 65 65 Q 115 80 180 75" fill="none" stroke="#059669" strokeWidth="1.5" />
          <text x="185" y="78" fontSize="5" fontWeight="bold" fill="#059669">ATC</text>

          {/* Profit Maximizing Qm where MR = MC (intersection at x=110, y=85) */}
          <circle cx="110" cy="85" r="3" fill="#7c3aed" />
          <line x1="110" y1="85" x2="110" y2="135" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="110" y="145" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">Qm</text>

          {/* Project UP to Demand curve for Monopoly Price Pm (x=110, y=47) */}
          <line x1="110" y1="85" x2="110" y2="47" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="110" cy="47" r="3" fill="#dc2626" />
          <line x1="45" y1="47" x2="110" y2="47" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="40" y="50" fontSize="5.5" fontWeight="bold" textAnchor="end" fill="#dc2626">Pm</text>

          {/* ATC at Qm (x=110, y=74) */}
          <line x1="45" y1="74" x2="110" y2="74" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="40" y="77" fontSize="5" textAnchor="end" fill="#059669">ATC</text>

          {/* Economic Profit Box */}
          <rect x="45" y="47" width="65" height="27" fill="#dcfce7" opacity="0.6" stroke="#16a34a" strokeDasharray="2 2" />
          <text x="77" y="63" fontSize="5.5" fontWeight="black" fill="#14532d">PROFIT</text>

          {/* Deadweight Loss Triangle */}
          <polygon points="110,47 150,70 110,85" fill="#fee2e2" opacity="0.7" stroke="#dc2626" />
          <text x="122" y="68" fontSize="4.5" fontWeight="bold" fill="#991b1b">DWL</text>

          <text x="150" y="152" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Monopoly: MR &lt; Demand ➔ Output at MR = MC ➔ Price Set on Demand Curve</text>
        </svg>
      );

    case 'factor_market_graph':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Competitive Labor Market (Left) */}
          <g transform="translate(15, 15)">
            <line x1="25" y1="10" x2="25" y2="105" stroke="#475569" strokeWidth="1.5" />
            <line x1="25" y1="105" x2="115" y2="105" stroke="#475569" strokeWidth="1.5" />
            <text x="65" y="8" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#1e293b">1. COMPETITIVE LABOR</text>

            <line x1="30" y1="25" x2="110" y2="95" stroke="#2563eb" strokeWidth="2" />
            <text x="112" y="98" fontSize="4.5" fontWeight="bold" fill="#2563eb">DL = MRP</text>

            <line x1="25" y1="60" x2="115" y2="60" stroke="#16a34a" strokeWidth="2" />
            <text x="117" y="63" fontSize="4.5" fontWeight="bold" fill="#16a34a">SL = MFC = Wc</text>

            <circle cx="70" cy="60" r="3" fill="#0f172a" />
            <line x1="70" y1="60" x2="70" y2="105" stroke="#94a3b8" strokeDasharray="2 2" />
            <text x="70" y="113" fontSize="5" textAnchor="middle" fill="#0f172a">Qc (MRP=MFC)</text>
          </g>

          {/* Monopsony Labor Market (Right) */}
          <g transform="translate(160, 15)">
            <line x1="25" y1="10" x2="25" y2="105" stroke="#475569" strokeWidth="1.5" />
            <line x1="25" y1="105" x2="120" y2="105" stroke="#475569" strokeWidth="1.5" />
            <text x="70" y="8" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#1e293b">2. MONOPSONY (ONE BUYER)</text>

            {/* MRP curve */}
            <line x1="30" y1="25" x2="115" y2="95" stroke="#2563eb" strokeWidth="2" />
            <text x="117" y="98" fontSize="4.5" fontWeight="bold" fill="#2563eb">MRP</text>

            {/* Supply of Labor curve */}
            <line x1="30" y1="90" x2="110" y2="40" stroke="#16a34a" strokeWidth="2" />
            <text x="112" y="42" fontSize="4.5" fontWeight="bold" fill="#16a34a">SL</text>

            {/* MFC curve (steeper than SL) */}
            <line x1="30" y1="90" x2="80" y2="20" stroke="#dc2626" strokeWidth="2" />
            <text x="82" y="22" fontSize="4.5" fontWeight="bold" fill="#dc2626">MFC</text>

            {/* Intersection of MRP and MFC at Qm */}
            <circle cx="58" cy="50" r="2.5" fill="#dc2626" />
            <line x1="58" y1="50" x2="58" y2="105" stroke="#94a3b8" strokeDasharray="2 2" />
            <text x="58" y="113" fontSize="4.5" textAnchor="middle" fill="#0f172a">Qm</text>

            {/* Wage paid Wm read down off SL */}
            <circle cx="58" cy="72" r="2.5" fill="#16a34a" />
            <line x1="25" y1="72" x2="58" y2="72" stroke="#94a3b8" strokeDasharray="2 2" />
            <text x="20" y="75" fontSize="4.5" textAnchor="end" fill="#16a34a">Wm</text>
          </g>

          <text x="150" y="152" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Factor Markets: Competitive Hiring (MRP = MFC) vs. Monopsony Wage Suppression</text>
        </svg>
      );

    case 'externality_graph':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="45" y1="15" x2="45" y2="135" stroke="#475569" strokeWidth="2" />
          <line x1="45" y1="135" x2="275" y2="135" stroke="#475569" strokeWidth="2" />
          <text x="38" y="20" fontSize="6" fontWeight="bold" textAnchor="end" fill="#1e293b">Price ($)</text>
          <text x="270" y="146" fontSize="6" fontWeight="bold" textAnchor="end" fill="#1e293b">Quantity (Q)</text>

          {/* MSB = MPB curve */}
          <line x1="60" y1="25" x2="250" y2="125" stroke="#2563eb" strokeWidth="2" />
          <text x="253" y="128" fontSize="5.5" fontWeight="bold" fill="#2563eb">MSB = MPB</text>

          {/* Private Cost (MPC) */}
          <line x1="60" y1="125" x2="230" y2="40" stroke="#059669" strokeWidth="2" />
          <text x="233" y="42" fontSize="5" fontWeight="bold" fill="#059669">MPC (Supply)</text>

          {/* Social Cost (MSC = MPC + External Cost, shifted up/left) */}
          <line x1="60" y1="85" x2="190" y2="20" stroke="#dc2626" strokeWidth="2" />
          <text x="193" y="22" fontSize="5.5" fontWeight="black" fill="#dc2626">MSC (Social Cost)</text>

          {/* Free market outcome Qmkt (MPC = MPB) */}
          <circle cx="165" cy="80" r="3" fill="#059669" />
          <line x1="165" y1="80" x2="165" y2="135" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="165" y="145" fontSize="5" textAnchor="middle" fill="#059669">Qmkt (Overproduction)</text>

          {/* Socially optimal outcome Qopt (MSC = MSB) */}
          <circle cx="120" cy="56" r="3" fill="#dc2626" />
          <line x1="120" y1="56" x2="120" y2="135" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="120" y="145" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#dc2626">Qopt</text>

          {/* Deadweight Loss Triangle pointing to Qopt */}
          <polygon points="120,56 165,80 165,33" fill="#fee2e2" opacity="0.8" stroke="#dc2626" strokeWidth="1" />
          <text x="150" y="58" fontSize="5" fontWeight="black" fill="#991b1b">DWL</text>

          {/* Per unit Pigouvian Tax arrow */}
          <path d="M 80 95 L 80 75" stroke="#d97706" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="85" y="86" fontSize="4.5" fontWeight="bold" fill="#92400e">Tax = Ext. Cost</text>

          <text x="150" y="152" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Negative Externality: Free Market Overproduces ➔ Pigouvian Tax Restores Social Optimum</text>
        </svg>
      );

    case 'business_cycle_chart':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="35" y1="20" x2="35" y2="135" stroke="#475569" strokeWidth="2" />
          <line x1="35" y1="135" x2="285" y2="135" stroke="#475569" strokeWidth="2" />
          <text x="25" y="25" fontSize="5.5" fontWeight="bold" textAnchor="end" fill="#1e293b">Real GDP</text>
          <text x="280" y="146" fontSize="5.5" fontWeight="bold" textAnchor="end" fill="#1e293b">Time</text>

          {/* Long-Run Trend Line (Potential GDP) */}
          <line x1="45" y1="110" x2="275" y2="35" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 3" />
          <text x="275" y="32" fontSize="5" fontWeight="black" textAnchor="end" fill="#15803d">Potential GDP Trendline</text>

          {/* Business Cycle Waveform */}
          <path d="M 45 110 Q 90 20 135 75 Q 180 130 225 60 Q 255 10 275 45" fill="none" stroke="#2563eb" strokeWidth="2.5" />

          {/* Wave Annotations */}
          {/* Peak */}
          <circle cx="90" cy="38" r="3" fill="#dc2626" />
          <text x="90" y="28" fontSize="5" fontWeight="black" textAnchor="middle" fill="#dc2626">PEAK (Inflation Gap)</text>

          {/* Contraction */}
          <text x="120" y="65" fontSize="4.5" fontStyle="italic" fill="#64748b">Contraction ➔</text>

          {/* Trough */}
          <circle cx="180" cy="118" r="3" fill="#2563eb" />
          <text x="180" y="128" fontSize="5" fontWeight="black" textAnchor="middle" fill="#1d4ed8">TROUGH (Recession Gap)</text>

          {/* Recovery / Expansion */}
          <text x="220" y="90" fontSize="4.5" fontStyle="italic" fill="#15803d">Expansion ➔</text>

          <text x="150" y="152" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Macroeconomic Business Cycle: Peaks, Recessions, Troughs & Potential Output</text>
        </svg>
      );

    case 'ad_as_graph':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="45" y1="15" x2="45" y2="135" stroke="#475569" strokeWidth="2" />
          <line x1="45" y1="135" x2="275" y2="135" stroke="#475569" strokeWidth="2" />
          <text x="38" y="20" fontSize="6" fontWeight="bold" textAnchor="end" fill="#1e293b">Price Level (PL)</text>
          <text x="270" y="146" fontSize="6" fontWeight="bold" textAnchor="end" fill="#1e293b">Real GDP (Y)</text>

          {/* LRAS Vertical Line at Yf */}
          <line x1="170" y1="20" x2="170" y2="135" stroke="#16a34a" strokeWidth="2" />
          <text x="170" y="15" fontSize="6" fontWeight="black" textAnchor="middle" fill="#15803d">LRAS</text>
          <text x="170" y="145" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#15803d">Yf (Full Emp)</text>

          {/* Aggregate Demand (AD) */}
          <line x1="60" y1="30" x2="240" y2="125" stroke="#2563eb" strokeWidth="2" />
          <text x="243" y="128" fontSize="5.5" fontWeight="black" fill="#2563eb">AD</text>

          {/* Short-Run Aggregate Supply 1 (SRAS1) */}
          <line x1="60" y1="120" x2="180" y2="35" stroke="#dc2626" strokeWidth="2" />
          <text x="183" y="37" fontSize="5.5" fontWeight="bold" fill="#dc2626">SRAS₁</text>

          {/* Short-run Equilibrium E1 (Recessionary Gap) */}
          <circle cx="120" cy="78" r="3" fill="#0f172a" />
          <line x1="45" y1="78" x2="120" y2="78" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="40" y="81" fontSize="5" textAnchor="end" fill="#0f172a">PL₁</text>
          <line x1="120" y1="78" x2="120" y2="135" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="120" y="145" fontSize="5" textAnchor="middle" fill="#0f172a">Y₁</text>

          {/* Recessionary Gap Shaded Area between Y1 and Yf */}
          <rect x="120" y="128" width="50" height="7" fill="#fee2e2" opacity="0.8" />
          <text x="145" y="125" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#dc2626">Recession Gap</text>

          {/* Self-Correction Arrow: SRAS shifts right as wages drop */}
          <path d="M 130 55 L 160 55" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="145" y="50" fontSize="4" fontWeight="bold" fill="#15803d">Wages fall ➔ SRAS₂</text>

          <text x="150" y="152" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">AD-AS Model: Recessionary Gap (Y₁ &lt; Yf) and Long-Run Wage Self-Correction</text>
        </svg>
      );

    case 'money_market_graph':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="50" y1="15" x2="50" y2="135" stroke="#475569" strokeWidth="2" />
          <line x1="50" y1="135" x2="275" y2="135" stroke="#475569" strokeWidth="2" />
          <text x="42" y="20" fontSize="5.5" fontWeight="bold" textAnchor="end" fill="#1e293b">Nominal Rate (i%)</text>
          <text x="270" y="146" fontSize="5.5" fontWeight="bold" textAnchor="end" fill="#1e293b">Quantity of Money (M)</text>

          {/* Money Demand (MD) */}
          <line x1="65" y1="30" x2="245" y2="125" stroke="#2563eb" strokeWidth="2" />
          <text x="248" y="128" fontSize="6" fontWeight="black" fill="#2563eb">MD</text>

          {/* Money Supply 1 (MS1 - Vertical) */}
          <line x1="120" y1="20" x2="120" y2="135" stroke="#16a34a" strokeWidth="2" />
          <text x="120" y="15" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#16a34a">MS₁</text>

          {/* Money Supply 2 (MS2 - Expansionary right shift) */}
          <line x1="175" y1="20" x2="175" y2="135" stroke="#059669" strokeWidth="2" strokeDasharray="3 2" />
          <text x="175" y="15" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#059669">MS₂</text>

          {/* Shift Arrow */}
          <path d="M 125 40 L 170 40" stroke="#059669" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="147" y="35" fontSize="4.5" fontWeight="bold" fill="#059669">Fed buys bonds</text>

          {/* Equilibrium i1 and i2 */}
          <circle cx="120" cy="59" r="3" fill="#16a34a" />
          <line x1="50" y1="59" x2="120" y2="59" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="45" y="62" fontSize="5" textAnchor="end" fill="#16a34a">i₁</text>

          <circle cx="175" cy="88" r="3" fill="#059669" />
          <line x1="50" y1="88" x2="175" y2="88" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="45" y="91" fontSize="5" textAnchor="end" fill="#059669">i₂</text>

          {/* Downward arrow on interest rate */}
          <path d="M 35 65 L 35 85" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <text x="150" y="152" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Money Market: Open Market Operations Shift MS ➔ Dictates Nominal Interest Rates</text>
        </svg>
      );

    case 'phillips_curve_graph':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="50" y1="15" x2="50" y2="135" stroke="#475569" strokeWidth="2" />
          <line x1="50" y1="135" x2="275" y2="135" stroke="#475569" strokeWidth="2" />
          <text x="42" y="20" fontSize="5.5" fontWeight="bold" textAnchor="end" fill="#1e293b">Inflation Rate (π%)</text>
          <text x="270" y="146" fontSize="5.5" fontWeight="bold" textAnchor="end" fill="#1e293b">Unemployment (u%)</text>

          {/* LRPC Vertical Line at Natural Rate of Unemployment (NRU) */}
          <line x1="150" y1="20" x2="150" y2="135" stroke="#16a34a" strokeWidth="2" />
          <text x="150" y="15" fontSize="6" fontWeight="black" textAnchor="middle" fill="#15803d">LRPC</text>
          <text x="150" y="145" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#15803d">NRU (e.g. 5%)</text>

          {/* Short-Run Phillips Curve (SRPC1) */}
          <path d="M 70 30 Q 110 90 230 115" fill="none" stroke="#2563eb" strokeWidth="2" />
          <text x="235" y="117" fontSize="5.5" fontWeight="bold" fill="#2563eb">SRPC₁</text>

          {/* Shift Outward (Stagflation / Supply Shock) */}
          <path d="M 90 20 Q 140 75 255 105" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="260" y="105" fontSize="5.5" fontWeight="bold" fill="#dc2626">SRPC₂ (Stagflation)</text>

          {/* Movement along curve vs shift */}
          <circle cx="110" cy="65" r="3" fill="#2563eb" />
          <text x="95" y="60" fontSize="4.5" fontWeight="bold" fill="#2563eb">A (Boom)</text>

          <circle cx="185" cy="100" r="3" fill="#2563eb" />
          <text x="195" y="105" fontSize="4.5" fontWeight="bold" fill="#2563eb">B (Slump)</text>

          {/* Stagflation shift arrow */}
          <path d="M 125 65 L 145 52" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="155" y="50" fontSize="4.5" fontWeight="bold" fill="#dc2626">Supply shock ➔</text>

          <text x="150" y="152" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">Phillips Curve: Short-Run Inflation-Unemployment Trade-off vs. Vertical LRPC</text>
        </svg>
      );

    case 'forex_market_graph':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="50" y1="15" x2="50" y2="135" stroke="#475569" strokeWidth="2" />
          <line x1="50" y1="135" x2="275" y2="135" stroke="#475569" strokeWidth="2" />
          <text x="42" y="20" fontSize="5.5" fontWeight="bold" textAnchor="end" fill="#1e293b">Exchange Rate (€ / $)</text>
          <text x="270" y="146" fontSize="5.5" fontWeight="bold" textAnchor="end" fill="#1e293b">Quantity of USD ($)</text>

          {/* Demand for USD (D1) */}
          <line x1="70" y1="30" x2="220" y2="120" stroke="#2563eb" strokeWidth="2" />
          <text x="223" y="123" fontSize="5" fontWeight="bold" fill="#2563eb">D$₁</text>

          {/* Right shift in Demand for USD (D2) */}
          <line x1="105" y1="30" x2="255" y2="120" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="3 2" />
          <text x="258" y="123" fontSize="5" fontWeight="bold" fill="#1d4ed8">D$₂</text>

          {/* Supply of USD (S$) */}
          <line x1="70" y1="120" x2="220" y2="30" stroke="#16a34a" strokeWidth="2" />
          <text x="223" y="32" fontSize="5" fontWeight="bold" fill="#16a34a">S$</text>

          {/* Appreciation Shift Arrow */}
          <path d="M 145 75 L 180 75" stroke="#1d4ed8" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="162" y="70" fontSize="4.5" fontWeight="bold" fill="#1d4ed8">Capital inflows</text>

          {/* Equilibrium e1 and e2 */}
          <circle cx="145" cy="75" r="3" fill="#0f172a" />
          <line x1="50" y1="75" x2="145" y2="75" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="45" y="78" fontSize="5" textAnchor="end" fill="#0f172a">e₁</text>

          <circle cx="180" cy="54" r="3" fill="#1d4ed8" />
          <line x1="50" y1="54" x2="180" y2="54" stroke="#94a3b8" strokeDasharray="2 2" />
          <text x="45" y="57" fontSize="5" fontWeight="bold" textAnchor="end" fill="#1d4ed8">e₂ (Appreciation)</text>

          <text x="150" y="152" fontSize="7" fontWeight="black" textAnchor="middle" fill="#0f172a">FOREX Market: High Interest Rates Attract Foreign Capital ➔ Currency Appreciates</text>
        </svg>
      );

    // =========================================================================
    // AP WORLD HISTORY: MODERN (11 DIAGRAMS)
    // =========================================================================
    case 'whap_song_bureaucracy':
    case 'imperial_hierarchy':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Title Banner */}
          <rect x="15" y="10" width="270" height="18" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
          <text x="150" y="22" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">Song Dynasty Imperial Examination & Bureaucratic Hierarchy</text>

          {/* Pyramid Tiers */}
          {/* Tier 1: Emperor */}
          <polygon points="150,34 125,56 175,56" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="150" y="48" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#854d0e">Emperor (Son of Heaven)</text>

          {/* Tier 2: Jinshi / Grand Secretariat */}
          <polygon points="125,58 175,58 198,82 102,82" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="150" y="70" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#1e40af">Metropolitan Jinshi Scholars (Highest Imperial Exam)</text>
          <text x="150" y="78" fontSize="4" textAnchor="middle" fill="#1e3a8a">Grand Secretariat & Central Ministries in Kaifeng / Hangzhou</text>

          {/* Tier 3: Provincial & County Magistrates */}
          <polygon points="102,84 198,84 225,110 75,110" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
          <text x="150" y="96" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#3730a3">Scholar-Gentry Class (Local Civil Exams)</text>
          <text x="150" y="104" fontSize="4" textAnchor="middle" fill="#312e81">District Magistrates, Tax Collectors, Canal Overseers</text>

          {/* Tier 4: Agrarian Base */}
          <polygon points="75,112 225,112 255,138 45,138" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
          <text x="150" y="123" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#334155">Agrarian Commoners & Peasant Farmers</text>
          <text x="150" y="132" fontSize="4" textAnchor="middle" fill="#475569">Cultivating Champa Rice; Paying Taxes; Studying Confucian Classics</text>

          {/* Mobility Arrow */}
          <path d="M 268 135 L 268 45" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrow)" />
          <text x="272" y="90" fontSize="4" fontWeight="bold" fill="#16a34a" transform="rotate(90, 272, 90)">Meritocratic Social Mobility</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Neo-Confucian Meritocracy: Civil Service Exams Replaced Hereditary Aristocracy</text>
        </svg>
      );

    case 'whap_monsoon_winds':
    case 'monsoon_map':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Map Landmass Outlines */}
          {/* East Africa */}
          <path d="M 25 35 Q 35 70 30 135 Q 20 140 15 140" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
          <text x="22" y="50" fontSize="4.5" fontWeight="bold" fill="#475569">East Africa</text>
          <text x="22" y="58" fontSize="3.5" fill="#64748b">(Swahili Coast)</text>
          <circle cx="32" cy="100" r="2" fill="#dc2626" />
          <text x="36" y="102" fontSize="3.5" fontWeight="bold" fill="#dc2626">Kilwa</text>

          {/* Arabia */}
          <path d="M 45 25 Q 70 20 85 45 Q 65 60 45 45 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
          <text x="60" y="38" fontSize="4.5" fontWeight="bold" fill="#475569">Arabia</text>
          <circle cx="75" cy="48" r="2" fill="#dc2626" />
          <text x="79" y="50" fontSize="3.5" fontWeight="bold" fill="#dc2626">Hormuz</text>

          {/* India */}
          <polygon points="110,25 155,25 132,85" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
          <text x="132" y="42" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#475569">India</text>
          <circle cx="122" cy="65" r="2" fill="#dc2626" />
          <text x="100" y="67" fontSize="3.5" fontWeight="bold" fill="#dc2626">Calicut</text>

          {/* SE Asia / Malacca */}
          <path d="M 200 40 Q 215 70 220 120" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="215" y="50" fontSize="4.5" fontWeight="bold" fill="#475569">SE Asia</text>
          <circle cx="212" cy="80" r="2" fill="#dc2626" />
          <text x="217" y="82" fontSize="3.5" fontWeight="bold" fill="#dc2626">Malacca</text>

          {/* China */}
          <path d="M 215 20 Q 255 15 275 45" fill="none" stroke="#94a3b8" strokeWidth="1" />
          <text x="245" y="30" fontSize="5" fontWeight="bold" fill="#475569">Song/Ming China</text>

          {/* Summer Monsoon (SW Winds: April - September) */}
          <g stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow)">
            <path d="M 45 120 C 70 100 85 85 115 75" />
            <path d="M 135 80 C 160 85 175 75 205 78" />
          </g>
          <rect x="55" y="122" width="115" height="12" rx="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.5" />
          <text x="112" y="130" fontSize="4" fontWeight="bold" textAnchor="middle" fill="#0369a1">Summer SW Monsoon (Apr–Sep) ➔ Blows Northeast</text>

          {/* Winter Monsoon (NE Winds: Nov - Feb) */}
          <g stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow)">
            <path d="M 200 68 C 170 65 150 72 135 70" />
            <path d="M 115 62 C 85 58 65 80 42 95" />
          </g>
          <rect x="175" y="122" width="115" height="12" rx="3" fill="#f3e8ff" stroke="#9333ea" strokeWidth="0.5" />
          <text x="232" y="130" fontSize="4" fontWeight="bold" textAnchor="middle" fill="#7e22ce">Winter NE Monsoon (Nov–Feb) ➔ Blows Southwest</text>

          {/* Dhow with Lateen Sail Icon */}
          <g transform="translate(155, 92)">
            <path d="M 0 10 Q 15 15 25 10 L 22 14 Q 12 16 2 14 Z" fill="#78350f" />
            <polygon points="12,10 12,0 24,10" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
            <text x="12" y="20" fontSize="3.5" fontWeight="bold" textAnchor="middle" fill="#78350f">Arab Dhow (Lateen Sail)</text>
          </g>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Indian Ocean Monsoon Trade: Predictable Winds Fostered Diasporic Merchant Enclaves</text>
        </svg>
      );

    case 'whap_devshirme_pipeline':
    case 'devshirme_chart':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Stage 1: Recruitment */}
          <rect x="15" y="45" width="60" height="50" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="45" y="58" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#991b1b">1. Devshirme Levy</text>
          <text x="45" y="67" fontSize="3.8" textAnchor="middle" fill="#7f1d1d">Balkan Christian Youths</text>
          <text x="45" y="75" fontSize="3.8" textAnchor="middle" fill="#7f1d1d">Conscripted by Sultan</text>
          <text x="45" y="83" fontSize="3.5" textAnchor="middle" fill="#b91c1c">Converted to Islam</text>

          {/* Arrow to Stage 2 */}
          <path d="M 75 70 L 98 70" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Stage 2: Education & Screening */}
          <rect x="100" y="42" width="68" height="56" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="134" y="55" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#92400e">2. Palace School</text>
          <text x="134" y="64" fontSize="3.8" textAnchor="middle" fill="#78350f">Enderun Academy</text>
          <text x="134" y="73" fontSize="3.5" textAnchor="middle" fill="#78350f">Rigorous Academic,</text>
          <text x="134" y="81" fontSize="3.5" textAnchor="middle" fill="#78350f">Military & Quranic Training</text>
          <text x="134" y="89" fontSize="3.5" textAnchor="middle" fill="#b45309">Tested for Aptitude</text>

          {/* Branch Arrows */}
          <path d="M 168 58 L 195 42" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 168 82 L 195 98" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Branch A: Janissary Corps */}
          <rect x="198" y="20" width="88" height="42" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="242" y="33" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#1e40af">Military: Janissary Corps</text>
          <text x="242" y="42" fontSize="3.8" textAnchor="middle" fill="#1e3a8a">Elite Gunpowder Infantry</text>
          <text x="242" y="50" fontSize="3.5" textAnchor="middle" fill="#1d4ed8">Sultan's Personal Shock Troops</text>
          <text x="242" y="57" fontSize="3.5" textAnchor="middle" fill="#1d4ed8">Salaried & Highly Respected</text>

          {/* Branch B: Imperial Bureaucracy */}
          <rect x="198" y="80" width="88" height="44" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
          <text x="242" y="93" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#166534">Administration: Bureaucracy</text>
          <text x="242" y="102" fontSize="3.8" textAnchor="middle" fill="#14532d">Imperial Scribes & Diplomats</text>
          <text x="242" y="110" fontSize="3.5" textAnchor="middle" fill="#15803d">Provincial Governors (Pashas)</text>
          <text x="242" y="118" fontSize="3.5" textAnchor="middle" fill="#15803d">Grand Viziers (Prime Ministers)</text>

          {/* Bottom Note */}
          <rect x="15" y="132" width="270" height="15" rx="3" fill="#f8fafc" stroke="#cbd5e1" />
          <text x="150" y="142" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#0f172a">Strategic Goal: Eliminated power of hereditary Turkish nobility by staffing state with loyal slave-elites</text>
        </svg>
      );

    case 'whap_triangular_trade':
    case 'trade_loop':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Triangular Loop Layout */}
          {/* Europe (Top Right) */}
          <rect x="195" y="12" width="90" height="34" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="240" y="24" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#1e40af">1. EUROPE</text>
          <text x="240" y="32" fontSize="3.8" textAnchor="middle" fill="#1e3a8a">Manufactured Goods Exporter</text>
          <text x="240" y="40" fontSize="3.5" textAnchor="middle" fill="#3b82f6">Guns, Textiles, Metalware, Rum</text>

          {/* West Africa (Bottom Right) */}
          <rect x="195" y="95" width="90" height="35" rx="4" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
          <text x="240" y="107" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#991b1b">2. WEST AFRICA</text>
          <text x="240" y="115" fontSize="3.8" textAnchor="middle" fill="#7f1d1d">Slave Coast Enclaves</text>
          <text x="240" y="123" fontSize="3.5" textAnchor="middle" fill="#b91c1c">Captured Enslaved Peoples</text>

          {/* Americas & Caribbean (Left) */}
          <rect x="15" y="55" width="95" height="42" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
          <text x="62" y="68" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#166534">3. THE AMERICAS</text>
          <text x="62" y="77" fontSize="3.8" textAnchor="middle" fill="#14532d">Plantations & Silver Mines</text>
          <text x="62" y="85" fontSize="3.5" textAnchor="middle" fill="#15803d">Sugar, Tobacco, Cotton, Coffee</text>
          <text x="62" y="92" fontSize="3.5" textAnchor="middle" fill="#15803d">Potosí Silver Bullion</text>

          {/* Arrows */}
          {/* Leg 1: Europe -> West Africa */}
          <path d="M 245 48 L 245 92" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="250" y="72" fontSize="4" fontWeight="bold" fill="#2563eb">Leg 1: Guns & Goods</text>

          {/* Leg 2: West Africa -> Americas (Middle Passage) */}
          <path d="M 192 110 L 112 85" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <rect x="110" y="100" width="76" height="14" rx="2" fill="#fee2e2" stroke="#dc2626" strokeWidth="0.5" />
          <text x="148" y="108" fontSize="4" fontWeight="bold" textAnchor="middle" fill="#991b1b">THE MIDDLE PASSAGE</text>
          <text x="148" y="113" fontSize="3.2" textAnchor="middle" fill="#7f1d1d">12.5M Enslaved; 15% Mortality</text>

          {/* Leg 3: Americas -> Europe */}
          <path d="M 112 65 L 192 38" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="125" y="42" fontSize="4" fontWeight="bold" fill="#16a34a">Leg 3: Raw Cash Crops & Silver</text>

          {/* Footer Summary */}
          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Transatlantic Triangular Trade: Fueling European Mercantile Capitalism</text>
        </svg>
      );

    case 'atlantic_revolutions_flow':
    case 'domino_timeline':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Root Catalyst */}
          <rect x="10" y="10" width="130" height="22" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
          <text x="75" y="20" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#92400e">Enlightenment Ideals (Locke/Rousseau)</text>
          <text x="75" y="28" fontSize="3.8" textAnchor="middle" fill="#b45309">+ Seven Years War Imperial Debt (1763)</text>

          {/* Step 1: American Revolution */}
          <rect x="10" y="42" width="64" height="42" rx="3" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
          <text x="42" y="53" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#1e40af">1. American (1776)</text>
          <text x="42" y="62" fontSize="3.8" textAnchor="middle" fill="#1e3a8a">Lockean Natural Rights</text>
          <text x="42" y="70" fontSize="3.5" textAnchor="middle" fill="#3b82f6">Dec. of Independence</text>
          <text x="42" y="78" fontSize="3.5" textAnchor="middle" fill="#3b82f6">Constitutional Republic</text>

          {/* Arrow to French */}
          <path d="M 74 62 L 88 62" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Step 2: French Revolution */}
          <rect x="90" y="42" width="64" height="42" rx="3" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.2" />
          <text x="122" y="53" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#991b1b">2. French (1789)</text>
          <text x="122" y="62" fontSize="3.8" textAnchor="middle" fill="#7f1d1d">3 Estates Collapse</text>
          <text x="122" y="70" fontSize="3.5" textAnchor="middle" fill="#b91c1c">Dec. Rights of Man</text>
          <text x="122" y="78" fontSize="3.5" textAnchor="middle" fill="#b91c1c">Reign of Terror / Napoleon</text>

          {/* Arrow to Haitian */}
          <path d="M 154 62 L 168 62" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Step 3: Haitian Revolution */}
          <rect x="170" y="42" width="64" height="42" rx="3" fill="#faf5ff" stroke="#a855f7" strokeWidth="1.2" />
          <text x="202" y="53" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#6b21a8">3. Haitian (1791)</text>
          <text x="202" y="62" fontSize="3.8" textAnchor="middle" fill="#581c87">Toussaint Louverture</text>
          <text x="202" y="70" fontSize="3.5" textAnchor="middle" fill="#7e22ce">Enslaved Labor Revolt</text>
          <text x="202" y="78" fontSize="3.5" textAnchor="middle" fill="#7e22ce">1st Free Black Republic</text>

          {/* Arrow to Latin American */}
          <path d="M 202 85 L 202 96" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Step 4: Latin American Independence */}
          <rect x="135" y="98" width="155" height="34" rx="3" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.2" />
          <text x="212" y="109" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#166534">4. Latin American Independence (1808–1825)</text>
          <text x="212" y="117" fontSize="3.8" textAnchor="middle" fill="#14532d">Simón Bolívar (Jamaica Letter) & José de San Martín</text>
          <text x="212" y="125" fontSize="3.5" textAnchor="middle" fill="#15803d">Creoles ousted Spanish Peninsulares; Social caste hierarchy preserved</text>

          {/* Napoleon Connector */}
          <rect x="10" y="98" width="115" height="34" rx="3" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
          <text x="67" y="109" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#334155">Napoleon Invades Spain (1808)</text>
          <text x="67" y="118" fontSize="3.5" textAnchor="middle" fill="#475569">Power vacuum in Madrid gave</text>
          <text x="67" y="126" fontSize="3.5" textAnchor="middle" fill="#475569">Creoles opportunity to seize control</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Domino Wave of Atlantic Revolutions: Ideology & War Debt Cascading Across Oceans</text>
        </svg>
      );

    case 'meiji_modernization_graph':
    case 'modernization_flow':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Stage 1: Crisis */}
          <rect x="12" y="30" width="56" height="52" rx="3" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
          <text x="40" y="42" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#991b1b">1. Crisis (1853)</text>
          <text x="40" y="52" fontSize="3.8" textAnchor="middle" fill="#7f1d1d">Commodore Perry</text>
          <text x="40" y="60" fontSize="3.5" textAnchor="middle" fill="#7f1d1d">US "Black Ships"</text>
          <text x="40" y="68" fontSize="3.5" textAnchor="middle" fill="#b91c1c">Unequal Treaties</text>
          <text x="40" y="76" fontSize="3.2" textAnchor="middle" fill="#b91c1c">Tokugawa Collapse</text>

          {/* Arrow */}
          <path d="M 68 56 L 80 56" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Stage 2: Restoration */}
          <rect x="82" y="30" width="60" height="52" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
          <text x="112" y="42" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#92400e">2. Meiji Restoration</text>
          <text x="112" y="52" fontSize="3.8" textAnchor="middle" fill="#78350f">Emperor Restored (1868)</text>
          <text x="112" y="60" fontSize="3.5" textAnchor="middle" fill="#78350f">Samurai Class Abolished</text>
          <text x="112" y="68" fontSize="3.5" textAnchor="middle" fill="#b45309">Charter Oath (1868)</text>
          <text x="112" y="76" fontSize="3.2" textAnchor="middle" fill="#b45309">Iwakura Mission to West</text>

          {/* Arrow */}
          <path d="M 142 56 L 154 56" stroke="#d97706" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Stage 3: Industrialization */}
          <rect x="156" y="30" width="62" height="52" rx="3" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.2" />
          <text x="187" y="42" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#3730a3">3. State Capitalism</text>
          <text x="187" y="52" fontSize="3.8" textAnchor="middle" fill="#312e81">Zaibatsu Conglomerates</text>
          <text x="187" y="60" fontSize="3.5" textAnchor="middle" fill="#312e81">(Mitsubishi, Mitsui)</text>
          <text x="187" y="68" fontSize="3.5" textAnchor="middle" fill="#4338ca">Railroads, Telegraphs,</text>
          <text x="187" y="76" fontSize="3.2" textAnchor="middle" fill="#4338ca">Modern Steel Mills</text>

          {/* Arrow */}
          <path d="M 218 56 L 228 56" stroke="#4f46e5" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Stage 4: Military Superpower */}
          <rect x="230" y="30" width="58" height="52" rx="3" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.2" />
          <text x="259" y="42" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#166534">4. Imperial Power</text>
          <text x="259" y="52" fontSize="3.8" textAnchor="middle" fill="#14532d">Universal Conscription</text>
          <text x="259" y="60" fontSize="3.5" textAnchor="middle" fill="#14532d">Modern Steam Navy</text>
          <text x="259" y="68" fontSize="3.5" textAnchor="middle" fill="#15803d">Defeated China (1895)</text>
          <text x="259" y="76" fontSize="3.2" textAnchor="middle" fill="#15803d">Defeated Russia (1905)</text>

          {/* Contrast Box */}
          <rect x="12" y="96" width="276" height="34" rx="3" fill="#f8fafc" stroke="#cbd5e1" />
          <text x="150" y="108" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">WHAP Contrast: Meiji Japan vs. Qing Dynasty China</text>
          <text x="150" y="117" fontSize="3.8" textAnchor="middle" fill="#475569">Japan embraced radical Western modernization to preserve sovereignty and became an imperial colonizer.</text>
          <text x="150" y="125" fontSize="3.8" textAnchor="middle" fill="#475569">Qing China resisted modernization, resulting in Opium Wars, Spheres of Influence, and dynasty collapse (1911).</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Meiji Restoration: "Enrich the Country, Strengthen the Armed Forces" (Fukoku Kyohei)</text>
        </svg>
      );

    case 'total_war_concept':
    case 'total_war_diagram':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Central Hub */}
          <circle cx="150" cy="72" r="32" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          <text x="150" y="66" fontSize="5.5" fontWeight="black" textAnchor="middle" fill="#f8fafc">TOTAL WAR</text>
          <text x="150" y="75" fontSize="3.8" textAnchor="middle" fill="#94a3b8">Complete State</text>
          <text x="150" y="82" fontSize="3.8" textAnchor="middle" fill="#94a3b8">Mobilization</text>

          {/* Node 1: Conscription (Top Left) */}
          <rect x="15" y="15" width="85" height="30" rx="3" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
          <text x="57" y="27" fontSize="4.8" fontWeight="bold" textAnchor="middle" fill="#1e40af">1. Universal Conscription</text>
          <text x="57" y="35" fontSize="3.5" textAnchor="middle" fill="#1e3a8a">Millions drafted; Colonial troops</text>
          <text x="57" y="41" fontSize="3.5" textAnchor="middle" fill="#3b82f6">(1M+ Indians, Senegalese Tirailleurs)</text>
          <line x1="90" y1="42" x2="125" y2="58" stroke="#2563eb" strokeWidth="1.5" />

          {/* Node 2: Homefront & Female Labor (Top Right) */}
          <rect x="200" y="15" width="85" height="30" rx="3" fill="#fdf4ff" stroke="#c026d3" strokeWidth="1.2" />
          <text x="242" y="27" fontSize="4.8" fontWeight="bold" textAnchor="middle" fill="#86198f">2. Homefront Industry</text>
          <text x="242" y="35" fontSize="3.5" textAnchor="middle" fill="#701a75">Factories converted to munitions</text>
          <text x="242" y="41" fontSize="3.5" textAnchor="middle" fill="#a21caf">Women in workforce ("Rosie the Riveter")</text>
          <line x1="210" y1="42" x2="175" y2="58" stroke="#c026d3" strokeWidth="1.5" />

          {/* Node 3: Propaganda & Censorship (Bottom Left) */}
          <rect x="15" y="100" width="85" height="30" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
          <text x="57" y="112" fontSize="4.8" fontWeight="bold" textAnchor="middle" fill="#92400e">3. Propaganda & Censorship</text>
          <text x="57" y="120" fontSize="3.5" textAnchor="middle" fill="#78350f">State media demonizes enemy</text>
          <text x="57" y="126" fontSize="3.5" textAnchor="middle" fill="#b45309">Food rationing & War bond drives</text>
          <line x1="90" y1="102" x2="125" y2="86" stroke="#d97706" strokeWidth="1.5" />

          {/* Node 4: Targeting Civilians (Bottom Right) */}
          <rect x="200" y="100" width="85" height="30" rx="3" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.2" />
          <text x="242" y="112" fontSize="4.8" fontWeight="bold" textAnchor="middle" fill="#991b1b">4. Targeting Civilians</text>
          <text x="242" y="120" fontSize="3.5" textAnchor="middle" fill="#7f1d1d">Starvation blockades & Firebombing</text>
          <text x="242" y="126" fontSize="3.5" textAnchor="middle" fill="#b91c1c">Dresden, Tokyo, Atomic Bomb</text>
          <line x1="210" y1="102" x2="175" y2="86" stroke="#dc2626" strokeWidth="1.5" />

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Total War Paradigm: Civilian Infrastructure and Workers Become Legitimate Military Targets</text>
        </svg>
      );

    case 'cold_war_bipolar_world':
    case 'geopolitical_map':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Western Capitalist Bloc */}
          <rect x="12" y="15" width="88" height="65" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="56" y="28" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#1e40af">FIRST WORLD (USA)</text>
          <text x="56" y="38" fontSize="4" fontWeight="bold" textAnchor="middle" fill="#1d4ed8">Capitalism & Democracy</text>
          <text x="56" y="47" fontSize="3.5" textAnchor="middle" fill="#1e3a8a">• NATO Military Alliance</text>
          <text x="56" y="55" fontSize="3.5" textAnchor="middle" fill="#1e3a8a">• Marshall Plan Aid</text>
          <text x="56" y="63" fontSize="3.5" textAnchor="middle" fill="#1e3a8a">• Truman Containment</text>
          <text x="56" y="71" fontSize="3.5" textAnchor="middle" fill="#1e3a8a">• Nuclear Triad (MAD)</text>

          {/* Eastern Communist Bloc */}
          <rect x="200" y="15" width="88" height="65" rx="4" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
          <text x="244" y="28" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#991b1b">SECOND WORLD (USSR)</text>
          <text x="244" y="38" fontSize="4" fontWeight="bold" textAnchor="middle" fill="#b91c1c">Command Communism</text>
          <text x="244" y="47" fontSize="3.5" textAnchor="middle" fill="#7f1d1d">• Warsaw Pact Alliance</text>
          <text x="244" y="55" fontSize="3.5" textAnchor="middle" fill="#7f1d1d">• COMECON Economic Bloc</text>
          <text x="244" y="63" fontSize="3.5" textAnchor="middle" fill="#7f1d1d">• Iron Curtain & Berlin Wall</text>
          <text x="244" y="71" fontSize="3.5" textAnchor="middle" fill="#7f1d1d">• Space & Nuclear Race</text>

          {/* Central Iron Curtain / Tension */}
          <line x1="103" y1="48" x2="197" y2="48" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
          <rect x="118" y="38" width="64" height="20" rx="3" fill="#f8fafc" stroke="#475569" strokeWidth="1" />
          <text x="150" y="48" fontSize="4" fontWeight="bold" textAnchor="middle" fill="#0f172a">MAD Deterrence</text>
          <text x="150" y="55" fontSize="3.2" textAnchor="middle" fill="#64748b">No Direct World War III</text>

          {/* Third World: Non-Aligned Movement */}
          <rect x="55" y="88" width="190" height="42" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
          <text x="150" y="99" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#166534">THIRD WORLD: NON-ALIGNED MOVEMENT (NAM)</text>
          <text x="150" y="108" fontSize="3.8" textAnchor="middle" fill="#14532d">1955 Bandung Conference: Nehru (India), Sukarno (Indonesia), Nasser (Egypt), Tito (Yugoslavia)</text>
          <text x="150" y="116" fontSize="3.5" textAnchor="middle" fill="#15803d">Refused to join either superpower bloc; prioritized national sovereignty and anti-colonialism</text>
          <text x="150" y="124" fontSize="3.5" fontWeight="bold" textAnchor="middle" fill="#b91c1c">Proxy War Arenas: Korea (1950–53), Vietnam (1955–75), Cuba (1962), Afghanistan (1979–89)</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">The Bipolar Cold War Order: Global Ideological Confrontation Channelled Into Regional Proxy Wars</text>
        </svg>
      );

    case 'global_supply_chain_phone':
    case 'supply_chain_map':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Node 1: Raw Materials */}
          <rect x="10" y="25" width="58" height="50" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
          <text x="39" y="37" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#92400e">1. Raw Materials</text>
          <text x="39" y="47" fontSize="3.5" textAnchor="middle" fill="#78350f">DR Congo: Cobalt</text>
          <text x="39" y="55" fontSize="3.5" textAnchor="middle" fill="#78350f">Chile: Lithium</text>
          <text x="39" y="63" fontSize="3.5" textAnchor="middle" fill="#b45309">Indonesia: Nickel</text>
          <text x="39" y="70" fontSize="3.2" textAnchor="middle" fill="#b45309">Resource Extraction</text>

          {/* Arrow */}
          <path d="M 68 50 L 78 50" stroke="#d97706" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Node 2: High-Tech Components */}
          <rect x="80" y="25" width="64" height="50" rx="3" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
          <text x="112" y="37" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#1e40af">2. R&D & Chips</text>
          <text x="112" y="47" fontSize="3.5" textAnchor="middle" fill="#1e3a8a">USA: Architecture/OS</text>
          <text x="112" y="55" fontSize="3.5" textAnchor="middle" fill="#1e3a8a">Taiwan: TSMC Chips</text>
          <text x="112" y="63" fontSize="3.5" textAnchor="middle" fill="#3b82f6">S. Korea: OLED Screen</text>
          <text x="112" y="70" fontSize="3.2" textAnchor="middle" fill="#3b82f6">High Capital/Skill Input</text>

          {/* Arrow */}
          <path d="M 144 50 L 154 50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Node 3: Manufacturing & Assembly */}
          <rect x="156" y="25" width="62" height="50" rx="3" fill="#fdf2f8" stroke="#db2777" strokeWidth="1.2" />
          <text x="187" y="37" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#9d174d">3. Assembly</text>
          <text x="187" y="47" fontSize="3.5" textAnchor="middle" fill="#831843">China (Foxconn)</text>
          <text x="187" y="55" fontSize="3.5" textAnchor="middle" fill="#831843">India / Vietnam</text>
          <text x="187" y="63" fontSize="3.5" textAnchor="middle" fill="#be185d">Standardized labor</text>
          <text x="187" y="70" fontSize="3.2" textAnchor="middle" fill="#be185d">Export Processing Zones</text>

          {/* Arrow */}
          <path d="M 218 50 L 228 50" stroke="#db2777" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Node 4: Global Distribution */}
          <rect x="230" y="25" width="60" height="50" rx="3" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.2" />
          <text x="260" y="37" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#166534">4. Distribution</text>
          <text x="260" y="47" fontSize="3.5" textAnchor="middle" fill="#14532d">Container Shipping</text>
          <text x="260" y="55" fontSize="3.5" textAnchor="middle" fill="#14532d">Air Cargo Freight</text>
          <text x="260" y="63" fontSize="3.5" textAnchor="middle" fill="#15803d">E-Commerce & Retail</text>
          <text x="260" y="70" fontSize="3.2" textAnchor="middle" fill="#15803d">Worldwide Consumers</text>

          {/* Neoliberal Context Box */}
          <rect x="10" y="85" width="280" height="42" rx="3" fill="#f8fafc" stroke="#cbd5e1" />
          <text x="150" y="97" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">Enabling Mechanisms of Economic Globalization</text>
          <text x="150" y="106" fontSize="3.5" textAnchor="middle" fill="#475569">• Malcolm McLean’s Standardized Shipping Containers (lowered maritime transport costs by 90%)</text>
          <text x="150" y="114" fontSize="3.5" textAnchor="middle" fill="#475569">• Neoliberal deregulation, free-trade pacts (WTO, NAFTA/USMCA), and multinational corporations</text>
          <text x="150" y="122" fontSize="3.5" textAnchor="middle" fill="#475569">• Instantaneous digital communication via transoceanic fiber-optic internet and satellite networks</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Planetary Global Supply Chain: Specialization, Transnational Labor, and Consumer Interdependence</text>
        </svg>
      );

    case 'whap_silk_roads_routes':
    case 'trade_networks_comparison':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Title */}
          <rect x="20" y="10" width="260" height="18" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
          <text x="150" y="22" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">The Three Major Afro-Eurasian Trade Networks (1200–1450)</text>

          {/* Network 1: Silk Roads */}
          <rect x="15" y="36" width="85" height="74" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
          <text x="57" y="48" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#92400e">Silk Roads (Overland)</text>
          <text x="57" y="58" fontSize="3.8" textAnchor="middle" fill="#78350f">Chang'an ➔ Samarkand ➔ Baghdad</text>
          <text x="57" y="67" fontSize="3.5" textAnchor="middle" fill="#78350f">• Luxury Goods: Silk, Porcelain, Jade</text>
          <text x="57" y="75" fontSize="3.5" textAnchor="middle" fill="#b45309">• Inventions: Caravanserai inns</text>
          <text x="57" y="83" fontSize="3.5" textAnchor="middle" fill="#b45309">• Financial: Paper "Flying Cash", credit</text>
          <text x="57" y="91" fontSize="3.5" textAnchor="middle" fill="#92400e">• Security: Pax Mongolica (Yam system)</text>
          <text x="57" y="99" fontSize="3.5" fontWeight="bold" textAnchor="middle" fill="#dc2626">• Biological: Black Death spread</text>

          {/* Network 2: Indian Ocean */}
          <rect x="107" y="36" width="86" height="74" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
          <text x="150" y="48" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#0369a1">Indian Ocean (Maritime)</text>
          <text x="150" y="58" fontSize="3.8" textAnchor="middle" fill="#075985">Swahili Coast ➔ India ➔ Malacca ➔ China</text>
          <text x="150" y="67" fontSize="3.5" textAnchor="middle" fill="#075985">• Bulk & Luxury: Spices, Cotton, Timber</text>
          <text x="150" y="75" fontSize="3.5" textAnchor="middle" fill="#0284c7">• Navigational: Lateen sail, Astrolabe,</text>
          <text x="150" y="83" fontSize="3.5" textAnchor="middle" fill="#0284c7">  Sternpost rudder, Magnetic compass</text>
          <text x="150" y="91" fontSize="3.5" textAnchor="middle" fill="#0369a1">• Cultural: Diasporic Merchant Enclaves</text>
          <text x="150" y="99" fontSize="3.5" fontWeight="bold" textAnchor="middle" fill="#075985">• Driving force: Seasonal Monsoon Winds</text>

          {/* Network 3: Trans-Saharan */}
          <rect x="200" y="36" width="85" height="74" rx="4" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.2" />
          <text x="242" y="48" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#991b1b">Trans-Saharan (Desert)</text>
          <text x="242" y="58" fontSize="3.8" textAnchor="middle" fill="#7f1d1d">North Africa ➔ Sahara ➔ West Africa</text>
          <text x="242" y="67" fontSize="3.5" textAnchor="middle" fill="#7f1d1d">• Core Commodities: Gold & Salt</text>
          <text x="242" y="75" fontSize="3.5" textAnchor="middle" fill="#b91c1c">• Transport: Camel Saddles (600 lbs)</text>
          <text x="242" y="83" fontSize="3.5" textAnchor="middle" fill="#b91c1c">• Empires: Ghana, Mali, Songhai</text>
          <text x="242" y="91" fontSize="3.5" textAnchor="middle" fill="#991b1b">• Intellectual Center: Timbuktu</text>
          <text x="242" y="99" fontSize="3.5" fontWeight="bold" textAnchor="middle" fill="#7f1d1d">• Mansa Musa 1324 Mecca Hajj</text>

          {/* Comparison Footer */}
          <rect x="15" y="116" width="270" height="20" rx="3" fill="#f1f5f9" stroke="#94a3b8" />
          <text x="150" y="126" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">Key AP Comparison: Overland (Luxury, high transport cost) vs. Maritime (Bulk cargo, monsoon-dependent)</text>
          <text x="150" y="133" fontSize="3.8" textAnchor="middle" fill="#475569">All three networks diffused world religions (Islam, Buddhism) and integrated Afro-Eurasian urban centers.</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Afro-Eurasian Connectivity: Catalyzing Urbanization, Syncretism, and the Spread of Knowledge</text>
        </svg>
      );

    case 'scramble_for_africa_map':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Berlin Conference Overview */}
          <rect x="12" y="12" width="130" height="36" rx="3" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.2" />
          <text x="77" y="24" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#991b1b">Berlin Conference (1884–1885)</text>
          <text x="77" y="32" fontSize="3.8" textAnchor="middle" fill="#7f1d1d">Convened by Otto von Bismarck</text>
          <text x="77" y="40" fontSize="3.5" textAnchor="middle" fill="#b91c1c">"Principle of Effective Occupation"</text>
          <text x="77" y="46" fontSize="3.2" textAnchor="middle" fill="#b91c1c">0 African Leaders Invited or Consulted</text>

          {/* Colonial Powers & Artificial Borders */}
          <rect x="155" y="12" width="133" height="36" rx="3" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
          <text x="221" y="24" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#1e40af">Artificial Colonial Borders</text>
          <text x="221" y="32" fontSize="3.8" textAnchor="middle" fill="#1e3a8a">Partitioned 90% of Africa by 1914</text>
          <text x="221" y="40" fontSize="3.5" textAnchor="middle" fill="#3b82f6">Divided cohesive ethnic & linguistic groups</text>
          <text x="221" y="46" fontSize="3.2" textAnchor="middle" fill="#3b82f6">Grouped hostile rival tribes together</text>

          {/* Major Colonial Spheres */}
          <rect x="12" y="55" width="88" height="58" rx="3" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
          <text x="56" y="67" fontSize="4.8" fontWeight="bold" textAnchor="middle" fill="#0f172a">Imperial Extraction Zones</text>
          <text x="56" y="76" fontSize="3.5" textAnchor="middle" fill="#334155">• Britain: Cairo to Cape Town (Rubber, Gold)</text>
          <text x="56" y="84" fontSize="3.5" textAnchor="middle" fill="#334155">• France: West & North Africa (Cotton, Palm oil)</text>
          <text x="56" y="92" fontSize="3.5" textAnchor="middle" fill="#334155">• King Leopold II: Congo Free State</text>
          <text x="56" y="100" fontSize="3.2" fontWeight="bold" textAnchor="middle" fill="#dc2626">  Brutal forced rubber quotas; 10M deaths</text>
          <text x="56" y="108" fontSize="3.5" textAnchor="middle" fill="#334155">• Germany: East/South-West Africa (Herero genocide)</text>

          {/* African Resistance vs. Collaboration */}
          <rect x="108" y="55" width="180" height="58" rx="3" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.2" />
          <text x="198" y="67" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#166534">African Anti-Colonial Resistance</text>
          <text x="198" y="77" fontSize="3.8" fontWeight="bold" textAnchor="middle" fill="#15803d">1. Ethiopia (Battle of Adwa, 1896)</text>
          <text x="198" y="85" fontSize="3.5" textAnchor="middle" fill="#14532d">Emperor Menelik II stockpiled modern weapons; defeated invading Italian army; remained independent!</text>
          <text x="198" y="94" fontSize="3.8" fontWeight="bold" textAnchor="middle" fill="#15803d">2. West Africa: Samori Touré's Wassoulou Empire</text>
          <text x="198" y="102" fontSize="3.5" textAnchor="middle" fill="#14532d">Fought 16-year armed guerrilla resistance against French colonial army.</text>
          <text x="198" y="110" fontSize="3.5" textAnchor="middle" fill="#14532d">3. Yaa Asantewaa War (1900): Ashanti rebellion against British "Golden Stool" desecration.</text>

          {/* Long Term Impact */}
          <rect x="12" y="118" width="276" height="18" rx="3" fill="#fefce8" stroke="#ca8a04" />
          <text x="150" y="127" fontSize="4.2" fontWeight="bold" textAnchor="middle" fill="#854d0e">Post-Colonial Legacy: Artificial borders fueled modern civil wars (e.g. Rwandan Genocide, Nigerian Biafra)</text>
          <text x="150" y="134" fontSize="3.5" textAnchor="middle" fill="#a16207">and established raw-resource export dependency that persisted long after political decolonization.</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">The Scramble for Africa: Industrial Raw Material Extraction and the Destruction of Indigenous Sovereignty</text>
        </svg>
      );

    case 'dev_cycle_diagram':
    case 'csp_dev_cycle':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          <rect x="20" y="8" width="260" height="16" rx="3" fill="#f8fafc" stroke="#cbd5e1" />
          <text x="150" y="19" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#0f172a">Iterative Software Development Lifecycle (CSP)</text>

          {/* 4 Cyclic Nodes */}
          {/* Node 1: Investigating */}
          <rect x="15" y="35" width="62" height="42" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
          <text x="46" y="47" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#1e40af">1. Investigate</text>
          <text x="46" y="56" fontSize="3.5" textAnchor="middle" fill="#1e3a8a">User Interviews</text>
          <text x="46" y="64" fontSize="3.5" textAnchor="middle" fill="#3b82f6">Identify Problem</text>
          <text x="46" y="71" fontSize="3.2" textAnchor="middle" fill="#3b82f6">Requirements Spec</text>

          {/* Arrow 1 -> 2 */}
          <path d="M 77 56 L 108 56" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Node 2: Designing */}
          <rect x="110" y="35" width="65" height="42" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
          <text x="142" y="47" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#92400e">2. Design</text>
          <text x="142" y="56" fontSize="3.5" textAnchor="middle" fill="#78350f">Pseudocode & Flow</text>
          <text x="142" y="64" fontSize="3.5" textAnchor="middle" fill="#b45309">Data Structures</text>
          <text x="142" y="71" fontSize="3.2" textAnchor="middle" fill="#b45309">UI Storyboards</text>

          {/* Arrow 2 -> 3 */}
          <path d="M 175 56 L 208 56" stroke="#d97706" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Node 3: Prototyping */}
          <rect x="210" y="35" width="75" height="42" rx="4" fill="#fdf4ff" stroke="#c026d3" strokeWidth="1.2" />
          <text x="247" y="47" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#86198f">3. Prototype</text>
          <text x="247" y="56" fontSize="3.5" textAnchor="middle" fill="#701a75">Modular Coding</text>
          <text x="247" y="64" fontSize="3.5" textAnchor="middle" fill="#a21caf">API Integration</text>
          <text x="247" y="71" fontSize="3.2" textAnchor="middle" fill="#a21caf">Event Handlers</text>

          {/* Arrow 3 down to 4 */}
          <path d="M 247 77 L 247 95" stroke="#c026d3" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Node 4: Testing & Debugging */}
          <rect x="180" y="98" width="105" height="36" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.2" />
          <text x="232" y="109" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#166534">4. Test & Debug</text>
          <text x="232" y="117" fontSize="3.5" textAnchor="middle" fill="#14532d">Boundary Inputs, Edge Cases & Error Logs</text>
          <text x="232" y="125" fontSize="3.2" textAnchor="middle" fill="#15803d">Verify against user requirements</text>

          {/* Loopback Arrow 4 back to 1 */}
          <path d="M 180 116 L 46 116 L 46 80" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow)" />
          <text x="110" y="123" fontSize="3.8" fontWeight="bold" fill="#16a34a">Iterative Feedback Loop (Refine & Repeat)</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Development is Non-Linear: Testing Uncovers New Requirements Requiring Iteration</text>
        </svg>
      );

    case 'sampling_graph':
    case 'csp_analog_sampling':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="40" y1="20" x2="40" y2="130" stroke="#64748b" strokeWidth="1.5" />
          <line x1="40" y1="130" x2="280" y2="130" stroke="#64748b" strokeWidth="1.5" />
          <text x="35" y="25" fontSize="5" fontWeight="bold" textAnchor="end" fill="#334155">Amplitude (Volts)</text>
          <text x="275" y="140" fontSize="5" fontWeight="bold" textAnchor="end" fill="#334155">Time (ms)</text>

          {/* Continuous Analog Sine Wave */}
          <path d="M 40 75 Q 70 15 100 75 T 160 75 T 220 75 T 280 75" fill="none" stroke="#2563eb" strokeWidth="2" />
          <text x="90" y="28" fontSize="4.5" fontWeight="bold" fill="#2563eb">Continuous Analog Signal</text>

          {/* Sampled Digital Stepped Approximations */}
          <g stroke="#dc2626" strokeWidth="1.2">
            <line x1="55" y1="50" x2="70" y2="50" />
            <line x1="70" y1="50" x2="70" y2="25" />
            <line x1="70" y1="25" x2="85" y2="25" />
            <line x1="85" y1="25" x2="85" y2="45" />
            <line x1="85" y1="45" x2="100" y2="45" />
            <line x1="100" y1="45" x2="100" y2="85" />
            <line x1="100" y1="85" x2="115" y2="85" />
            <line x1="115" y1="85" x2="115" y2="115" />
            <line x1="115" y1="115" x2="130" y2="115" />
            <line x1="130" y1="115" x2="130" y2="95" />
            <line x1="130" y1="95" x2="145" y2="95" />
          </g>

          {/* Sample dots */}
          <circle cx="70" cy="35" r="2.5" fill="#dc2626" />
          <circle cx="100" cy="75" r="2.5" fill="#dc2626" />
          <circle cx="130" cy="115" r="2.5" fill="#dc2626" />
          <text x="155" y="115" fontSize="4.5" fontWeight="bold" fill="#dc2626">Sample Points (Digitized Values)</text>

          {/* Key Concept Box */}
          <rect x="175" y="30" width="105" height="38" rx="3" fill="#fef2f2" stroke="#dc2626" strokeWidth="0.8" />
          <text x="227" y="42" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#991b1b">Analog ➔ Digital Sampling</text>
          <text x="227" y="50" fontSize="3.5" textAnchor="middle" fill="#7f1d1d">• Higher sampling rate = smaller step size</text>
          <text x="227" y="57" fontSize="3.5" textAnchor="middle" fill="#7f1d1d">• Sampling is lossy: quantization error</text>
          <text x="227" y="64" fontSize="3.5" textAnchor="middle" fill="#b91c1c">• Bit depth determines dynamic range</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Analog vs Digital: Continuous Waves are Converted into Discrete Binary Approximations</text>
        </svg>
      );

    case 'search_comparison_graph':
    case 'csp_binary_vs_linear':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="45" y1="20" x2="45" y2="130" stroke="#64748b" strokeWidth="1.5" />
          <line x1="45" y1="130" x2="275" y2="130" stroke="#64748b" strokeWidth="1.5" />
          <text x="40" y="25" fontSize="5" fontWeight="bold" textAnchor="end" fill="#334155">Comparisons (Steps)</text>
          <text x="270" y="140" fontSize="5" fontWeight="bold" textAnchor="end" fill="#334155">List Size (N)</text>

          {/* Linear Search O(N) */}
          <line x1="45" y1="130" x2="245" y2="30" stroke="#dc2626" strokeWidth="2.5" />
          <text x="220" y="25" fontSize="5" fontWeight="bold" fill="#dc2626">Linear Search: O(N)</text>

          {/* Binary Search O(log N) */}
          <path d="M 45 130 Q 75 105 130 98 T 270 94" fill="none" stroke="#16a34a" strokeWidth="2.5" />
          <text x="235" y="88" fontSize="5" fontWeight="bold" fill="#16a34a">Binary Search: O(log₂ N)</text>

          {/* Comparison Table inset */}
          <rect x="52" y="32" width="110" height="42" rx="3" fill="#f8fafc" stroke="#cbd5e1" />
          <text x="107" y="43" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">Efficiency at N = 1,000,000 Elements</text>
          <text x="60" y="53" fontSize="3.8" fill="#dc2626">• Linear Search: Up to 1,000,000 checks</text>
          <text x="60" y="62" fontSize="3.8" fill="#16a34a">• Binary Search: At most 20 checks!</text>
          <text x="60" y="70" fontSize="3.2" fontWeight="bold" fill="#d97706">⚠️ CRITICAL: Binary Search REQUIRES Sorted Data</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Algorithm Efficiency: Doubling List Size Adds Only 1 Comparison to Binary Search</text>
        </svg>
      );

    case 'packet_routing_diagram':
    case 'csp_packet_routing':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Sender Host */}
          <rect x="12" y="45" width="55" height="50" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
          <text x="39" y="58" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#1e40af">Sender Host</text>
          <text x="39" y="67" fontSize="3.5" textAnchor="middle" fill="#1e3a8a">File broken into</text>
          <text x="39" y="74" fontSize="3.5" textAnchor="middle" fill="#1e3a8a">Packets 1, 2, 3</text>
          <text x="39" y="83" fontSize="3.2" textAnchor="middle" fill="#3b82f6">+ IP Headers</text>

          {/* Routers in Mesh Network */}
          {/* Router A (Top) */}
          <circle cx="115" cy="40" r="16" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
          <text x="115" y="38" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#92400e">Router A</text>
          <text x="115" y="46" fontSize="3.2" textAnchor="middle" fill="#78350f">Packet 1</text>

          {/* Router B (Middle) */}
          <circle cx="150" cy="72" r="16" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
          <text x="150" y="70" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#92400e">Router B</text>
          <text x="150" y="78" fontSize="3.2" textAnchor="middle" fill="#78350f">Packet 2</text>

          {/* Router C (Bottom) */}
          <circle cx="185" cy="104" r="16" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
          <text x="185" y="102" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#92400e">Router C</text>
          <text x="185" y="110" fontSize="3.2" textAnchor="middle" fill="#78350f">Packet 3</text>

          {/* Dynamic Routing Paths */}
          <path d="M 67 60 L 99 44" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrow)" />
          <path d="M 67 70 L 134 72" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 67 80 L 169 104" stroke="#c026d3" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrow)" />

          {/* Converge on Receiver */}
          <path d="M 131 40 L 230 60" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrow)" />
          <path d="M 166 72 L 230 70" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 201 104 L 230 80" stroke="#c026d3" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrow)" />

          {/* Receiver Host */}
          <rect x="233" y="45" width="55" height="50" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.2" />
          <text x="260" y="58" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#166534">Receiver Host</text>
          <text x="260" y="67" fontSize="3.5" textAnchor="middle" fill="#14532d">TCP Protocol</text>
          <text x="260" y="74" fontSize="3.5" textAnchor="middle" fill="#14532d">Reorders Packets</text>
          <text x="260" y="83" fontSize="3.2" textAnchor="middle" fill="#15803d">Requests Drops</text>

          <rect x="15" y="122" width="270" height="15" rx="3" fill="#f8fafc" stroke="#cbd5e1" />
          <text x="150" y="132" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">Fault-Tolerant Internet Redundancy: If Router B crashes, packets auto-reroute via A or C</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Packet Switching: Data Travels Independently Across Redundant Paths without Central Control</text>
        </svg>
      );

    case 'cryptography_diagram':
    case 'csp_public_key':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Sender Alice */}
          <rect x="12" y="25" width="62" height="50" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
          <text x="43" y="38" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#1e40af">Sender (Alice)</text>
          <text x="43" y="48" fontSize="3.5" textAnchor="middle" fill="#1e3a8a">Plaintext: "HELLO"</text>
          <text x="43" y="56" fontSize="3.5" textAnchor="middle" fill="#3b82f6">+ Bob's Public Key</text>
          <text x="43" y="65" fontSize="3.2" textAnchor="middle" fill="#3b82f6">Encrypts message</text>

          {/* Public Key Icon / Arrow */}
          <path d="M 74 50 L 115 50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="95" y="44" fontSize="3.8" fontWeight="bold" fill="#2563eb">Public Key</text>

          {/* Ciphertext in Transit over Insecure Internet */}
          <rect x="118" y="32" width="64" height="36" rx="3" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.2" />
          <text x="150" y="43" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#991b1b">Insecure Channel</text>
          <text x="150" y="52" fontSize="3.5" textAnchor="middle" fill="#7f1d1d">Ciphertext: "9x!Q@#"</text>
          <text x="150" y="60" fontSize="3.2" textAnchor="middle" fill="#b91c1c">Eavesdropper locked out!</text>

          {/* Arrow to Receiver */}
          <path d="M 182 50 L 223 50" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="203" y="44" fontSize="3.8" fontWeight="bold" fill="#16a34a">Private Key</text>

          {/* Receiver Bob */}
          <rect x="225" y="25" width="62" height="50" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.2" />
          <text x="256" y="38" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#166534">Receiver (Bob)</text>
          <text x="256" y="48" fontSize="3.5" textAnchor="middle" fill="#14532d">Bob's Private Key</text>
          <text x="256" y="56" fontSize="3.5" textAnchor="middle" fill="#15803d">(Secret / Never Shared)</text>
          <text x="256" y="65" fontSize="3.2" textAnchor="middle" fill="#15803d">Decrypts: "HELLO"</text>

          {/* Bottom Rules */}
          <rect x="12" y="85" width="276" height="42" rx="3" fill="#f8fafc" stroke="#cbd5e1" />
          <text x="150" y="97" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">Public-Key (Asymmetric) Encryption Principles (CSP)</text>
          <text x="150" y="106" fontSize="3.5" textAnchor="middle" fill="#475569">• Public Key is distributed freely to encrypt; ONLY the matched Private Key can decrypt.</text>
          <text x="150" y="114" fontSize="3.5" textAnchor="middle" fill="#475569">• Powers HTTPS, SSL/TLS, and secure digital certificates verified by Certificate Authorities (CAs).</text>
          <text x="150" y="122" fontSize="3.5" textAnchor="middle" fill="#475569">• Symmetric encryption uses 1 shared key; Asymmetric encryption uses a mathematically linked key pair.</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Asymmetric Cryptography: Securing Planetary Transactions Without Sharing Secret Keys</text>
        </svg>
      );

    // =========================================================================
    // AP PSYCHOLOGY (5 DIAGRAMS)
    // =========================================================================
    case 'synapse_diagram':
    case 'neuron_synapse':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Pre-synaptic Axon Terminal (Left) */}
          <path d="M 20 20 L 75 20 C 110 20 120 75 120 75 C 120 75 110 130 75 130 L 20 130" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
          <text x="60" y="32" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#1e293b">Pre-Synaptic Axon Terminal</text>

          {/* Vesicles containing Neurotransmitters */}
          <circle cx="65" cy="55" r="7" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
          <circle cx="65" cy="55" r="2" fill="#d97706" />
          <circle cx="85" cy="75" r="7" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
          <circle cx="85" cy="75" r="2" fill="#d97706" />
          <text x="75" y="92" fontSize="3.8" textAnchor="middle" fill="#92400e">Vesicles with Neurotransmitters</text>

          {/* Synaptic Cleft (Middle Gap) */}
          <text x="145" y="28" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#0284c7">Synaptic Cleft</text>
          {/* Released Neurotransmitters */}
          <circle cx="135" cy="55" r="2.5" fill="#2563eb" />
          <circle cx="145" cy="75" r="2.5" fill="#2563eb" />
          <circle cx="138" cy="95" r="2.5" fill="#2563eb" />
          <circle cx="148" cy="110" r="2.5" fill="#2563eb" />

          {/* Reuptake Pump */}
          <rect x="108" y="105" width="14" height="12" rx="2" fill="#fed7aa" stroke="#ea580c" />
          <text x="100" y="125" fontSize="3.2" fontWeight="bold" fill="#ea580c">Reuptake Pump (SSRI Target)</text>

          {/* Post-synaptic Dendrite (Right) */}
          <path d="M 280 20 L 200 20 C 175 20 170 75 170 75 C 170 75 175 130 200 130 L 280 130" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
          <text x="235" y="32" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#1e40af">Post-Synaptic Dendrite</text>

          {/* Receptor Sites */}
          <rect x="168" y="50" width="8" height="12" rx="1" fill="#bfdbfe" stroke="#2563eb" />
          <rect x="168" y="70" width="8" height="12" rx="1" fill="#bfdbfe" stroke="#2563eb" />
          <rect x="168" y="90" width="8" height="12" rx="1" fill="#bfdbfe" stroke="#2563eb" />
          <text x="215" y="76" fontSize="3.8" fill="#1e3a8a">Receptor Sites (Lock & Key)</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Chemical Synaptic Transmission: Action Potential Triggers Exocytosis Across the Cleft</text>
        </svg>
      );

    case 'forgetting_curve':
    case 'ebbinghaus_curve':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="45" y1="20" x2="45" y2="130" stroke="#64748b" strokeWidth="1.5" />
          <line x1="45" y1="130" x2="280" y2="130" stroke="#64748b" strokeWidth="1.5" />
          <text x="40" y="25" fontSize="5" fontWeight="bold" textAnchor="end" fill="#334155">Retention (%)</text>
          <text x="275" y="140" fontSize="5" fontWeight="bold" textAnchor="end" fill="#334155">Time Elapsed (Days)</text>

          {/* Ticks on Y */}
          <text x="40" y="35" fontSize="4" textAnchor="end" fill="#64748b">100%</text>
          <text x="40" y="80" fontSize="4" textAnchor="end" fill="#64748b">50%</text>
          <text x="40" y="125" fontSize="4" textAnchor="end" fill="#64748b">20%</text>

          {/* Original Forgetting Curve (Single Learning Session) */}
          <path d="M 45 35 Q 65 105 110 115 T 275 120" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x="120" y="112" fontSize="4.5" fontWeight="bold" fill="#dc2626">No Review: 75% Lost in 48h</text>

          {/* Review 1 (Day 1) */}
          <path d="M 75 95 L 75 35 Q 115 65 160 80 T 275 90" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="2 2" />
          <text x="110" y="60" fontSize="3.8" fontWeight="bold" fill="#d97706">Review 1</text>

          {/* Review 2 (Day 3) */}
          <path d="M 140 75 L 140 35 Q 185 50 220 58 T 275 62" fill="none" stroke="#16a34a" strokeWidth="2" />
          <text x="175" y="48" fontSize="4" fontWeight="bold" fill="#16a34a">Review 2 (Spaced Repetition)</text>

          {/* Conclusion Box */}
          <rect x="155" y="90" width="125" height="34" rx="3" fill="#f0fdf4" stroke="#16a34a" strokeWidth="0.8" />
          <text x="217" y="102" fontSize="4.2" fontWeight="bold" textAnchor="middle" fill="#166534">Ebbinghaus Spaced Practice Effect</text>
          <text x="217" y="110" fontSize="3.5" textAnchor="middle" fill="#14532d">Distributed practice over intervals</text>
          <text x="217" y="117" fontSize="3.5" textAnchor="middle" fill="#15803d">dramatically flattens forgetting decay curve.</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Ebbinghaus Forgetting Curve: Active Recall and Spaced Intervals Prevent Memory Decay</text>
        </svg>
      );

    case 'reinforcement_curves':
    case 'reinforcement_schedules':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="45" y1="20" x2="45" y2="130" stroke="#64748b" strokeWidth="1.5" />
          <line x1="45" y1="130" x2="280" y2="130" stroke="#64748b" strokeWidth="1.5" />
          <text x="40" y="25" fontSize="5" fontWeight="bold" textAnchor="end" fill="#334155">Cumulative Responses</text>
          <text x="275" y="140" fontSize="5" fontWeight="bold" textAnchor="end" fill="#334155">Time</text>

          {/* Variable Ratio (VR) - Steepest, steady, most resistant to extinction */}
          <line x1="45" y1="130" x2="110" y2="25" stroke="#2563eb" strokeWidth="2.5" />
          <text x="115" y="32" fontSize="4.5" fontWeight="bold" fill="#2563eb">VR (Variable Ratio: Slot Machine - Highest/Steady)</text>

          {/* Fixed Ratio (FR) - High rate with post-reinforcement pauses (Staircase) */}
          <path d="M 45 130 L 70 100 L 85 100 L 110 70 L 125 70 L 150 40 L 165 40" fill="none" stroke="#7c3aed" strokeWidth="2" />
          <text x="170" y="45" fontSize="4.5" fontWeight="bold" fill="#7c3aed">FR (Fixed Ratio: Piecework bonus - Pause & run)</text>

          {/* Variable Interval (VI) - Moderate, steady rate without pauses */}
          <line x1="45" y1="130" x2="230" y2="55" stroke="#16a34a" strokeWidth="2" />
          <text x="215" y="70" fontSize="4.5" fontWeight="bold" fill="#16a34a">VI (Variable Interval: Pop quiz - Steady)</text>

          {/* Fixed Interval (FI) - Scalloped pattern near deadline */}
          <path d="M 45 130 Q 75 130 95 110 Q 125 110 145 90 Q 175 90 195 70 Q 225 70 245 50" fill="none" stroke="#dc2626" strokeWidth="2" />
          <text x="225" y="100" fontSize="4.5" fontWeight="bold" fill="#dc2626">FI (Fixed Interval: Bi-weekly paycheck - Scallop)</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Operant Conditioning Schedules: Variable Ratio Generates Highest Rate & Resistance to Extinction</text>
        </svg>
      );

    case 'bystander_curve':
    case 'bystander_diffusion':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Axes */}
          <line x1="50" y1="20" x2="50" y2="130" stroke="#64748b" strokeWidth="1.5" />
          <line x1="50" y1="130" x2="275" y2="130" stroke="#64748b" strokeWidth="1.5" />
          <text x="45" y="25" fontSize="5" fontWeight="bold" textAnchor="end" fill="#334155">% Helping Action</text>
          <text x="270" y="140" fontSize="5" fontWeight="bold" textAnchor="end" fill="#334155">Group Size (Witnesses)</text>

          {/* Curve */}
          <path d="M 70 35 Q 120 85 240 115" fill="none" stroke="#dc2626" strokeWidth="2.5" />

          {/* Data Points */}
          <circle cx="70" cy="35" r="3.5" fill="#16a34a" />
          <text x="75" y="32" fontSize="4.5" fontWeight="bold" fill="#16a34a">1 Person Alone: 85% Help</text>

          <circle cx="130" cy="80" r="3.5" fill="#f59e0b" />
          <text x="135" y="78" fontSize="4.5" fontWeight="bold" fill="#d97706">2–3 People: 62% Help</text>

          <circle cx="230" cy="112" r="3.5" fill="#dc2626" />
          <text x="210" y="125" fontSize="4.5" fontWeight="bold" fill="#dc2626">5+ Bystanders: 31% Help</text>

          {/* Explanatory Box */}
          <rect x="85" y="10" width="185" height="35" rx="3" fill="#fef2f2" stroke="#dc2626" strokeWidth="0.8" />
          <text x="177" y="22" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#991b1b">Darley & Latané (1968) Bystander Effect</text>
          <text x="177" y="30" fontSize="3.5" textAnchor="middle" fill="#7f1d1d">• Diffusion of Responsibility: "Someone else will call 911"</text>
          <text x="177" y="38" fontSize="3.5" textAnchor="middle" fill="#7f1d1d">• Pluralistic Ignorance: Looking to others to define the emergency</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Bystander Effect: As Number of Witnesses Increases, Likelihood of Victim Receiving Help Decreases</text>
        </svg>
      );

    case 'gas_curve':
    case 'selve_gas_model':
      return (
        <svg viewBox="0 0 300 160" className="w-full h-40 bg-white rounded-xl border border-zinc-200 shadow-xs">
          {/* Baseline Normal Resistance Line */}
          <line x1="40" y1="80" x2="280" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          <text x="45" y="75" fontSize="4" fill="#64748b">Normal Level of Resistance</text>

          {/* GAS Stress Response Curve */}
          <path d="M 40 80 L 70 100 L 95 35 L 195 45 Q 240 55 275 125" fill="none" stroke="#ea580c" strokeWidth="2.5" />

          {/* Phase 1: Alarm Reaction */}
          <rect x="45" y="108" width="48" height="24" rx="2" fill="#fee2e2" stroke="#ef4444" strokeWidth="0.8" />
          <text x="69" y="118" fontSize="4.2" fontWeight="bold" textAnchor="middle" fill="#991b1b">Phase 1: Alarm</text>
          <text x="69" y="126" fontSize="3.2" textAnchor="middle" fill="#7f1d1d">Fight-or-Flight / Dip</text>

          {/* Phase 2: Resistance */}
          <rect x="115" y="15" width="70" height="24" rx="2" fill="#fef3c7" stroke="#f59e0b" strokeWidth="0.8" />
          <text x="150" y="25" fontSize="4.2" fontWeight="bold" textAnchor="middle" fill="#92400e">Phase 2: Resistance</text>
          <text x="150" y="33" fontSize="3.2" textAnchor="middle" fill="#78350f">High Cortisol / Coping</text>

          {/* Phase 3: Exhaustion */}
          <rect x="215" y="108" width="60" height="24" rx="2" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.8" />
          <text x="245" y="118" fontSize="4.2" fontWeight="bold" textAnchor="middle" fill="#334155">Phase 3: Exhaustion</text>
          <text x="245" y="126" fontSize="3.2" textAnchor="middle" fill="#475569">Vulnerability / Illness</text>

          <text x="150" y="152" fontSize="6.5" fontWeight="black" textAnchor="middle" fill="#0f172a">Hans Selye's General Adaptation Syndrome (GAS): Alarm ➔ Resistance ➔ Exhaustion</text>
        </svg>
      );

    default:
      return null;
  }
}
