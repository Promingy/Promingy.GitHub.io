import { useLoader } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as Three from 'three'

export default function LoadModel({ url, position, rotation, scale, canHover}) {
    const gltf = useLoader(GLTFLoader, url  + '.glb');
    const modelRef = useRef();
    const [hovered, setHovered] = useState(false)

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

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    },[hovered])

    return (
        <>
          {canHover ? 
            <primitive 
                object={gltf.scene}
                ref={modelRef}
                position={position || [0, 0, 0]}
                rotation={rotation || [0, 0, 0]}
                scale={scale || [1, 1, 1]}
                castShadow
                receiveShadow
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            />
                 :
            <primitive 
                object={gltf.scene}
                ref={modelRef}
                position={position || [0, 0, 0]}
                rotation={rotation || [0, 0, 0]}
                scale={scale || [1, 1, 1]}
                castShadow
                receiveShadow
                />

                 }
        </>
    )
}