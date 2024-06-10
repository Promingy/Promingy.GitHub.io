import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as Three from "three";


export default function LoadImage({ file, position, scale, rotation }) {
  const url = import.meta.env.VITE_AWS_URL + file
  const texture = useLoader(Three.TextureLoader, url)
  const ref = useRef();

  useEffect(() => {
  if (ref.current) {
    ref.current.traverse(child => {
        if (child.isMesh) {
            child.material.side = Three.FrontSide;
            child.receiveShadow = true;
            
            if (child.material.map)
                child.material.map.minFilter = Three.LinearFilter;
        }

    })
}
  }, [texture])
  
  return (
    <mesh position={position} rotation={rotation} scale={scale} ref={ref}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  )
}