import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import './mainpagedetails.css';
import { useParams } from 'react-router-dom';
import { getQuestionById } from '../../api/question';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const MainpageDetails = () => {
    const { postId } = useParams();
    const [question, setQuestion] = useState(null);
    const [test, setTest] = useState(null);

    // make an api call using the postId and map over the questions array

    function convertToNewUrl(originalUrl) {
        const prefix = 'https://dsld.od.nih.gov/label/';
        const suffix = '.pdf';
        const id = originalUrl.substring(prefix.length);

        return `https://api.ods.od.nih.gov/dsld/s3/pdf/${id}${suffix}`;
    }

    useEffect(() => {
        const fetchQuestion = async () => {
            getQuestionById(postId).then(res => res.json()).then(data => setQuestion(data));

        };
        fetchQuestion();
    }, [])

    // const [shouldReload, setShouldReload] = useState(true);

    // useEffect(() => {
    //     if (shouldReload) {
    //         // Reload the page when the component mounts
    //         window.location.reload();
    //         // Set shouldReload to false to prevent continuous reloads
    //         setShouldReload(false);
    //     }
    // }, [shouldReload]);

    return (
        <div className='mainpage_details'>
            <Navbar />
            {question && (
                <>
                    <div className='mainpage_details_top'>
                        <h1>Recommendations ({question.rec_list.length})</h1>
                    </div>
                    <div className='mainpage_details_container'>
                        {question.rec_list.map((d) => (
                            <div className='mainpage_details_inner'>
                                <div className='mainpage_details_object'>
                                    <embed src={convertToNewUrl(d[0])} type="application/pdf" width="100%" height="100%" />
                                </div>
                                <div className='mainpage_details_object_bottom'>
                                    <h3>{d[2]}</h3>
                                    <p>By {d[3]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}


        </div>
    )
}

export default MainpageDetails;