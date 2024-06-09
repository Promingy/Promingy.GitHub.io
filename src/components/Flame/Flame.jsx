// import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as Three from 'three'

export default function  Flame({file, position, rotation, scale}) {
    const url = 'https://glb-bucket-portfolio.s3-accelerate.amazonaws.com/' + file
    const { scene, animations } = useGLTF(url + '.glb');
    const flameRef = useRef();
    const { actions } = useAnimations(animations, flameRef)
    useEffect(() => {
        if (actions) {
            Object.values(actions).forEach(action => {
                action.reset().play().setLoop(Three.LoopRepeat);
            })
        }

    }, [animations, scene]);


    return (
        <primitive 
        object={scene.clone()}
        ref={flameRef}
        position={position || [0, 0, 0]}
        rotation={rotation || [0, 0, 0]}
        scale={scale || [1, 1, 1]}
        castShadow
        receiveShadow
        />

    )
}
