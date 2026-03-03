import {useCallback, useState} from "react";

import QUESTIONS from "../questions.js";
import quizCompletePng from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

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

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id='question'>
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id='answers'>
                    {shuffledAnswers.map((answer) => {
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;

                        let cssClass = "";
                        if(answerState === "answered" && isSelected){
                            cssClass = "selected";
                        }
                        if((answerState === "correct" || answerState === "wrong") && isSelected){
                            cssClass = answerState;
                        }

                        return (<li className='answer' key={answer}>
                            <button
                                onClick={() => handleSelectAnswer(answer)}
                                className={cssClass}
                            >{answer}</button>
                        </li>);
                    })}
                </ul>
            </div>
        </div>
    );
}