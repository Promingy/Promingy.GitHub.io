import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context';
import { useFrame, useThree } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import CC from 'camera-controls';


let timeout: ReturnType<typeof setTimeout>;
let timeout2: ReturnType<typeof setTimeout>;

export function clearTimeouts() {
    clearTimeout(timeout);
    clearTimeout(timeout2);
}

const getControlActions = (enabled: boolean) => ({
    mouseButtons: enabled ?
    {
        left: CC.ACTION.ROTATE,
        right: CC.ACTION.ROTATE,
        middle: CC.ACTION.DOLLY,
        wheel: CC.ACTION.DOLLY
    } : {
        left: CC.ACTION.NONE,
        right: CC.ACTION.NONE,
        middle: CC.ACTION.NONE,
        wheel: CC.ACTION.NONE
    },
    touches: enabled ?
    {
        one: CC.ACTION.TOUCH_ROTATE,
        two: CC.ACTION.TOUCH_DOLLY_TRUCK,
        three: CC.ACTION.TOUCH_ZOOM_TRUCK
    } : {
        one: CC.ACTION.NONE,
        two: CC.ACTION.NONE,
        three: CC.ACTION.NONE
    }
})

/**
 * Camera component
 * This component manages the camera controls and interactions for a 3D scene.
 * It utilizes the context to manage state and events related to camera movements.
 *
 * @returns JSX.Element - The CameraControls component with configured settings.
 */

export default function Camera() {
    const { controls } = useThree() as { controls: CameraControls };
    const [controlsEnabled, setControlsEnabled] = useState(false);
    const context = useAppContext();
    const cameraRef = useRef<CameraControls>(null);

    // Retrieves control actions based on whether controls are enabled
    const controlActions = getControlActions(controlsEnabled);

    // Effect to set initial camera target and handle drag events
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

    // Effect to manage audio and camera movements when the initial camera is disabled
    useEffect(() => {
        const initializeCamera = () => {
            context.audio.whoosh.play();
            controls?.moveTo(250, 26, 59.75, true);
            context.toggleTransitionTimeout(true, true);
            
            setTimeout(() => {
                context.setLookingAt('none');
                controls?.setLookAt(-200, 175, 200, 0, 0, 0, true);
            }, 450);
        }
            
        if (!context.initialCamera) {
            initializeCamera()
        }
    }, [context.initialCamera]);

    // Effect to enable or disable camera controls based on the current transition state
    useEffect(() => {
        if (controls) {
            if (!context.transition && (context.lookingAt === "none" || context.lookingAt === 'projects')) {
                setControlsEnabled(true);
            } else {
                setControlsEnabled(false);
            }
        }
    }, [context.transition]);

    // Frame-based effect to rotate the camera when panning is enabled
    useFrame(() => { 
        if (!context.initialCamera && context.pan && cameraRef.current) {
            const rotationSpeed = 0.0005;
            cameraRef.current.rotate(rotationSpeed, 0);
        }
    });


    // Render the CameraControls component with specified properties
    return (
        <CameraControls
            maxDistance={500}
            minDistance={220}
            maxPolarAngle={Math.PI / 2}
            truckSpeed={0}
            smoothTime={1}
            ref={cameraRef}
            makeDefault
            {...controlActions}
        />
    );
}
 