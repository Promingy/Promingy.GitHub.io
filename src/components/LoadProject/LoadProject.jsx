import { Float, Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import './LoadProject.css';

export default function LoadProject({ url }) {
    return (
        <mesh>
            <Html 
                wrapperClass="arcade-machine"
                position={[0, .43, 3.684]}
                transform
                occlude
                >
                <object data={url} />
            </Html>
        </mesh>
    );
}