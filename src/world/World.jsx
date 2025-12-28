import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Floor from "./Floor";
import CameraRig from "./CameraRig";
import Enemy from "./Enemy";

export default function World({ hand, enemies }) {
  return (
    <Canvas
      camera={{
        fov: 75,
        near: 0.1,
        far: 100,
        position: [0, 1.6, 5],
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      <Suspense fallback={null}>
        <CameraRig hand={hand} />
  
        <Floor />
        
        {/* Render 3D enemies */}
        {enemies && enemies.map(enemy => (
          <Enemy
            key={enemy.id}
            position={enemy.position}
            image={enemy.image}
            size={enemy.size}
          />
        ))}
       
      </Suspense>
    </Canvas>
  );
}
