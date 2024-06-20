
export default function Lights(props) {
    return (
        <pointLight 
            position={props.position} 
            color={props.color || 0xF07F13}
            intensity={props.intensity} 
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-far={2000}
            shadow-bias={-0.0001}
            decay={props.decay || 2}
            rotateX={props.rotateX}
            castShadow={props.shadow}
            />
    )
}