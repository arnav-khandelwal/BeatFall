import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import LaserBolt from "./LaserBolt";

export default function ShootingSystem({
  hand,
  setScore,
  enemies,
  damageEnemy,
}) {
  const [lasers, setLasers] = useState([]);
  const lastShot = useRef(0);

  const FIRE_RATE = 200; // ms
  const DAMAGE = 25;

  useFrame(() => {
    if (!hand?.fire) return;

    const now = performance.now();
    if (now - lastShot.current > FIRE_RATE) {
      setLasers(l => [...l, crypto.randomUUID()]);
      lastShot.current = now;
    }
  });

  // Called by LaserBolt
  function handleHit(enemyId, laserId) {
    // laser expired or missed
    if (enemyId == null) {
      setLasers(l => l.filter(id => id !== laserId));
      return;
    }
    damageEnemy(enemyId, DAMAGE);
    const enemy = enemies.find(e => e.id === enemyId);
    if (!enemy) return;

    // scoring 
    if (enemy.health - DAMAGE <= 0) {
      setScore(s => s + 1);
    }

    // remove laser
    setLasers(l => l.filter(id => id !== laserId));
  }

  return (
    <>
      {lasers.map(id => (
        <LaserBolt
          key={id}
          id={id}
          onHit={handleHit}
        />
      ))}
    </>
  );
}
