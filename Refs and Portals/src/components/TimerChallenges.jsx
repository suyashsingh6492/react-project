import { useState, useRef } from "react";
import { ResultModel } from "./ResultModel.jsx";

export function TimerChallege({ title, targetTime }) {
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000); //in milis

    const timer = useRef();
    const dialog = useRef();

    const timerIsActive=timeRemaining>0 && timeRemaining < targetTime*1000;
    
    if(timeRemaining<=0){
        clearInterval(timer.current);
        dialog.current.showModal();
    }

    function handleReset(){
        setTimeRemaining(targetTime*1000);
    }
    function handleStart() {
        // timer.current = setTimeout(() => {
        //     setTimerExpired(true);
        //     dialog.current.showModal();
        // }, targetTime * 1000);
        
          timer.current = setInterval(() => { 
            setTimeRemaining((prevTimeRemaining)=>prevTimeRemaining-100)
            setTimerExpired(true);
           
        },  100);

       // setTimerStarted(true);  

    }

    function handleStop() {
       // clearTimeout(timer.current);
        clearInterval(timer.current);
         dialog.current.showModal();
    }
    return <>
        <ResultModel ref={dialog} targetTime={targetTime}  timeRemaining={timeRemaining} onReset={handleReset}/>
        <section className="challenge">
            <h2>{title}</h2>
            {timerExpired && <p>You lost!</p>}
            <p className="challenge-time"> {targetTime} second{targetTime > 1 ? 's' : ''} </p>
            <p><button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop' : 'Start'} Challenge</button></p>
            <p className={timerIsActive ? 'active' : ''}>
                {timerIsActive ? 'Time is running...' : 'Timer inactive'}
            </p>
        </section></>
}