// App.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Question from './Question';
import './question.css';
import { createQuestionAPIMethod, getRecommendationAPIMethod } from "../../api/question";
import Lottie from "lottie-react";
import landingData1 from "../../assets/Lottie/ProcessIndicator.json";
import Loader from '../loader/Loader';

// const questions = ['How old are you?', 'What is your sex?', 'Are you allergic to any medication?']; // Add your questions
const questions = [
    { question: 'What is your sex?', questionType: 'options1', options: ['Male', 'Female', 'Other'] },
    { question: 'Do you meet the age requirement?', questionType: 'options2', options: ['I am older than 6 years old.', 'I am filling this out for a child younger than 6 years old.'] },
    { question: 'Do you have any allergies? If so, please write them down?', questionType: 'text' },
    { question: 'How do you want to improve your health or what health issues do you have?.', questionType: 'text' }
];

const Form = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loadingAnimation, setLoadingAnimation] = useState(false);
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

    const handleSubmit = async () => {
        setSubmitLoading(true);

        const question = {
            gender: answers[0],
            age: answers[1] === questions[1].options[0] ? true : false,
            allergies: answers[2],
            description: answers[3],
            user_id: authUserId,
        };

        await createQuestionAPIMethod(question)
            .then(response => response.json())
            .then(data => {
                navigate(`/recommendation/${data._id}/${data.age}/${data.description}`);
            })
            .catch((err) => {
                console.error("Error during submission:", err);
                setErrorMessage("Something went wrong during submission. Please try again.");
            })
            .finally(() => {
                setSubmitLoading(false);
            });

        setLoadingAnimation(true);
    }

    useEffect(() => {
        // Set a timeout to hide the component after 5000 milliseconds (5 seconds)
        const age = answers[1] === questions[1].options[0] ? true : false;
        const description = answers[3];
        if (loadingAnimation) {
            console.log("YEE");
            const timeoutId = setTimeout(() => {
                setLoadingAnimation(false);
                navigate(`/recommendation/${age}/${description}`);
            }, 5000);
            // Cleanup the timeout when the component is unmounted
            return () => clearTimeout(timeoutId);
        }

    }, [loadingAnimation]);

    return (
        <div className="Form">
            {loadingAnimation && (
                <Loader />
            )}
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
                        {loadingAnimation && <h1 className={loadingAnimation ? "loading_title" : ""}>Collecting results...</h1>}
                        {!loadingAnimation && (
                            <>
                                <h1>Please review your answers.</h1>
                                <ul>
                                    {answers.map((answer, index) => (
                                        <>
                                            <div>{`${questions[index].question}`}</div>
                                            <div>A. {`${answer}`}</div>
                                            <br></br>
                                        </>
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
                            </>
                        )}
                    </div>
                    {loadingAnimation && (
                        <p className='loading_subtext'>(This may take up to 10 seconds)</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Form;
