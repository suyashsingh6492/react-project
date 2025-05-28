import { useState, useCallback, useRef } from "react"

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort((a, b) => Math.random() - 0.5);

    }
    return (
        <ul id="answers">
            {
                shuffledAnswers.current.map((ans) => {
                    let cssClassName = '';
                    const isSelected = selectedAnswer == ans;
                    if (answerState === 'answered' && isSelected) {
                        cssClassName = 'selected';
                    }

                    if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                        cssClassName = answerState;
                    }
                    return (
                        <li key={ans} className="answer">
                            <button onClick={() => onSelect(ans)} className={cssClassName} disabled={answerState!==''}>
                                {ans}
                            </button>
                        </li>
                    );
                })
            }
        </ul>
    );
}