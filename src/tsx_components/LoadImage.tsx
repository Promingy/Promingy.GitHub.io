import { useLoader } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Euler, LinearFilter, TextureLoader, Vector3 } from "three";

interface LoadImageProps {
    file: string;
    position: Vector3;
    scale: Vector3;
    rotation: Euler;
    basic: boolean;
}

export default function LoadImage({ file, position, scale, rotation, basic }: LoadImageProps) {
    const texture = useLoader(TextureLoader, file);
    const ref = useRef<any>(null);

    useEffect(() => {
        ref?.current.traverse((child: any) => {
        if (child.isMesh) {
            child.material.map.minFilter = LinearFilter;
        }
        });
    }, [ref.current]);

    return (
        <mesh receiveShadow={false} position={position} rotation={rotation} scale={scale} ref={ref}>
        <planeGeometry attach="geometry" args={[100, 100]} />
        {basic && <meshBasicMaterial attach="material" map={texture} />}
        {!basic && <meshLambertMaterial attach="material" map={texture} />}
        </mesh>
    );
}