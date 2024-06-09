import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import './LoadProject.css';

export default function LoadProject({ url, model }) {
    const modelURL = 'https://glb-bucket-portfolio.s3-accelerate.amazonaws.com/' + model;
    const gltf = useLoader(GLTFLoader, modelURL);

    return (
        <>
    <primitive object={gltf.scene}
            position={[0, 10, 50]}
            rotation={[0, 0, 0]}
            scale={[25, 25, 25]}
            castShadow
            receiveShadow
    >
            <Html 
                wrapperClass="arcade-machine"
                // position={[-.295, .68, 3.63]}
                distanceFactor={1}
                transform
                // occlude
                >
                <object data={url} />
            </Html>
        </primitive>
        </>
    );
}