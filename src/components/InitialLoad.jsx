import { Html, useProgress } from "@react-three/drei"
import { useAppContext } from "../context"

export default function InitialLoad() {
    const { active, progress, errors, item, loaded, total} = useProgress()
    const { setDisplayStart } = useAppContext()

    if (progress === 100) setDisplayStart(true)

    return (
        <Html center>
            <p style={{color: "white"}}>Slaying Dragons {Math.trunc(progress)}%</p>
            <p style={{color: "white"}}>Please wait...</p>
        </Html>
    )
}