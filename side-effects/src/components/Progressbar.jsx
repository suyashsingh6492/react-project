import { useEffect, useState } from "react";

export function Progressbar({timer}) {
    const [remainingTime, setRemainingTime] = useState(timer);
    useEffect(() => {

        const interval = setInterval(() => {
        console.log("INTERVAL")

            setRemainingTime(prevTime => prevTime - 100);
        }, 100);

        return () => { //this will run when this func remove from dom or in next call
            console.log("Cleaning the Interval")
            clearInterval(interval);
        }
    }, []);


    return <progress value={remainingTime} max={timer} />;
}