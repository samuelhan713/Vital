import React from 'react';
import Navbar from '../navbar/Navbar';
import './recommendation.css';
import boy from "../../assets/images/boy.svg";

const Recommendation = () => {
    return (
        <div className='recommendation'>
            <Navbar />
            <div className='recommendation_container'>
                <img src={boy} />
                <h1>You should take</h1>
            </div>
        </div>
    )
}

export default Recommendation;