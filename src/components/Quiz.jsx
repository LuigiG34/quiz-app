import {useCallback, useState} from "react";

import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";


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
            <Summary userAnswers={userAnswers} />
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