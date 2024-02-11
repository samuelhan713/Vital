import React from 'react';
import Navbar from '../navbar/Navbar';
import './mainpagedetails.css';
import { useParams } from 'react-router-dom';

const MainpageDetails = () => {
    const { postId } = useParams();

    // make an api call using the postId and map over the questions array

    const data = [
        {
            title: 'Multivitamin',
            description: 'this is a sample description',
            img: 'img'
        },
        {
            title: 'Fish Oil',
            description: 'this is a sample description 2',
            img: 'img'
        },
        {
            title: 'Fish Oil',
            description: 'this is a sample description 2',
            img: 'img'
        },
        {
            title: 'Fish Oil',
            description: 'this is a sample description 2',
            img: 'img'
        },
        {
            title: 'Fish Oil',
            description: 'this is a sample description 2',
            img: 'img'
        },
        {
            title: 'Fish Oil',
            description: 'this is a sample description 2',
            img: 'img'
        },
        {
            title: 'Fish Oil',
            description: 'this is a sample description 2',
            img: 'img'
        }
    ];

    return (
        <div className='mainpage_details'>
            <Navbar />
            <div className='mainpage_details_top'>
                <h1>Recommendations ({data.length})</h1>
            </div>
            <div className='mainpage_details_container'>
                {data.map((d) => (
                    <div className='mainpage_details_inner'>
                        <div className='mainpage_details_object'>
                            <div>{d.img}</div>
                        </div>
                        <div className='mainpage_details_object_bottom'>
                            <h3>{d.title}</h3>
                            <p>{d.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainpageDetails;