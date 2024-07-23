import { Html, useProgress } from "@react-three/drei"
import { useAppContext } from "../context"
import React, { useEffect, useState } from "react"

const InitialLoad: React.FC = () => {
    const { progress } = useProgress()
    const { setDisplayStart } = useAppContext()
    const [viewed, setViewed] = useState<boolean>(false)
    useEffect(() => {
        if (progress === 100 && !viewed) {
            setDisplayStart(true)
            setViewed(true)
        }
    }, [progress, setDisplayStart, viewed]);

    return (
        <Html center>
            <p style={{color: "white"}}>Slaying Dragons {Math.trunc(progress)}%</p>
            <p style={{color: "white"}}>Please wait...</p>
        </Html>
    )
}

export default InitialLoad