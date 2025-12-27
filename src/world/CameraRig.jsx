import { OrbitControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function CameraRig({ hand }) {
  const controls = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (!hand?.active) return;

    const yaw = (hand.x - 0.5) * Math.PI * 2; 
    camera.rotation.y = yaw;
  });

  return (
    <OrbitControls
      ref={controls}
      target={[0, 1.6, 0]}
      enablePan={false}
      enableZoom={false}
      enableRotate={false} 
    />
  );
}
