export function CoffeeMakerIllustration({ className = "w-64 h-64" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Person 1 - Left */}
      <g transform="translate(50, 100)">
        {/* Head */}
        <circle cx="25" cy="20" r="12" fill="#4A90E2" />
        {/* Hair */}
        <path d="M15 12 Q25 8 35 12 Q35 15 25 18 Q15 15 15 12" fill="#8B4513" />
        {/* Body */}
        <rect x="18" y="32" width="14" height="30" rx="7" fill="#E74C3C" />
        {/* Arms */}
        <rect x="8" y="35" width="10" height="3" rx="1.5" fill="#E74C3C" />
        <rect x="32" y="35" width="10" height="3" rx="1.5" fill="#E74C3C" />
        {/* Legs */}
        <rect x="21" y="62" width="3" height="18" rx="1.5" fill="#2C3E50" />
        <rect x="26" y="62" width="3" height="18" rx="1.5" fill="#2C3E50" />
        {/* Coffee cup in hand */}
        <circle cx="45" cy="37" r="4" fill="#8B4513" />
        <rect x="43" y="33" width="4" height="8" fill="#8B4513" />
        <path d="M47 35 Q49 35 49 37 Q49 39 47 39" stroke="#8B4513" strokeWidth="1" fill="none" />
      </g>

      {/* Person 2 - Center */}
      <g transform="translate(125, 80)">
        {/* Head */}
        <circle cx="25" cy="20" r="12" fill="#2ECC71" />
        {/* Hair */}
        <ellipse cx="25" cy="12" rx="12" ry="8" fill="#F39C12" />
        {/* Body */}
        <rect x="18" y="32" width="14" height="30" rx="7" fill="#9B59B6" />
        {/* Arms - raised in celebration */}
        <rect x="8" y="25" width="10" height="3" rx="1.5" fill="#9B59B6" transform="rotate(-30 13 26.5)" />
        <rect x="32" y="25" width="10" height="3" rx="1.5" fill="#9B59B6" transform="rotate(30 37 26.5)" />
        {/* Legs */}
        <rect x="21" y="62" width="3" height="18" rx="1.5" fill="#2C3E50" />
        <rect x="26" y="62" width="3" height="18" rx="1.5" fill="#2C3E50" />
        {/* Chef hat */}
        <ellipse cx="25" cy="8" rx="15" ry="6" fill="white" />
        <rect x="20" y="8" width="10" height="8" fill="white" />
      </g>

      {/* Person 3 - Right */}
      <g transform="translate(200, 100)">
        {/* Head */}
        <circle cx="25" cy="20" r="12" fill="#F39C12" />
        {/* Hair */}
        <path d="M13 15 Q25 10 37 15 L37 20 L13 20 Z" fill="#2C3E50" />
        {/* Body */}
        <rect x="18" y="32" width="14" height="30" rx="7" fill="#1ABC9C" />
        {/* Arms */}
        <rect x="8" y="35" width="10" height="3" rx="1.5" fill="#1ABC9C" />
        <rect x="32" y="35" width="10" height="3" rx="1.5" fill="#1ABC9C" />
        {/* Legs */}
        <rect x="21" y="62" width="3" height="18" rx="1.5" fill="#2C3E50" />
        <rect x="26" y="62" width="3" height="18" rx="1.5" fill="#2C3E50" />
        {/* Thumbs up */}
        <circle cx="45" cy="36" r="2" fill="#F4D03F" />
        <rect x="44" y="32" width="2" height="6" fill="#F4D03F" />
      </g>

      {/* Coffee beans scattered around */}
      <ellipse cx="80" cy="50" rx="3" ry="2" fill="#8B4513" transform="rotate(45 80 50)" />
      <ellipse cx="220" cy="60" rx="3" ry="2" fill="#8B4513" transform="rotate(-30 220 60)" />
      <ellipse cx="60" cy="200" rx="3" ry="2" fill="#8B4513" transform="rotate(15 60 200)" />
      <ellipse cx="240" cy="190" rx="3" ry="2" fill="#8B4513" transform="rotate(-45 240 190)" />

      {/* Coffee steam */}
      <path d="M70 40 Q75 35 70 30 Q65 25 70 20" stroke="#E8E8E8" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M75 42 Q80 37 75 32 Q70 27 75 22" stroke="#E8E8E8" strokeWidth="2" fill="none" opacity="0.4" />

      {/* Question mark above center person */}
      <text x="150" y="40" fontSize="24" fill="#FFD700" textAnchor="middle">
        ?
      </text>

      {/* Coffee pot in center */}
      <g transform="translate(135, 200)">
        <ellipse cx="15" cy="25" rx="12" ry="8" fill="#8B4513" />
        <rect x="8" y="15" width="14" height="15" fill="#8B4513" />
        <ellipse cx="15" cy="15" rx="7" ry="4" fill="#D2691E" />
        <rect x="22" y="18" width="6" height="2" rx="1" fill="#8B4513" />
        <path d="M28 18 Q32 18 32 20 Q32 22 28 22" stroke="#8B4513" strokeWidth="1" fill="none" />
      </g>
    </svg>
  )
}
