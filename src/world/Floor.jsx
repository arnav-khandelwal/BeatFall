import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Floor() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.emissiveIntensity =
        0.4 + Math.sin(clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
    >
      <planeGeometry args={[30, 30, 64, 64]} />
      <meshStandardMaterial
        color="#050505"
        emissive="#00ffff"
        wireframe
      />
    </mesh>
  );
}
