// App.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

import Question from './Question';
import './question.css';
import { createQuestionAPIMethod } from "../../api/question";
import Lottie from "lottie-react";
import landingData1 from "../../assets/Lottie/ProcessIndicator.json";


// const questions = ['How old are you?', 'What is your sex?', 'Are you allergic to any medication?']; // Add your questions
const questions = [
    { question: 'What is your sex?', questionType: 'options1', options: ['I am a male.', 'I am a female.', 'Other'] },
    { question: 'Do you meet the age requirement?', questionType: 'options2', options: ['I am older than 6 years old.', 'I am filling this out for a child 6 years old or younger.'] },
    { question: 'Are you allergic to any medication?', questionType: 'text' },
    { question: 'Please write down any internal bodily functions you would like to improve.', questionType: 'text' }
];

const Form = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const { userId } = useParams();
    const authUserId = useSelector((state) => state.user.id)

    const style = {
        height: 50,
        width: 50,
    };

    useEffect(() => {
        if (userId !== authUserId) {
            navigate("/");
        }
    }, []);

    const handleNextQuestion = (answer) => {
        setAnswers([...answers, answer]);
        setCurrentPage(currentPage + 1);
    };

    const handleSubmit = () => {
        setSubmitLoading(true);

        const question = {
            gender: answers[0],
            age: answers[1],
            allergies: answers[2],
            description: answers[3]
        };

        createQuestionAPIMethod(question)
            .then((response) => {
                if (response.ok) {
                    console.log("A form has been submitted.");
                } else {
                    setErrorMessage("Error submitting the form. Please try again.");
                }
            })
            .catch((err) => {
                console.error("Error during submission:", err);
                setErrorMessage("Something went wrong during submission. Please try again.");
            })
            .finally(() => {
                setSubmitLoading(false);
            });
    }

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
                    currentPage={currentPage}
                />

            ) : (
                <div className='review-container'>
                    <div className='review'>
                        <h1>We appreciate your cooperation.</h1>
                        <ul>
                            {answers.map((answer, index) => (
                                <div>{`${index + 1}. ${answer}`}</div>
                            ))}
                        </ul>

                        {errorMessage && (
                            <div className="pwd_err ui negative mini message">
                                {errorMessage}
                            </div>
                        )}

                        {submitLoading ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                }}
                            >
                                <Lottie animationData={landingData1} style={style} />
                            </div>
                        ) : (
                            <Button variant="contained" style={{ backgroundColor: "black" }} onClick={handleSubmit}>Submit</Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Form;
