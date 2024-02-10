// QuestionPage.js

import React, { useState } from 'react';
import './question.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import boy from "../../assets/images/boy.svg";
import man from "../../assets/images/man.svg";
import woman from "../../assets/images/woman.svg";
import girl from "../../assets/images/girl.svg";
import { useNavigate } from "react-router-dom";

const Question = ({ question, questionType, options, onNextQuestion, answers, currentPage }) => {
    const [answer, setAnswer] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null)

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleNextQuestion = (questionType) => {
        if (questionType == "text") {
            setErrorMessage(null);
            onNextQuestion(answer);
            setAnswer('');
        } else {
            if (selectedOption == null) {
                setErrorMessage("Please select your answer.")
                return;
            }
            setErrorMessage(null);
            onNextQuestion(answer);
            setAnswer('');
            setSelectedOption(null);
        }
    };

    const clickOption = (option) => {
        console.log("selected option: ", option);
        setSelectedOption(option);
        setAnswer(option);
    }

    const clickSubmit = () => {
        handleNextQuestion();
        navigate('/mainpage');
    }


    return (
        <div className="question-page">
            <h1>{question}</h1>
            {questionType === 'text' && (
                <>
                    {/* <input
                        type="text"
                        placeholder="Your Answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    /> */}
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        label="Your Answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        style={{ minWidth: '500px', color: 'black', colorScheme: 'black' }}
                        autoComplete='off'
                        required
                    />
                </>

            )}
            {questionType === 'options1' && (
                <>
                    <div className="options-container">
                        <>
                            <div
                                className={`custom-link option ${selectedOption === options[0] ? 'selected' : ''}`}
                                // onClick={() => clickOption(option)}
                                onClick={() => clickOption(options[0])}
                            >
                                <img id='man' src={man}></img>
                                {options[0]}
                            </div>
                            <div
                                className={`custom-link option ${selectedOption === options[1] ? 'selected' : ''}`}
                                // onClick={() => clickOption(option)}
                                onClick={() => clickOption(options[1])}
                            >
                                <img id='woman' src={woman}></img>
                                {options[1]}
                            </div>
                        </>
                    </div>
                    <div className={`other ${selectedOption === 'other' ? 'selected' : ''}`} onClick={() => clickOption("other")}>Other</div>
                </>
            )}
            {questionType === 'options2' && (
                <div className="options-container">
                    <>
                        <div
                            className={`custom-link option ${selectedOption === options[0] ? 'selected' : ''}`}
                            // onClick={() => clickOption(option)}
                            onClick={() => clickOption(options[0])}
                        >
                            <img id={answers[0] === "Male" ? "man" : "woman"} src={answers[0] === "Male" ? man : woman}></img>
                            {options[0]}
                        </div>
                        <div
                            className={`custom-link option ${selectedOption === options[1] ? 'selected' : ''}`}
                            // onClick={() => clickOption(option)}
                            onClick={() => clickOption(options[1])}
                        >

                            <img id={answers[0] === "Male" ? "boy" : "girl"} src={answers[0] === "Male" ? boy : girl}></img>
                            {options[1]}
                        </div></>
                </div>
            )}
            <div className='questions-bottom'>
                {/* {currentPage === 3 ? (
                    <Button variant="contained" style={{ backgroundColor: "black" }} onClick={clickSubmit}>Submit</Button>
                ) : ( */}
                {(errorMessage && (questionType === 'options2' || questionType === 'options1')) && (
                    <div className="pwd_err ui negative mini message" style={{ marginBottom: "1.5rem" }}>
                        {errorMessage}
                    </div>
                )}
                <Button variant="contained" style={{ backgroundColor: "black" }} onClick={() => handleNextQuestion(questionType)}>Next</Button>
                {/* )} */}
            </div>
        </div>
    );
};

export default Question;
