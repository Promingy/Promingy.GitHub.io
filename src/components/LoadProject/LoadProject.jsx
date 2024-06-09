import { Html } from "@react-three/drei";
import { TransformControls } from "@react-three/drei";
import './LoadProject.css';
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function LoadProject({ url, position, rotation, scale }) {
    const ref = useRef();
    const tref = useRef();

    // useFrame(() => {
    //     if (ref.current)
    //         ref.current.updateMatrixWorld();
    //         console.log(ref.current.position)
    // })
    return (
        <>
        {/* <TransformControls 
        ref={tref} 
        object={ref.current}
        /> */}

        <mesh
            position={[85.2, 27.8, 0]}
            rotation={[-1.418, 1.368, 1.414]}
            scale={[.425, .5, .1]}
            ref={ref}
            >
            <Html 
                as='div'
                wrapperClass="project"
                transform
                occlude
                >
                <object data={url} />
            </Html>
        </mesh>
        </>
    );
}