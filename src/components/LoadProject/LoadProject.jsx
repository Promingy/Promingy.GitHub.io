import { Html, TransformControls } from "@react-three/drei";
import './LoadProject.css';
import { useEffect, useRef, useState } from "react";

export default function LoadProject({ url, position, rotation, scale }) {
    const ref = useRef();
    // const tref = useRef();
    // const [occlude, setOcclude] = useState(false);

    // useEffect(() => {
    //     if (ref.current)
    //         ref.current.updateMatrixWorld();
    //         console.log('position', ref.current?.position)
    //         console.log('rotation', ref.current?.rotation)
    //         console.log('scale', ref.current?.scale)
    // },[ref.current])

    return (
        <group position={[84, 25.5, position[2]]} rotation={[0,Math.PI/2,0]}>
            <mesh ref={ref} rotation={[-0.25,-0.019,-0.002]} scale={[.36, .52, .09]}>
            <Html
                wrapperClass="project"
                transform
                occlude
                >
                    <p/>
                    <object data={url} />
                </Html>
                </mesh>
            </group>
    )
}