import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context';
import { useFrame, useThree } from '@react-three/fiber';
import { CameraControls as CameraJSX } from '@react-three/drei';
import CustomCameraControls from '../classes/CustomCamera';

let timeout: ReturnType<typeof setTimeout>;
let timeout2: ReturnType<typeof setTimeout>;

export function clearTimeouts() {
    clearTimeout(timeout);
    clearTimeout(timeout2);
}

export default function Camera() {
    const cameraRef = useRef<CustomCameraControls>(null);
    const { controls } = useThree() as { controls: CustomCameraControls | undefined };
    const context = useAppContext();

    useEffect(() => {
        if (context.initialCamera) controls?.setTarget(80, 25, 59.5);

        function onDragStart() {
            context.setPan(false);
            clearTimeouts();
        }

        function onDragEnd() {
            timeout = setTimeout(() => {
                controls?.setLookAt(-200, 175, 200, 0, 0, 0, true);
                context.setLookingAt("none");
            }, 10000);
        
            timeout2 = setTimeout(() => {
                context.setPan(true);
            }, 15000);
        }

        controls?.addEventListener('controlstart', onDragStart);
        controls?.addEventListener('controlend', onDragEnd);

        return () => {
            controls?.removeEventListener('controlstart', onDragStart);
            controls?.removeEventListener('controlend', onDragEnd);
        };
    }, [controls, context.pan, context.initialCamera]);

    useEffect(() => {
        if (!context.initialCamera) {
            context.audio.whoosh.play();

            controls?.moveTo(250, 26, 59.75, true);
            context.toggleTransitionTimeout(true, true);

            setTimeout(() => {
                context.setLookingAt('none');
                controls?.setLookAt(-200, 175, 200, 0, 0, 0, true);
            }, 450);
        }
    }, [context.initialCamera]);

    useEffect(() => {
        if (controls && controls instanceof CustomCameraControls) {
            if (!context.transition && (context.lookingAt === "none" || context.lookingAt === 'projects')) {
                (controls).enableAllEventListeners(controls.domElement as HTMLElement);
            } else {
                controls.disableAllEventListeners();
            }
        }
    }, [context.transition]);

    useFrame(() => { 
        if (!context.initialCamera && context.pan && cameraRef.current) {
            const rotationSpeed = 0.0005;
            cameraRef.current.rotate(rotationSpeed, 0);
        }
    });

    return (
        <CameraJSX
            maxDistance={500}
            minDistance={220}
            maxPolarAngle={Math.PI / 2}
            truckSpeed={0}
            smoothTime={1}
            ref={cameraRef}
            makeDefault
        />
    );
}
