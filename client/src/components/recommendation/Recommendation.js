import React from 'react';
import Navbar from '../navbar/Navbar';
import './recommendation.css';
import boy from "../../assets/images/boy.svg";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";

const Recommendation = () => {
    const navigate = useNavigate();

    const data = [
        {
            title: 'med1',
            description: 'this is a sample description',
            img: 'img'
        },
        {
            title: 'med2',
            description: 'this is a sample description 2',
            img: 'img'
        }
    ];

    return (
        <div className='recommendation'>
            <Navbar />
            <div className='to_mainpage' onClick={() => navigate('/mainpage')}>
                <KeyboardBackspaceIcon />
                <div>To main page</div>
            </div>
            <div className='recommendation_outer'>
                <h1>Recommendations ({data.length})</h1>
                <div className='recommendation_container'>
                    {data.map((d) => (
                        <div className='recommendation_object'>
                            <div>{d.img}</div>
                            <div className='recommendation_object_bottom'>
                                <h1>{d.title}</h1>
                                <p>{d.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Recommendation;