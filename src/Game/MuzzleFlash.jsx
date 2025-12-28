import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function MuzzleFlash({ onDone }) {
  const ref = useRef();
  const { camera } = useThree();
  const life = useRef(0);

  // attach flash to camera
  useEffect(() => {
    if (ref.current) camera.add(ref.current);
    return () => {
      if (ref.current) camera.remove(ref.current);
    };
  }, [camera]);

  useFrame((_, delta) => {
    life.current += delta;
    if (life.current > 0.05) {
      onDone();
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -0.6]}>
      <planeGeometry args={[0.4, 0.4]} />
      <meshBasicMaterial
        color="red"
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}
