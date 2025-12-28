import { OrbitControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function CameraRig({ hand }) {
  const controls = useRef();
  const { camera } = useThree();
  const lastRotation = useRef(0); // Store last rotation
  const lastPitch = useRef(0); // Store last pitch
  const MAX_PITCH = Math.PI / 20;
  useFrame(() => {
    if (hand?.active) {
      const yaw = (hand.x - 0.5) * Math.PI * 5; 
      camera.rotation.y = yaw;
      lastRotation.current = yaw; 

      let pitch = (hand.y - 0.5) * Math.PI * 2;
      pitch = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, pitch));
      camera.rotation.x = pitch;
      lastPitch.current = pitch;
    } else {
      camera.rotation.y = lastRotation.current;
      camera.rotation.x = lastPitch.current;
    }
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
