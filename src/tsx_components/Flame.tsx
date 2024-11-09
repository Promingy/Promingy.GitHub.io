import { Matrix4, Vector3, Quaternion, InstancedMesh, Mesh } from "three";
import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

const Flame: React.FC = () => {
  const { scene } = useGLTF('src/assets/models/animated_torch_flame1.glb');
  const instancedMeshRef = useRef<InstancedMesh>(null);
  const flamePositionsRef = useRef<Matrix4[]>([]); // Store matrix calculations
  const [frameIndex, setFrameIndex] = useState(0);

  // Populate flamePositionsRef only once
  useEffect(() => {
    flamePositionsRef.current = [
      [-34, 10, -70],
      [48.5, 54, 78.5],
      [48.5, 54, -30.5],
      [-26.5, 54, -66],
      [69, 59, 120],
      [69, 59, -70.5],
      [54, 59, -86],
      [-91.5, 59, -86],
    ].map((position, index) => {
      const scale = index === 0 ? [5, 3, 1] : [2, 0.75, 2];
      return new Matrix4().compose(
        new Vector3(...position),
        new Quaternion(0, 0, 0, 1),
        new Vector3(...scale)
      );
    });
  }, []);

  // Extract mesh for current frame
  const mesh = scene.children[0].children[0].children[0].children[0].children[frameIndex].children[0] as Mesh;
  const { geometry, material } = mesh;

  // Set positions from precomputed matrices
  useEffect(() => {
    if (instancedMeshRef.current) {
      flamePositionsRef.current.forEach((matrix, index) => {
        instancedMeshRef.current?.setMatrixAt(index, matrix);
      });
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [frameIndex]);

  // Animation frame update
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex >= 15 ? 0 : prevIndex + 1));
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <instancedMesh geometry={geometry} material={material} ref={instancedMeshRef} args={[undefined, undefined, 4]} />
  );
};

useGLTF.preload("src/assets/models/animated_torch_flame1.glb");

export default Flame;
