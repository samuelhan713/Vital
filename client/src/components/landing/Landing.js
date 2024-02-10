import React from 'react';
import './landing.css';
import Navbar from '../navbar/Navbar';

const Landing = () => {
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
                    </div>

                </div>
            </div>
        </>
    )
}

export default Landing