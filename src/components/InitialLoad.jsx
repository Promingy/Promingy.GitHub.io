import { Html, useProgress } from "@react-three/drei"
import { useAppContext } from "../context"
import { useState } from "react"

export default function InitialLoad() {
    const { progress } = useProgress()
    const { setDisplayStart } = useAppContext()
    const [viewed, setViewed] = useState(false)

    if (progress === 100 && !viewed) {
        setDisplayStart(true)
        setViewed(true)
    }

    return (
        <Html center>
            <p style={{color: "white"}}>Slaying Dragons {Math.trunc(progress)}%</p>
            <p style={{color: "white"}}>Please wait...</p>
        </Html>
    )
}