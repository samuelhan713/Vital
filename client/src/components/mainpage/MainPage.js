import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import './mainpage.css';
import boy from "../../assets/images/boy.svg";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMyQuestionsAPIMethod } from "../../api/question";
import logo2 from "../../assets/images/logo2.png";

const MainPage = () => {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.id)
    const [records, setRecords] = useState([]);

    useEffect(() => {
        getMyQuestionsAPIMethod(userId)
            .then(response => response.json())
            .then(data => {
                setRecords(data);
            })
    }, []);

    console.log("records: ", records); // --> questionare records created by the current logged in user

    const data = [
        {
            user_id: "1",
            post_id: 1,
            gender: "male",
            age: true,
            allergies: "tylenol",
            description: "I want to improve my skin rash"
        },
        {
            user_id: "2",
            post_id: 2,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 3,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 4,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 5,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 6,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 7,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 8,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 9,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 10,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 11,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 12,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 13,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 14,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 15,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            post_id: 16,
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        }
    ];
    return (
        <div className='mainpage'>
            <Navbar />
            <div className='retake'>
                <Button variant="contained" onClick={() => { navigate(`/form/${userId}`) }} style={{ color: "white", borderColor: "black", fontWeight: "bold", backgroundColor: "black", borderRadius: '3rem', padding: "1rem", fontSize: "12px" }}>Retake the questionnaire!</Button>
            </div>
            <h1>Your History</h1>
            <div className='mainpage_container'>
                {console.log("records: ", records)}
                {records.map((d) => (
                    <div className='mainpage_form_data' onClick={() => navigate(`/mainpagedetails/${d._id}`)}>
                        <img src={logo2} />
                        <div className="mainpage_form_description">
                            Query: {d.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainPage;