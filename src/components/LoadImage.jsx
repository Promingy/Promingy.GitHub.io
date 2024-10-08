import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { LinearFilter, TextureLoader } from "three";


export default function LoadImage({ file, position, scale, rotation, basic }) {
  const texture = useLoader(TextureLoader, file)
  const ref = useRef();

  useEffect(() => {
    ref?.current.traverse(child => {
        if (child.isMesh) 
          child.material.map.minFilter = LinearFilter;
    })
  }, [ref.current])
  
  return (
    <mesh receiveShadow={false} position={position} rotation={rotation} scale={scale} ref={ref}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      {basic && <meshBasicMaterial attach="material" map={texture} />}
      {!basic && <meshLambertMaterial attach="material" map={texture} />}
    </mesh>
  )
}