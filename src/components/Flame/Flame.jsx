import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function  Flame(props) {
    const gltf = useLoader(GLTFLoader, props.url  + '.glb');
    const ref = useRef();

     useFrame((state, delta) => {
        ref.current
    })

    return null
}
