import { useEffect, useState } from "react"
export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  setTimeout(onTimeout, timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    }
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prevRemainTime => prevRemainTime - 100);
    }, 100);
    return () => {
      clearInterval(interval);
    }; //clean up function

  }, []);


  return <progress id="question-time"
 
    max={timeout}
    value={remainingTime}
    className={mode} />
}