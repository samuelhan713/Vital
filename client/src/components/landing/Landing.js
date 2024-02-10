import React from 'react';
import './landing.css';
import Navbar from '../navbar/Navbar';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className='landing'>
                <div className='landing_inner'>
                    <div className='landing_titles'>
                        <div className='landing_title_first'>
                            Get
                        </div>
                        <div className='landing_title_second'>
                            Meds
                        </div>
                        <Button onClick={() => navigate('/register')} className='landing_get_started' variant="text" style={{ color: 'white', backgroundColor: 'gray', padding: '4px 6px 4px 6px', fontWeight: 'bold' }}
                        >Get started</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing