import {useCallback, useState} from "react";

import QUESTIONS from "../questions.js";
import quizCompletePng from "../assets/quiz-complete.png";
import Question from "./Question.jsx";


export default function Quiz() {
    const [answerState, setAnswerState] = useState("")
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = answerState === "" ? userAnswers.length : userAnswers.length -1;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers((prevState) => {
            return [...prevState, selectedAnswer];
        });

        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correct');
            }else{
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000);
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
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                onSelectAnswer={handleSelectAnswer}
                answerState={answerState}
                selectedAnswer={userAnswers[userAnswers.length -1]}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}