import { usePan } from "../main"

export default function StartButton({afterRender}) {
    const { setDisplayStart } = usePan();

    function handleClick() {
        afterRender();
        setDisplayStart(false)
    }

    return (
        <div className="start-button-container">
            <button className="start-button" onClick={handleClick}>Start</button>
        </div>
    )
}