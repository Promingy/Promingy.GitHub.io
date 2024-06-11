import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as Three from "three";


export default function LoadImage({ file, position, scale, rotation, basic }) {
  const url = 'images/' + file
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
      {basic && <meshBasicMaterial attach="material" map={texture} />}
      {!basic && <meshStandardMaterial attach="material" map={texture} />}
    </mesh>
  )
}