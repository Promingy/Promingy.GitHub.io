import { usePan } from "../main"

export default function StartButton() {
    const { setDisplayStart } = usePan();

    return (
        <div className="start-button-container">
            <button className="start-button" onClick={() => setDisplayStart(false)}>Start</button>
        </div>
    )
}