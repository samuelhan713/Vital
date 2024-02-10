import React from 'react';
import './loader.css';

const Loader = () => {
    return (
        <>
            <div class="overlay" id="overlay"></div>
            <div class="loader">
                <div class="loader-cube">
                    <div class="face"></div>
                    <div class="face"></div>
                    <div class="face"></div>
                    <div class="face"></div>
                    <div class="face"></div>
                    <div class="face"></div>
                </div>
            </div>
        </>
    )
}

export default Loader;