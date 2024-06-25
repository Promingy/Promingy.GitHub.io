import { useEffect, useRef } from 'react'
import { usePan } from '../main';
import { useFrame, useThree } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';

let timeout, timeout2;

export function clearTimeouts() {
    clearTimeout(timeout);
    clearTimeout(timeout2);
}
export default function Camera() {
    
    const cameraRef = useRef();
    const { controls } = useThree();
    const { pan, setPan, initialCamera, transition, setTransition, whoosh } = usePan()

    useEffect(() => {
    function onDragStart() {
        setPan(false)
        clearTimeouts()
    }
    function onDragEnd() {
        timeout = setTimeout(() => {
            controls.reset(true)
        }, 10000)
    
        timeout2 = setTimeout(() => {
        setPan(true)
        }
        , 15000)
    }

        controls?.addEventListener('controlstart', onDragStart)
        controls?.addEventListener('controlend', onDragEnd)

    return () => {
        controls?.removeEventListener('controlstart', onDragStart)
        controls?.removeEventListener('controlend', onDragEnd)
    }
    
    }, [controls, pan])

    useEffect(() => {
        if (initialCamera) {
            controls?.setLookAt(87.7, 26, 49.75, 80, 25, 49.8, false)
        } else {
            setTransition(true)
            whoosh.play()

            controls?.setLookAt(250, 26, 49.75, 80, 25, 49.8, true)
            setTimeout(() => {
                controls?.reset(true)
                .then(() => setTransition(false))
            }, 450)
        }
    }, [controls, initialCamera])

    useEffect(() => {
        if (controls) {
            const x = Math.floor(Math.abs(controls._target.x))
            const y = Math.floor(Math.abs(controls._target.y))
            const z = Math.floor(Math.abs(controls._target.z))

            if (!transition && !x && !y && !z) {
                controls._addAllEventListeners(controls._domElement)
            } else {
                controls._removeAllEventListeners()
            }
        }
    }, [transition, controls])

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