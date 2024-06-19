// import { useLoader } from "@react-three/fiber";
import { Matrix4, Vector3, Quaternion } from "three";
import { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function Flame() {
    const { scene, animations } = useGLTF('models/animated_torch_flame1.glb');
    const ref = useRef();
    const [i, setI] = useState(0)
    const [render, setRender] = useState(0)
    const geometry = scene.children[0].children[0].children[0].children[0].children[i].children[0].geometry
    const material = scene.children[0].children[0].children[0].children[0].children[i].children[0].material

    const positions = [
        [-34, 10, -70],
        [48.5, 54, 78.5],
        [48.5, 54, -30.5],
        [-26.5, 54, -66],
        [69, 59, 120],
        [69, 59, -70.5],
        [54, 59, -86],
        [-91.5, 59, -86]
    ]

    useEffect(() => {
        for (let i = 0; i < positions.length; i++) {
            const scale = i ? [2, .75, 2] : [5, 3, 1]
            const matrix = new Matrix4().compose(
                new Vector3(...positions[i]),
                new Quaternion(0, 0, 0, 1),
                new Vector3(...scale)
            )
            ref.current.setMatrixAt(i, matrix)
        }
        ref.current.instanceMatrix.needsUpdate = true
    }, [])


    // useEffect(() => {

    //     setRender(r => {
    //         if (r >= 2000) {
    //             setI(i => i >= 15 ? 0 : i + 1);
    //             return 0;
    //         }
    //         return r + 1;
    //     })
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
