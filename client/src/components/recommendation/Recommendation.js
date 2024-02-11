import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import './recommendation.css';
import boy from "../../assets/images/boy.svg";
import { getRecommendationAPIMethod } from "../../api/question";

const Recommendation = () => {
    const [recommendation, setRecommendation] = useState(null);
    const [recList, setRecList] = useState([]); // top 10 recommendation
    const { age, description } = useParams();
    
    useEffect(() => {
        getRecommendationAPIMethod(age, description)
        .then(response => response.json())
        .then(data => {
            setRecommendation(data);
            if (data !== null) {
                setRecList(data.data.slice(0, 10));
            }
        })
    }, []);
    
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