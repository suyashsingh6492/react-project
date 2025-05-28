import QuizCompleteImage from '../assets/quiz-complete.png'
import QUESTIONS from '../questions.js'

export default function Summary({ userAnswer }) {

    const skippedAnswer = userAnswer.filter(answer => answer === null);
    const correctAnswer = userAnswer.filter((answer, index) => QUESTIONS[index].answers[0] === answer);

    const skippedAnswerShared = Math.round((skippedAnswer.length / userAnswer.length) * 100);
    const correctAnswerShared = Math.round((correctAnswer.length / userAnswer.length) * 100);
    const wrongAnswerShared = 100-skippedAnswerShared-correctAnswerShared;

    return (<div id="summary">
        <img src={QuizCompleteImage} alt="Trophy Icon" />
        <h2>Quiz Completed!</h2>
        <div id='summar-stats'>
            <p>
                <span className='number'>{skippedAnswerShared}%</span>
                <span className='text'>Skipped</span>
            </p>
            <p>
                <span className='number'>{correctAnswerShared}%</span>
                <span className='text'>Answered correctly</span>
            </p>
            <p>
                <span className='number'>{wrongAnswerShared}%</span>
                <span className='text'>Answered incorrectly</span>
            </p>
        </div>
        <ol>
            {
                userAnswer.map((answer, index) => {
                    let cssClass = 'user-answer';
                    if (answer === null) {
                        cssClass += ' skipped';
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += ' correct';
                    } else {
                        cssClass = ' wrong';
                    }
                    return (<li key={index}>
                        <h3>{index + 1}</h3>
                        <p className='question'>{QUESTIONS[index].text}</p>
                        <p className={cssClass}>{answer ?? 'Skipped'}</p>
                    </li>);
                })
            }

        </ol>
    </div>);
}