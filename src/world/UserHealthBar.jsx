
import "../components/UI/HealthBar.css";

export default function HealthBar({ hp }) {
  // Determine color based on health percentage
  const getHealthColor = () => {
    if (hp > 60) return "#2dbf1f"; // Green
    if (hp > 30) return "#ffcc00"; // Yellow
    return "#ff3333";              // Red
  };

  return (
    <div className="health-container">
      <div className="hp-label">{hp}HP</div>
      <div className="bar-wrapper">
        <div 
          className="bar-fill" 
          style={{ 
            width: `${hp}%`, 
            backgroundColor: getHealthColor(),
            boxShadow: `0 0 15px ${getHealthColor()}`
          }}
        />
        {/* Background segments for a "blocky" arcade look */}
        <div className="bar-segments"></div>
      </div>
    </div>
  );
}