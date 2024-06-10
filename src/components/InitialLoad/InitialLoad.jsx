import { Html, useProgress } from "@react-three/drei"

export default function InitialLoad() {
    const { active, progress, errors, item, loaded, total} = useProgress()


    return (
        <Html center>
            <p style={{color: "white"}}>Loading {Math.trunc(progress)}%</p>
            <p style={{color: "red"}}>{errors}</p>
        </Html>
    )
}