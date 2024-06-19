// import { useLoader } from "@react-three/fiber";
import { useRef, useEffect, useMemo, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { LoopRepeat, Matrix4, Vector3, Quaternion } from "three";
export function  Flame1({file, position, rotation, scale}) {
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

export default function Flame({file, position, rotation, scale}) {
    const { scene, animations } = useGLTF('models/animated_torch_flame1.glb');
    const ref = useRef();
    const [i, setI] = useState(0)
    const [render, setRender] = useState(0)
    const geometry = scene.children[0].children[0].children[0].children[0].children[i].children[0].geometry
    const material = scene.children[0].children[0].children[0].children[0].children[i].children[0].material

    const positions = {
        0: [-34, 10, -70],
        1: [48.5, 54, 78.5],
        2: [48.5, 54, -30.5],
        3: [-26.5, 54, -66],
        4: [69, 59, 120],
        5: [69, 59, -70.5],
        6: [54, 59, -86],
        7: [-91.5, 59, -86]
    }

    useEffect(() => {
        for (let i = 0; i < 8; i++) {
            // const matrix = new Matrix4().makeTranslation(positions[i][0], positions[i][1], positions[i][2])
            scale = i ? [2, .75, 2] : [5, 3, 1]
            const matrix = new Matrix4().compose(
                new Vector3(positions[i][0], positions[i][1], positions[i][2]),
                new Quaternion(0, 0, 0, 1),
                new Vector3(...scale)
            )
            ref.current.setMatrixAt(i, matrix)
        }
        ref.current.instanceMatrix.needsUpdate = true
    }, [scene])


    // useEffect(() => {
    //     if (i == 16) setI(0)
            
    //     if (render == 0) setI((i) => i + 1)
            
    //     setRender((render) => render >= 2000 ? 0: render + 1)
    // }, [render])

    useEffect(() => {
        let interval = setInterval(() => {
            setI(i => i > 15 ? 0 : i + 1)
        }, 100)

        return () => clearInterval(interval)
    }, [])

    return (
        <instancedMesh geometry={geometry} material={material} ref={ref} args={[null, null, 4]} />
    )
}
