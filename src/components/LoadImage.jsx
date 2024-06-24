import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { LinearFilter, TextureLoader } from "three";


export default function LoadImage({ file, position, scale, rotation, basic, afterRender }) {
  const texture = useLoader(TextureLoader, file)
  const ref = useRef();

  useEffect(() => {
  if (ref.current) {
    ref.current.traverse(child => {
        if (child.isMesh) {
            child.material.side = 0;
            child.receiveShadow = true;
            
            if (child.material.map)
                child.material.map.minFilter = LinearFilter;
        }

    })
}
  }, [texture])

  useEffect(() => {
    if (afterRender) {
      afterRender(ref.current)
    }
  }, [])
  
  return (
    <mesh position={position} rotation={rotation} scale={scale} ref={ref}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      {basic && <meshBasicMaterial attach="material" map={texture} />}
      {!basic && <meshLambertMaterial attach="material" map={texture} />}
    </mesh>
  )
}