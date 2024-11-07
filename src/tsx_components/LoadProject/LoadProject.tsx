import { Html } from "@react-three/drei";
import React from "react";
import './LoadProject.css';

interface LoadProjectProps {
    url: string;
    position: [number, number, number];
    rotation: [number, number, number];
}

export default React.memo(function LoadProject({ url, position, rotation }: LoadProjectProps) {
    return (
        <group position={position} rotation={rotation}>
            <mesh ref={(mesh) => {
                if (mesh) {
                    mesh.rotation.set(-0.25, -0.019, -0.002);
                    mesh.scale.set(0.36, 0.52, 0.09);
                }
            }}>
                <Html
                    wrapperClass="projectWrapper"
                    transform
                    occlude
                >
                    <p className="staticOverlay" />
                    <object className="project" data={url} />
                </Html>
            </mesh>
        </group>
    );
}, (prevProps, nextProps) => prevProps.url === nextProps.url);
