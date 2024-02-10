// App.js

import React, { useState } from 'react';
import Question from './Question';
import './question.css';


// const questions = ['How old are you?', 'What is your sex?', 'Are you allergic to any medication?']; // Add your questions
const questions = [
    { question: 'What is your sex?', questionType: 'options1', options: ['I am a male.', 'I am a female.', 'Other'] },
    { question: 'Do you meet the age requirement?', questionType: 'options2', options: ['I am older than 6 years old.', 'I am filling this out for a child younger than 6 years old.'] },
    { question: 'Are you allergic to any medication?', questionType: 'text' },
    { question: 'Please write down any internal bodily functions you would like to improve.', questionType: 'text' }
];

const Form = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState([]);

    const handleNextQuestion = (answer) => {
        setAnswers([...answers, answer]);
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="Form">
            {console.log("answers: ", answers)}
            {currentPage < questions.length ? (
                <Question
                    question={questions[currentPage].question}
                    questionType={questions[currentPage].questionType}
                    options={questions[currentPage].options}
                    onNextQuestion={handleNextQuestion}
                    answers={answers}
                />

            ) : (
                <div>
                    <h1>Thank you for answering all questions!</h1>
                    <ul>
                        {answers.map((answer, index) => (
                            <li key={index}>{`Answer ${index + 1}: ${answer}`}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Form;
