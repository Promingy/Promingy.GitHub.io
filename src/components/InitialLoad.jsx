import { Html, useProgress } from "@react-three/drei"
import { useAppContext } from "../context"
import { useEffect, useState } from "react"

export default function InitialLoad() {
    const { progress } = useProgress()
    const { setDisplayStart, setInitialCamera, setTransition, initialCamera, viewed, setViewed } = useAppContext()

    useEffect(() => {
        if (progress === 100){
            if (!viewed) {
                setDisplayStart(true)
                setViewed(true)
            } else {
                setInitialCamera(false)
                setTransition(true)
            }
        }
    }, [progress, initialCamera])

    return (
        <Html center>
            <p style={{color: "white"}}>Slaying Dragons {Math.trunc(progress)}%</p>
            <p style={{color: "white"}}>Please wait...</p>
        </Html>
    )
}