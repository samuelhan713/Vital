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

    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleNextQuestion = () => {
        if (selectedOption == null) {
            return;
        }
        onNextQuestion(answer);
        setAnswer('');
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
                    <TextField id="standard-basic" variant="standard" label="Your Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} style={{ minWidth: '500px', color: 'black', colorScheme: 'black' }} autoComplete='off' />
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
                            <img id={answers[0] === "I am a male." ? "man" : "woman"} src={answers[0] === "I am a male." ? man : woman}></img>
                            {options[0]}
                        </div>
                        <div
                            className={`custom-link option ${selectedOption === options[1] ? 'selected' : ''}`}
                            // onClick={() => clickOption(option)}
                            onClick={() => clickOption(options[1])}
                        >

                            <img id={answers[0] === "I am a male." ? "boy" : "girl"} src={answers[0] === "I am a male." ? boy : girl}></img>
                            {options[1]}
                        </div></>
                </div>
            )}
            <div className='questions-bottom'>
                {currentPage === 3 ? (
                    <Button variant="contained" style={{ backgroundColor: "black" }} onClick={clickSubmit}>Submit</Button>
                ) : (
                    <Button variant="contained" style={{ backgroundColor: "black" }} onClick={handleNextQuestion}>Next</Button>
                )}
            </div>
        </div>
    );
};

export default Question;
