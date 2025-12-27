import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Floor from "./Floor";
import CameraRig from "./CameraRig";

export default function World({ hand }) {
  return (
    <Canvas
      camera={{
        fov: 75,
        near: 0.1,
        far: 100,
        position: [0, 1.6, 5],
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      <Suspense fallback={null}>
        <CameraRig hand={hand} />
  
          <Floor />
       
      </Suspense>
    </Canvas>
  );
}
