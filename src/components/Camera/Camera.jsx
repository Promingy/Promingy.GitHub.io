import { useEffect, useRef } from 'react'
import { usePan } from '../../main';
import { useFrame, useThree } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';

let timeout, timeout2;

export function clearTimeouts() {
  clearTimeout(timeout)
  clearTimeout(timeout2)
}
export default function Camera() {
    
    const cameraRef = useRef();
    const { controls } = useThree();
    const { pan, setPan } = usePan()

    useEffect(() => {
    function onDragStart() {
        setPan(false)
        clearTimeout(timeout)
        clearTimeout(timeout2)
    }

    function onDragEnd() {
        timeout = setTimeout(() => {
        controls.setLookAt(-200, 175, 200, 0, 0, 0, true)
        }, 10000)
    
        timeout2 = setTimeout(() => {
        setPan(true)
        }
        , 15000)
    }

    if (controls) {
        controls.addEventListener('controlstart', onDragStart)
        controls.addEventListener('controlend', onDragEnd)
    }

    return () => {
        if (controls) {
        controls.removeEventListener('controlstart', onDragStart)
        controls.removeEventListener('controlend', onDragEnd)
        }
    }
    
    }, [controls])


    useFrame(() => { 
    if(cameraRef.current && pan){
        const rotationSpeed = 0.001
    
        cameraRef.current.rotate(rotationSpeed, 0)
        }
    }, [cameraRef])

    
    return <CameraControls 
        maxDistance={500}
        minDistance={220}
        maxPolarAngle={Math.PI / 2}
        truckSpeed={0}
        smoothTime={1}
        ref={cameraRef}
        makeDefault
    />
}