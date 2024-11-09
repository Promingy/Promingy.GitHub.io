import { Html } from "@react-three/drei";
import './LoadProject.css';

export default function LoadProject({ url, position, rotation }) {
    return (
        <group position={position} rotation={rotation}>
            <mesh rotation={[-0.25,-0.019,-0.002]} scale={[.36, .52, .09]}>
                <Html
                    wrapperClass="projectWrapper"
                    transform
                    occlude
                    >
                        <p className="staticOverlay"/>
                        <object className="project" data={url} />
                </Html>
            </mesh>
        </group>
    )
}