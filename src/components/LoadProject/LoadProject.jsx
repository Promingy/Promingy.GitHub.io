import { Html } from "@react-three/drei";
import { TransformControls } from "@react-three/drei";
import './LoadProject.css';
import { useEffect, useRef } from "react";
import * as Three from 'three';
import { useFrame } from "@react-three/fiber";

export default function LoadProject({ url, position, rotation, scale, occludeRef }) {
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
            position={position}
            rotation={rotation}
            scale={scale}
            ref={ref}
            >
            <Html 
                wrapperClass="project"
                transform
                occlude={occludeRef}
                >
                <object data={url} />
            </Html>
        </mesh>
        </>
    );
}