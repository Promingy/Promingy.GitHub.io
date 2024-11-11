import { useAppContext } from "../context";
import React, { useCallback } from 'react'


/**
 * StartScreenButton component
 * This component renders a start button which triggers the onStart callback once clicked.
 * It also handles the start animation by setting the displayStart, initialCamera and transition states to the correct values.
 *
 * @param {{ onStart: () => void }} props - The props object
 * @param {() => void} props.onStart - The callback to be executed when the button is clicked
 */
export default function StartButton({ onStart }: { onStart: () => void }) {
    const { setDisplayStart, setInitialCamera, setTransition, audio, setViewed } = useAppContext();

    // Handles the click event of the start button
    // Plays the click and fire sounds, triggers the onStart callback and sets the displayStart, initialCamera and transition states to the correct values
    const handleClick = useCallback(() => {
        audio.click.play();
        audio.fire.play();
        onStart();
        setDisplayStart(false);
        setInitialCamera(false);
        setTransition(true);
        setViewed(true);
    }, [audio, onStart, setDisplayStart, setInitialCamera, setTransition]);

    return (
        <div className="start-button-container">
            <button className="start-button" onClick={handleClick}>
                Start
            </button>
        </div>
    );
}
