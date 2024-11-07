import { useEffect, useRef } from 'react'
import { useAppContext } from '../context';
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
    const context = useAppContext()

    useEffect(() => {
        if (context.initialCamera) controls?.setTarget(80, 25, 59.5)

        function onDragStart() {
            context.setPan(false)
            clearTimeouts()
        }
        function onDragEnd() {
            timeout = setTimeout(() => {
                controls?.setLookAt(-200, 175, 200, 0, 0, 0,true)
                context.setLookingAt("none")
            }, 10000)
        
            timeout2 = setTimeout(() => {
            context.setPan(true)
            }
            , 15000)
        }

        controls?.addEventListener('controlstart', onDragStart)
        controls?.addEventListener('controlend', onDragEnd)

    return () => {
        controls?.removeEventListener('controlstart', onDragStart)
        controls?.removeEventListener('controlend', onDragEnd)
    }
    
    }, [controls, context.pan])

    useEffect(() => {
        if (!context.initialCamera) {
            context.whoosh.play()

            controls?.moveTo(250, 26, 59.75, true)

            context.toggleTransitionTimeout(true, true)

            setTimeout(() => {
                context.setLookingAt('none')
                controls?.setLookAt(-200, 175, 200, 0, 0, 0,true)
            }, 450)
        }
    }, [context.initialCamera])

    useEffect(() => {
        if (controls) {
            if (!context.transition && (context.lookingAt == "none" || context.lookingAt == 'projects')) {
                controls._addAllEventListeners(controls._domElement)
            } else {
                controls._removeAllEventListeners()
            }
        }
    }, [context.transition])

    useFrame(() => { 
    if(!context.initialCamera && context.pan && cameraRef.current){
        const rotationSpeed = 0.0005
    
        cameraRef.current.rotate(rotationSpeed, 0)
        }
    }, [cameraRef, context.initialCamera])

    
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