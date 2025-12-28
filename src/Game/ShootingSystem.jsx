import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import MuzzleFlash from "./MuzzleFlash";

export default function ShootingSystem({ hand, setScore }) {
  const { camera, scene } = useThree();
  const [flash, setFlash] = useState(false);

  const raycaster = useRef(new THREE.Raycaster());
  const lastShot = useRef(0);

  const FIRE_RATE = 200; 

  function shoot() {
    raycaster.current.setFromCamera({ x: 0, y: 0 }, camera);

    const hits = raycaster.current.intersectObjects(scene.children, true);

    if (hits.length > 0) {
      let enemy = hits[0].object;

      while (enemy && !enemy.userData?.isEnemy) {
        enemy = enemy.parent;
      }

      if (!enemy) return;

      enemy.userData.health -= 25;

      if (enemy.userData.health <= 0) {
        enemy.visible = false;
        setScore(s => s + 1);
      }
    }
  }

  useFrame(() => {
    if (!hand?.fire) return;

    const now = performance.now();

    if (now - lastShot.current > FIRE_RATE) {
      shoot();
      setFlash(true); 
      lastShot.current = now;
    }
  });

  return (
    <>
      {flash && <MuzzleFlash onDone={() => setFlash(false)} />}
    </>
  );
}
