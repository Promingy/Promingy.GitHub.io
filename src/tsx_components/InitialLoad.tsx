import { Html, useProgress } from "@react-three/drei"
import { useAppContext } from "../context"
import React, { useEffect, useState } from "react"

/**
 * InitialLoad component
 * This component renders a loading screen with a progress bar.
 * When the progress reaches 100%, it triggers the onStart callback and sets the displayStart, initialCamera and transition states to the correct values.
 *
 * @returns JSX.Element
 */
const InitialLoad: React.FC = () => {
    const { progress } = useProgress()
    const { setDisplayStart, setInitialCamera, setTransition, viewed, setViewed } = useAppContext()

    useEffect(() => {
        // When the progress reaches 100%, trigger the onStart callback and set the displayStart, initialCamera and transition states to the correct values.
        if (progress === 100) {

            if (!viewed) {
                setDisplayStart(true)
            } else {
                setInitialCamera(false)
                setTransition(true)
            }
        }
    }, [progress, setDisplayStart, setInitialCamera, setTransition]);

    return (
        <Html center>
            <p style={{color: "white"}}>
                Slaying Dragons {Math.trunc(progress)}%
            </p>
            <p style={{color: "white"}}>
                Please wait...
            </p>
        </Html>
    )
}

export default InitialLoad