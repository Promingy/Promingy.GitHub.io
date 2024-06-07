// import { useLoader } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as Three from 'three'
import { useFrame } from "@react-three/fiber";

export default function  Flame(props) {
    const { scene, animations } = useGLTF(props.url + '.glb');
    const flameRef = useRef();
    // const { actions } = useAnimations(animations, ref)
    const mixerRef = useRef();
    useEffect(() => {
        if (!scene || !animations) return;

        mixerRef.current = new Three.AnimationMixer(scene);

        animations.forEach(child => {
            const action = mixerRef.current.clipAction(child);
            action.play().setLoop(Three.LoopRepeat);
        })

        return () => mixerRef.current.stopAllAction();
    // play animations
        // const actions = animations.map(animation => {
        //     const action = mixer.clipAction(animation, flameRef.current);
        //     action.play();
        //     return action;
        // });

        // if (actions) {
        //     Object.values(actions).forEach(action => {
        //         action.play().setLoop(Three.LoopRepeat);
        //     })
        // }

        // return () => MixOperation.stopAllAction();

    }, [animations, scene]);

    useFrame((state, delta) => {
        if (mixerRef.current) {
            mixerRef.current.update(delta);
        }
    });

    return (
        <primitive 
        object={scene}
        ref={flameRef}
        position={props.position || [0, 0, 0]}
        rotation={props.rotation || [0, 0, 0]}
        scale={props.scale || [1, 1, 1]}
        castShadow
        receiveShadow
        />

    )
}
