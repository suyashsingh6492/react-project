import { useState, useCallback, useRef } from "react"
import QUESTIONS from '../questions.js'

import Question from "./Question.jsx";
import Summary from "./Summary.jsx";
export default function Quiz() {
    const [userAnswer, setUserAnswer] = useState([]);
     const activeQuestionIndex = userAnswer.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        
        setUserAnswer((prevUserAns) => {
            return [...prevUserAns, selectedAnswer];
        });

      
    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null),); //this will not recreated
    if (quizIsComplete) {
        return <Summary userAnswer={userAnswer} />
    }





    return <div id="quiz">
        <Question
            key={activeQuestionIndex}
            index={activeQuestionIndex}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
        />
    </div>
}