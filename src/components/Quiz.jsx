import {useCallback, useState} from "react";

import QUESTIONS from "../questions.js";
import quizCompletePng from "../assets/quiz-complete.png";
import Question from "./Question.jsx";


export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevState) => {
            return [...prevState, selectedAnswer];
        });
    }, [activeQuestionIndex]);

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

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionIndex={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}