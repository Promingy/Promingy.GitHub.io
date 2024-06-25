import { usePan } from "../main"

export default function StartButton({afterRender}) {
    const { setDisplayStart, setInitialCamera, setLookingAt } = usePan();

    function handleClick() {
        afterRender();
        setDisplayStart(false);
        setInitialCamera(false);
        setLookingAt('none');
    }

    return (
        <div className="start-button-container">
            <button className="start-button" onClick={handleClick}>Start</button>
        </div>
    )
}