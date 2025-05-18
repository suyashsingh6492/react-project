import {createPortal} from 'react-dom'
export function ResultModel({ ref, targetTime, timeRemaining, onReset }) {

    const userLost = timeRemaining <= 0;
    const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
    const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);
    return createPortal(<dialog ref={ref} className="result-modal" onClose={onReset}>
        {userLost && <h2>Your lost</h2>}
        {!userLost && <h2>Your score: {score}</h2>}

        <p>The target time was <strong>{targetTime} secs</strong></p>
        <p>You stopped the timer <strong>{formattedTimeRemaining}</strong> seconds left. </p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>, document.getElementById('modal'));
} 