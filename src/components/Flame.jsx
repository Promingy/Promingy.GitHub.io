// import { useLoader } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { LoopRepeat } from "three";

export default function  Flame({file, position, rotation, scale}) {
    const url = 'models/' + file
    const { scene, animations } = useGLTF(url + '.glb');
    const clone = useMemo(() => scene.clone(true), [scene])
    const flameRef = useRef();
    const { actions } = useAnimations(animations, flameRef)
    useEffect(() => {
        if (actions) {
            Object.values(actions).forEach(action => {
                action.reset().play().setLoop(LoopRepeat);
            })
        }
    }, [animations, clone]);


    return (
        <primitive 
        object={clone}
        ref={flameRef}
        position={position || [0, 0, 0]}
        rotation={rotation || [0, 0, 0]}
        scale={scale || [1, 1, 1]}
        />
    )
}