import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { ImageLoader } from "three";

export default function LoadImage() {
    const ref = useRef()

  useFrame(() => {
    console.log(ref)
    if(ref.current){
      const rotationSpeed = 0.001
  
      ref.current.rotate(rotationSpeed, 0)
    }
  })

    return (
      <CameraControls 
        enabled={true}
        maxDistance={333}
        minDistance={170}
        maxPolarAngle={Math.PI / 2}
        truckSpeed={0}
        smoothTime={.5}
        ref={ref}
      />
    );
}