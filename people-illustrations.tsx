export function PeopleIllustrations({ count }: { count: number }) {
  const PersonIcon = ({
    x,
    y,
    color = "#4A90E2",
    scale = 1,
  }: { x: number; y: number; color?: string; scale?: number }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Head */}
      <circle cx="20" cy="15" r="8" fill={color} />
      {/* Body */}
      <rect x="15" y="23" width="10" height="20" rx="5" fill={color} />
      {/* Arms */}
      <rect x="8" y="25" width="6" height="2" rx="1" fill={color} />
      <rect x="26" y="25" width="6" height="2" rx="1" fill={color} />
      {/* Legs */}
      <rect x="17" y="43" width="2" height="12" rx="1" fill={color} />
      <rect x="21" y="43" width="2" height="12" rx="1" fill={color} />
    </g>
  )

  const colors = [
    "#4A90E2", // Blue
    "#E74C3C", // Red
    "#2ECC71", // Green
    "#F39C12", // Orange
    "#9B59B6", // Purple
    "#1ABC9C", // Teal
    "#E67E22", // Dark Orange
    "#34495E", // Dark Blue
    "#E91E63", // Pink
    "#FF5722", // Deep Orange
  ]

  const renderPeople = () => {
    if (count === 0) return null

    const people = []

    if (count <= 6) {
      // Single row for 1-6 people
      for (let i = 0; i < count; i++) {
        people.push(<PersonIcon key={i} x={i * 45} y={0} color={colors[i % colors.length]} />)
      }
    } else if (count === 7) {
      // Two rows: 4 on top, 3 on bottom
      for (let i = 0; i < 4; i++) {
        people.push(<PersonIcon key={i} x={i * 45} y={0} color={colors[i % colors.length]} />)
      }
      for (let i = 4; i < 7; i++) {
        people.push(<PersonIcon key={i} x={(i - 4) * 45 + 22.5} y={70} color={colors[i % colors.length]} />)
      }
    } else if (count === 8) {
      // Pile arrangement: 3 bottom, 3 middle, 2 top
      // Bottom row (3 people)
      for (let i = 0; i < 3; i++) {
        people.push(<PersonIcon key={i} x={i * 45 + 22.5} y={80} color={colors[i % colors.length]} />)
      }
      // Middle row (3 people)
      for (let i = 3; i < 6; i++) {
        people.push(<PersonIcon key={i} x={(i - 3) * 45 + 22.5} y={40} color={colors[i % colors.length]} scale={0.9} />)
      }
      // Top row (2 people)
      for (let i = 6; i < 8; i++) {
        people.push(<PersonIcon key={i} x={(i - 6) * 45 + 45} y={0} color={colors[i % colors.length]} scale={0.8} />)
      }
    } else if (count === 9) {
      // Three rows: 3-3-3
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const index = row * 3 + col
          people.push(<PersonIcon key={index} x={col * 45} y={row * 70} color={colors[index % colors.length]} />)
        }
      }
    } else if (count === 10) {
      // Pile arrangement: 4 bottom, 3 middle, 2 middle-top, 1 top
      // Bottom row (4 people)
      for (let i = 0; i < 4; i++) {
        people.push(<PersonIcon key={i} x={i * 40} y={120} color={colors[i % colors.length]} />)
      }
      // Middle row (3 people)
      for (let i = 4; i < 7; i++) {
        people.push(<PersonIcon key={i} x={(i - 4) * 40 + 20} y={80} color={colors[i % colors.length]} scale={0.9} />)
      }
      // Middle-top row (2 people)
      for (let i = 7; i < 9; i++) {
        people.push(<PersonIcon key={i} x={(i - 7) * 40 + 40} y={40} color={colors[i % colors.length]} scale={0.8} />)
      }
      // Top (1 person)
      people.push(<PersonIcon key={9} x={60} y={0} color={colors[9 % colors.length]} scale={0.7} />)
    } else {
      // For numbers > 10, show a crowd representation
      const rows = Math.ceil(count / 5)
      for (let row = 0; row < rows; row++) {
        const peopleInRow = Math.min(5, count - row * 5)
        for (let col = 0; col < peopleInRow; col++) {
          const index = row * 5 + col
          people.push(
            <PersonIcon key={index} x={col * 35} y={row * 60} color={colors[index % colors.length]} scale={0.8} />,
          )
        }
      }
    }

    return people
  }

  const getViewBox = () => {
    if (count <= 6) return "0 -10 270 80"
    if (count === 7) return "0 -10 270 150"
    if (count === 8) return "0 -10 270 160"
    if (count === 9) return "0 -10 180 220"
    if (count === 10) return "0 -10 180 200"
    // For larger numbers
    const rows = Math.ceil(count / 5)
    return `0 -10 200 ${rows * 60 + 40}`
  }

  return (
    <div className="flex justify-center my-8">
      <div className="flex justify-center items-center">
        <svg viewBox={getViewBox()} className="w-full max-w-md h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {renderPeople()}
        </svg>
      </div>
    </div>
  )
}
