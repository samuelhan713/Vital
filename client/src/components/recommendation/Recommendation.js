import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import Navbar from '../navbar/Navbar';
import './recommendation.css';
import boy from "../../assets/images/boy.svg";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import { getRecommendationAPIMethod, updateQuestionAPIMethod } from "../../api/question";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import Loader from '../loader/Loader';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

// useEffect(() => {
//     getRecommendationAPIMethod(age, description)
//         .then(response => response.json())
//         .then(data => {
//             setRecommendation(data);
//             if (data !== null && data.data !== undefined) {
//                 setRecList(data.data.slice(0, 10));
//             }
//         })
// }, []);


const Recommendation = () => {
    const [recommendation, setRecommendation] = useState(null);
    const [recList, setRecList] = useState([]); // top 10 recommendation
    const { questionId, age, description } = useParams();
    const navigate = useNavigate();

    function truncateText(text, limit) {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    }

    function convertToNewUrl(originalUrl) {
        const prefix = 'https://dsld.od.nih.gov/label/';
        const suffix = '.pdf';
        const id = originalUrl.substring(prefix.length);

        return `https://api.ods.od.nih.gov/dsld/s3/pdf/${id}${suffix}`;
    }
    const pdfUrl = 'https://api.ods.od.nih.gov/dsld/s3/pdf/14861.pdf';

    useEffect(() => {
        getRecommendationAPIMethod(age, description)
            .then(response => response.json())
            .then(data => {
                setRecommendation(data);
                if (data !== null && data.data !== undefined) {
                    setRecList(data.data.slice(0, 10));
                }
            })
    }, []);

    const handleUpdateQuestion = () => {
        const rec_list = {
            rec_list: recList
        };
        updateQuestionAPIMethod(questionId, rec_list)
            .then((response) => {
                if (response.ok) {
                    console.log("Recommendation record has been saved.");
                } else {
                    console.log("Error saving recommendation.");
                }
            })
            .catch((err) => {
                console.error("Error when saving recommendation:", err);
            })
    }

    return (
        <div className='recommendation'>
            <Navbar />
            <div className='to_mainpage' onClick={() => { handleUpdateQuestion(); navigate('/mainpage') }}>
                <KeyboardBackspaceIcon />
                <div>Save & Exit</div>
            </div>
            <div className='recommendation_outer'>
                {console.log("reclist?: ", recList)}
                {recList.length == 0 && (
                    <>
                        <h1 className='loading_title'>Collecting results...</h1>
                        <p className='loading_subtext'>(This may take up to 10 seconds)</p>
                        <Loader />
                    </>
                )}
                {recList.length != 0 && (
                    <>
                        <h1>Recommendations ({recList.length})</h1>
                        <div className='recommendation_container'>
                            {recList.map((d) => (
                                <div className='recommendation_inner'>
                                    <div className='recommendation_object'>
                                        {/* <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="100%" height="100%">
                                            <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
                                        </object> */}
                                        <embed src={convertToNewUrl(d[0])} type="application/pdf" width="100%" height="500px" />
                                    </div>
                                    <div className='recommendation_object_bottom'>
                                        <h3>{d[2]}</h3>
                                        <div className='recommendation_object_bottom_bottom'>
                                            <p className='maker'>By {d[3]}</p>
                                            <div className='hover_over'>
                                                Hover over me!
                                            </div>
                                            <div className='hidden_div'>
                                                {d[13]}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

        </div>
    )
}

export default Recommendation;