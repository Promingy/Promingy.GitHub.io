import { useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react';
import * as Three from 'three'
import { useCursor, useGLTF } from '@react-three/drei';
import { usePan } from '../../main.jsx';

export default function LoadModel({file, position, rotation, scale, canHover, lookAt, moveTo, refToUse}) {
    const url = import.meta.env.VITE_AWS_URL + file
    const { scene } = useGLTF(url);
    const [hovered, setHovered] = useState(false);
    const { controls } = useThree()
    const modelRef = refToUse || useRef();
    const { setPan, whoosh } = usePan();

    useEffect(() => {
        if (modelRef.current) {
            modelRef.current.traverse(child => {
                if (child.isMesh) {
                    child.material.side = Three.FrontSide;
                    
                    if (child.material.map) {
                        child.material.map.minFilter = Three.NearestFilter;
                        child.material.map.magFilter = Three.NearestFilter;
                    }
                    
                    if (!child.material.name.startsWith('lambert1')){
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                }

            })
        }
    }, [scene])


    useCursor(hovered, 'pointer', 'default');

    return (
            <primitive 
                object={scene} 
                ref={modelRef}
                position={position}
                rotation={rotation}
                scale={scale}
                castShadow
                receiveShadow
                onPointerOver={canHover ? () => setHovered(true) : null}
                onPointerOut={canHover ? () => setHovered(false) : null}
                onClick={canHover ? () => {
                    const cTarget = controls._target;
                    const x = cTarget.x != 0;
                    const y = cTarget.y != 0;
                    const z = cTarget.z != 0;

                    setPan(false);
                    
                    whoosh.play();
                    
                    controls._removeAllEventListeners();

                    if (x && y && z) {
                        controls.enabled = true;
                        controls.setLookAt(-200, 175, 200, 0, 0, 0, true).then(() => {
                            controls.enabled = true;
                            controls._addAllEventListeners(controls._domElement);
                            setPan(true);
                        });
                    }
                    else controls.setLookAt(...moveTo, ...lookAt, true).then(() => {
                        // check the updated camera controls - if the target is not 0,0,0 then disable the controls
                        // this if statement prevents a user from stopping the camera from zooming into
                        // a model, then stopping the zoom and still having the camera controls disabled
                        const x = Math.floor(Math.abs(controls.target.x));
                        const y = Math.floor(Math.abs(controls.target.y));
                        const z = Math.floor(Math.abs(controls.target.z));
                        if (x != 0 && y != 0 && z != 0){
                            controls.enabled = false
                        }
                        controls._addAllEventListeners(controls._domElement);
                    })
                } : null}
            />
    )
}