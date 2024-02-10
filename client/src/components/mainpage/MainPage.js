import React from 'react';
import Navbar from '../navbar/Navbar';
import './mainpage.css';
import boy from "../../assets/images/boy.svg";

const MainPage = () => {
    const data = [
        {
            user_id: "1",
            gender: "male",
            age: true,
            allergies: "tylenol",
            description: "I want to improve my skin rash"
        },
        {
            user_id: "2",
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        },
        {
            user_id: "2",
            gender: "female",
            age: false,
            allergies: "vitamin c",
            description: "I want stronger bones"
        }
    ];
    return (
        <div className='mainpage'>
            <Navbar />
            <div className='mainpage_container'>
                {data.map((d) => (
                    <div className='mainpage_form_data'>
                        <img src={boy} />
                        <div className="mainpage_form_title">
                            {d.allergies}
                        </div>
                        <div className="mainpage_form_description">
                            {d.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainPage