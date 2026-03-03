import {useCallback, useState} from "react";

import QUESTIONS from "../questions.js";
import quizCompletePng from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevState) => {
            return [...prevState, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length ;
    if(quizIsComplete){
        return (
            <div id='summary'>
                <h2>Quiz completed!</h2>
                <img src={quizCompletePng} alt="Trophy icon" />
            </div>
        )
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id='question'>
                <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id='answers'>
                    {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
                        <li className='answer' key={answer}>
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}