import { Html } from "@react-three/drei";
import { TransformControls } from "@react-three/drei";
import './LoadProject.css';
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function LoadProject({ url, position, rotation, scale }) {
    const ref = useRef();
    // const tref = useRef();

    // useFrame(() => {
    //     if (ref.current)
    //         ref.current.updateMatrixWorld();
    //         console.log(ref.current.position)
    // })


    return (
        <mesh
            position={position}
            rotation={rotation}
            scale={scale}
            ref={ref}
            >
        <Html 
            wrapperClass="project"
            transform
            occlude
            >
            <p/>
            <object data={url} />
        </Html>
    </mesh>
    );
}