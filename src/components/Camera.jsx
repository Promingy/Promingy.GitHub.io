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
    const { pan, setPan, initialCamera, transition, setTransition, whoosh, setLookingAt, setDefaultImage } = usePan()

    useEffect(() => {
        if (initialCamera) controls?.setTarget(80, 25, 49.5)

        function onDragStart() {
            setPan(false)
            clearTimeouts()
        }
        function onDragEnd() {
            timeout = setTimeout(() => {
                controls.setLookAt(-200, 175, 200, 0, 0, 0,true)
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
        if (!initialCamera) {
            whoosh.play()

            controls.setLookAt(250, 26, 49.75, 80, 25, 49.5, true)

            setTimeout(() => {
                setLookingAt('none')
                controls?.setLookAt(-200, 175, 200, 0, 0, 0,true)
                .then(() => {setTransition(false); setDefaultImage(true)})
            }, 450)
        }
    }, [initialCamera])

    useEffect(() => {
        if (controls) {
            const { x, y, z } = controls.getTarget();

            if (!transition && !x && !y && !z) {
                controls._addAllEventListeners(controls._domElement)
            } else {
                controls._removeAllEventListeners()
            }
        }
    }, [transition])

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