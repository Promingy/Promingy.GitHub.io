import { Html, useProgress } from "@react-three/drei"
import { usePan } from "../main"

export default function InitialLoad() {
    const { active, progress, errors, item, loaded, total} = useProgress()
    const {setDisplayStart} = usePan()

    if (progress === 100) {setDisplayStart(true)}

    return (
        <Html center>
            <p style={{color: "white"}}>Loading {Math.trunc(progress)}%</p>
        </Html>
    )
}