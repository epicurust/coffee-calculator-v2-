export function CoffeePlantIllustration({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Plant stem */}
      <path d="M100 180 Q95 150 90 120 Q85 90 80 60 Q75 30 70 10" stroke="#8B4513" strokeWidth="4" fill="none" />

      {/* Leaves */}
      <ellipse cx="60" cy="40" rx="15" ry="8" fill="#228B22" transform="rotate(-30 60 40)" />
      <ellipse cx="85" cy="60" rx="18" ry="10" fill="#32CD32" transform="rotate(20 85 60)" />
      <ellipse cx="70" cy="80" rx="16" ry="9" fill="#228B22" transform="rotate(-40 70 80)" />
      <ellipse cx="95" cy="100" rx="20" ry="12" fill="#32CD32" transform="rotate(15 95 100)" />
      <ellipse cx="75" cy="120" rx="17" ry="10" fill="#228B22" transform="rotate(-25 75 120)" />
      <ellipse cx="100" cy="140" rx="19" ry="11" fill="#32CD32" transform="rotate(30 100 140)" />

      {/* Coffee cherries */}
      <circle cx="65" cy="70" r="4" fill="#DC143C" />
      <circle cx="90" cy="90" r="4" fill="#B22222" />
      <circle cx="80" cy="110" r="4" fill="#DC143C" />
      <circle cx="105" cy="130" r="4" fill="#B22222" />

      {/* Small coffee beans inside cherries */}
      <ellipse cx="65" cy="70" rx="2" ry="3" fill="#8B4513" />
      <ellipse cx="90" cy="90" rx="2" ry="3" fill="#8B4513" />
      <ellipse cx="80" cy="110" rx="2" ry="3" fill="#8B4513" />
      <ellipse cx="105" cy="130" rx="2" ry="3" fill="#8B4513" />
    </svg>
  )
}
