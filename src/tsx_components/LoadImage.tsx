import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { CSSProperties, useEffect, useRef } from "react";
import { Euler, LinearFilter, Material, Mesh, MeshBasicMaterial, MeshLambertMaterial, TextureLoader, Vector3 } from "three";
import './LoadProject/LoadProject.css'

interface LoadImageProps {
    file: string;
    position: Vector3;
    scale: Vector3;
    rotation: Euler;
    basic: boolean;
}

export default React.memo(function LoadImage({ file, position, scale, rotation, basic }: LoadImageProps) {
    const texture = useLoader(TextureLoader, file);
    const ref = useRef<Mesh>(null);

    useEffect(() => {
        if (ref.current?.material instanceof MeshBasicMaterial  
            || ref.current?.material instanceof MeshLambertMaterial) {
            ref.current.material.map!.minFilter = LinearFilter;
        }
    }, [ref.current]);

    return (
        <>
            {basic && (
                <Html
                    wrapperClass="projectWrapper"
                    transform
                    occlude
                    position={position}
                    rotation={rotation}
                >
                    <p style={style} />
                </Html>
            )}
            <mesh
                receiveShadow={false}
                position={position}
                rotation={rotation}
                scale={scale}
                ref={ref}
            >
                <planeGeometry args={[100, 100]} />
                {basic ? (
                    <meshBasicMaterial map={texture} />
                ) : (
                    <meshLambertMaterial map={texture} />
                )}
            </mesh>
        </>
    );
}, (prevProps, nextProps) => prevProps.file === nextProps.file);

const style: CSSProperties = {
    "height": "270px",
    "width": "480px",
    "opacity": "8%",
    "backgroundImage": "url('https://glb-bucket-portfolio.s3.us-east-2.amazonaws.com/static.gif')"
}