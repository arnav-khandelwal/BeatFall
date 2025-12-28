import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function LaserBolt({ id, onHit }) {
  const meshRef = useRef();
  const { camera, scene } = useThree();

  const direction = useRef(new THREE.Vector3());
  const raycaster = useRef(new THREE.Raycaster());

  const speed = 25;
  const maxDistance = 50;

  // initialize direction ONCE (after camera exists)
  if (camera && direction.current.lengthSq() === 0) {
    direction.current
      .set(0, 0, -1)
      .applyQuaternion(camera.quaternion)
      .normalize();
  }

  useFrame((_, delta) => {
    if (!meshRef.current || !camera) return;

    // move laser forward
    meshRef.current.position.addScaledVector(
      direction.current,
      speed * delta
    );

    // setup raycaster (IMPORTANT for sprites)
    raycaster.current.set(
      meshRef.current.position,
      direction.current
    );
    raycaster.current.camera = camera; // ✅ REQUIRED for sprites

    const hits = raycaster.current.intersectObjects(
      scene.children,
      true
    );

    if (hits.length > 0) {
      let enemy = hits[0].object;

      while (enemy && !enemy.userData?.isEnemy) {
        enemy = enemy.parent;
      }

      onHit(enemy, id);
    }

    // remove laser if too far
    if (
      meshRef.current.position.distanceTo(camera.position) >
      maxDistance
    ) {
      onHit(null, id);
    }
  });

  // start laser from camera position (safe)
  if (!meshRef.current && camera) {
    // handled by R3F on first render
  }

  return (
    <mesh ref={meshRef} position={camera ? camera.position.clone() : [0, 0, 0]}>
      <icosahedronGeometry args={[0.05, 1]} />
      <meshBasicMaterial color="#ffcc00" />
    </mesh>
  );
}
