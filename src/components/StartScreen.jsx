import { useAppContext } from "../context"

export default function StartButton({afterRender}) {
    const { setDisplayStart, setInitialCamera, setTransition } = useAppContext();

    function handleClick() {
        afterRender();
        setDisplayStart(false);
        setInitialCamera(false);
        setTransition(true)
    }

    return (
        <div className="start-button-container">
            <button className="start-button" onClick={handleClick}>Start</button>
        </div>
    )
}