import { useLoader } from '@react-three/fiber'
import { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as Three from 'three'

export default function LoadModel(props) {
    const gltf = useLoader(GLTFLoader, props.url  + '.glb');
    const modelRef = useRef();

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
    }, [gltf])

    return (
            <primitive 
                object={gltf.scene}
                ref={modelRef}
                position={props.position || [0, 0, 0]}
                rotation={props.rotation || [0, 0, 0]}
                scale={props.scale || [1, 1, 1]}
                castShadow
                receiveShadow
                 />
    )
}