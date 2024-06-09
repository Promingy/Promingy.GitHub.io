import { useLoader, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as Three from 'three'

export default function LoadModel({file, position, rotation, scale, canHover, lookAt, moveTo, refToUse}) {
    const url = 'https://glb-bucket-portfolio.s3-accelerate.amazonaws.com/' + file
    const gltf = useLoader(GLTFLoader, url);
    const [hovered, setHovered] = useState(false)
    const { controls } = useThree()
    const modelRef = refToUse || useRef();

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
                        // child.castShadow = true;
                        // child.receiveShadow = true;
                    }
                }

            })
        }
    }, [gltf])

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'default'
    },[hovered])

    return (
            <primitive 
                object={gltf.scene}
                ref={modelRef}
                position={position || [0, 0, 0]}
                rotation={rotation || [0, 0, 0]}
                scale={scale || [1, 1, 1]}
                castShadow
                receiveShadow
                onPointerOver={canHover ? () => setHovered(true) : null}
                onPointerOut={canHover ? () => setHovered(false) : null}
                onClick={canHover ? () => {
                    const cTarget = controls._target;
                    const x = cTarget.x != 0;
                    const y = cTarget.y != 0;
                    const z = cTarget.z != 0;
                    
                    if (x && y && z) {
                        controls.enabled = true
                        controls.setLookAt(-200, 175, 200, 0, 0, 0, true)
                    }
                    else controls.setLookAt(...moveTo, ...lookAt, true).then(() => {
                        // check the updated camera controls - if the target is not 0,0,0 then disable the controls
                        // this if statement prevents a user from stopping the camera from zooming into
                        // a model, then stopping the zoom and still having the camera controls disabled
                        if (controls.target.x != 0 && controls.target.y != 0 && controls.target.z != 0){
                            controls.enabled = false
                        }
                    })
                } : null}
            />
    )
}