import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import './recommendation.css';
import boy from "../../assets/images/boy.svg";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import { getRecommendationAPIMethod } from "../../api/question";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();


const Recommendation = () => {
    const [recommendation, setRecommendation] = useState(null);
    // const [recList, setRecList] = useState([]); // top 10 recommendation
    const [recList, setRecList] = useState(
        [
            [
                "https://dsld.od.nih.gov/label/14856",
                14856,
                "One All-In-One Nutritional Shake Berry",
                "Vega",
                "8 38766 00521 8",
                "30 Oz(s); 850 Gram(s)",
                "42.5 Gram(s) [(1.5 oz.)(1 scoop)]",
                "Botanical with Nutrients [A1317]",
                "Powder [E0162]",
                "2012-10-25",
                "On Market",
                "Directions (adults):Mix one level scoop of Vega One Nutritional Shake in 1–1.5 cups (250–375 ml) of ice-coldwater; juice or non-dairy beverage; shake well and enjoy.Vega One is also a delicious; nutrient-supplementing addition to your favorite smoothierecipe—just blend and thrive! Take one or more servings daily for optimal health.*",
                "Other",
                "PLANT-BASED Complete Daily Essentials to Help You Thrive• Cover your key nutrient bases for optimal health*• Provide energy to sustain an active life*• Help metabolize fats proteins and carbohydrates*• Support normal glucose metabolism*• Develop strong bones and teeth and maintain healthy skin and eyes*• Facilitate proper muscle function and repair of connective tissue*• Promote natural healthy intestinal flora*• Help support a healthy immune system*For complete benefit details visit myvega.com Notice to First-Time Users: As with any positive dietary change some people may experience temporary cleansing-type symptoms including headaches constipation diarrhea and nausea when first taking Vega One. To minimize symptoms start with one-quarter of a serving and gradually increase intake over the next few weeks. Be sure to drink plenty of water (at least 8 cups a day) with increased dietary fiber intake. Made in USA Formulated by Brendan Brazier: vegan professional Ironman triathlete and bestselling health author on plant-based nutrition.brendanbrazier.com(graphic signature)Brendan Brazier(image of Brendan Brazier)(QR Tag) 50% DAILY INTAKE VITAMINS & MINERALS"
            ],
            [
                "https://dsld.od.nih.gov/label/14861",
                14861,
                "One All-In-One Nutritional Shake Berry",
                "Vega",
                "8 38766 00526 3",
                "15 Oz(s); 425 Gram(s)",
                "42.5 Gram(s) [(1.5 oz.)(1 scoop)]",
                "Botanical with Nutrients [A1317]",
                "Powder [E0162]",
                "2012-10-25",
                "On Market",
                "Directions (adults):Mix one level scoop of Vega One Nutritional Shake in 1–1.5 cups (250–375 ml) of ice-coldwater; juice or non-dairy beverage; shake well and enjoy.Vega One is also a delicious; nutrient-supplementing addition to your favorite smoothierecipe—just blend and thrive! Take one or more servings daily for optimal health.*",
                "Other",
                "Complete Daily Essentials to Help You Thrive• Cover your key nutrient bases for optimal health*• Provide energy to sustain an active life*• Help metabolize fats proteins and carbohydrates*• Support normal glucose metabolism*• Develop strong bones and teeth and maintain healthy skin and eyes*• Facilitate proper muscle function and repair of connective tissue*• Promote natural healthy intestinal flora*• Help support a healthy immune system*For complete benefit details visit myvega.com Formulated by Brendan Brazier: vegan professional Ironman triathlete and bestselling health author on plant-based nutrition.brendanbrazier.com(graphic signature)Brendan Brazier(image of Brendan Brazier)(QR Tag) 50% DAILY INTAKE VITAMINS & MINERALS Notice to First-Time Users: As with any positive dietary change some people may experience temporary cleansing-type symptoms including headaches constipation diarrhea and nausea when first taking Vega One. To minimize symptoms start with one-quarter of a serving and gradually increase intake over the next few weeks. Be sure to drink plenty of water (at least 8 cups a day) with increased dietary fiber intake. Made in USA PLANT-BASED"
            ],
            [
                "https://dsld.od.nih.gov/label/18351",
                18351,
                "Complete Whole Food Health Optimizer Natural Flavor",
                "Sequel Vega",
                "8 38766 00503 4",
                "36.3 oz.; 1030 g",
                "61 Gram(s) [2 scoops]",
                "Other Combinations [A1325]",
                "Powder [E0162]",
                "2013-02-25",
                "On Market",
                "SUGGESTED USE: Take one or more servings daily for optimal health and vitality. Mix two level scoops of Vega into one and a half to two cups (12 to 16 fluid ounces) of cold water and shake well. Makes a nutritionally complete and satisfying whole food liquid meal without compromises. For those with smaller appetites; try just half a serving (one scoop) as a meal or snack. You can also use Vega as a boost to your favorite blended smoothie recipe. As with any high fiber product; start slowly and gradually increase intake over several days. Be sure to drink plenty of water with increased dietary fiber.",
                "Other",
                "Best of all Vega is clean green and suitable for those on almost any kind of diet including calorie-reduced low carb low glycemic gluten-free diabetic cleansing elimination and vegetarian/vegan. Use Vega CompleteWhole Food Health Optimizer to help:• Promote optimal health and increase energy and stamina• Meet 100%of recommended daily intake of vitamins &minerals• Meet 60% of recommended daily intake of fiber• Support the development of bones & teeth• Ensure healthy thyroid and hormonal function• Enhance digestion and gastrointestinal function• Preserve good cardiovascular health• Support eyesight skin health and immune system• Maintain proper muscle function• Encourage healthyweight loss by improvingmetabolism increasing feeling of fullness and controlling blood sugar{Veg News Best of Show Awards 2006 Best New Vegetarian Product EXPO WEST}{alive Award of Excellence Gold 2007}{alive Award of Excellence 2006} Complete Whole Food Health OptimizerAll-in-one natural plant-based formula Excellent source of protein fiber & antioxidantsProvides 100% recommended daily intake of vitamins & minerals Vega Provides Essential Everyday NutritionCombining whole food goodness with fast food convenience Vega is a convenient and complete source of plant-based whole foods. Easily digested alkaline-forming and pleasant-tasting Vega is ideal for anyone looking for a simple one-stop supplement solution to support optimal health and vitality. Formulated by Brendan Brazier veganprofessional Ironman Triathlete and bestselling author on nutrition Vega is a synergistic collection of Brendan’s favorite plant-based superfoods. For years Brendan has thrived by fuelling his body with whole food meals in liquid form. After extensive formulation and testing Vega is a replica of Brendan’s tried-and-true health and performance optimizing shake. Made in CanadaGMP Good Manufacturing Practices Read The Thrive Diet by Brendan Brazier professional Ironman triathlete and formulator of Vega. www.brendanbrazier.comFeaturing 100 whole food recipes and a 12 week meal plan The Thrive Diet will show you how plant-based whole foods can improve health performance and vitality.www.thrivediet.comBrendan Brazier{THRIVE The Vegan Nutrition Guide to Optimal Performance in Sports and Life BRENDAN BRAZIER}"
            ],
            [
                "https://dsld.od.nih.gov/label/18355",
                18355,
                "Complete Whole Food Health Optimizer Berry Flavor",
                "Sequel Vega",
                "8 38766 00509 6",
                "16.9 oz.; 480 g",
                "69 Gram(s) [2 scoops]",
                "Other Combinations [A1325]",
                "Powder [E0162]",
                "2013-02-25",
                "On Market",
                "SUGGESTED USE: Take one or more servings daily for optimal health and vitality. Mix two level scoops of Vega into one and a half to two cups (12 to 16 fluid ounces) of cold water and shake well. Makes a nutritionally complete and satisfying whole food liquid meal without compromises. For those with smaller appetites; try just half a serving (one scoop) as a meal or snack. You can also use Vega as a boost to your favorite blended smoothie recipe. As with any high fiber product; start slowly and gradually increase intake over several days. Be sure to drink plenty of water with increased dietary fiber.",
                "Other",
                "Vega Provides Essential Everyday NutritionCombining whole food goodness with fast food convenience Vega is a convenient and complete source of plant-based whole foods. Easily digested alkaline-forming and pleasant-tasting Vega is ideal for anyone looking for a simple one-stop supplement solution to support optimal health and vitality. Formulated by Brendan Brazier veganprofessional Ironman Triathlete and bestselling author on nutrition Vega is a synergistic collection of Brendan’s favorite plant-based superfoods. For years Brendan has thrived by fuelling his body with whole food meals in liquid form. After extensive formulation and testing Vega is a replica of Brendan’s tried-and-true health and performance optimizing shake. Best of all Vega is clean green and suitable for those on almost any kind of diet including calorie-reduced low carb low glycemic gluten-free diabetic cleansing elimination and vegetarian/vegan. Use Vega Complete Whole Food Health Optimizer to help:• Promote optimal health and increase energy and stamina• Meet 100%of recommended daily intake of vitamins &minerals• Meet 60% of recommended daily intake of fiber• Support the development of bones & teeth• Ensure healthy thyroid and hormonal function• Enhance digestion and gastrointestinal function• Preserve good cardiovascular health• Support eyesight skin health and immune system• Maintain proper muscle function• Encourage healthyweight loss by improvingmetabolism increasing feeling of fullness and controlling blood sugar{Veg News Best of Show Awards 2006 Best New Vegetarian Product EXPO WEST}{alive Award of Excellence Gold 2007}{alive Award of Excellence 2006} Read The Thrive Diet by Brendan Brazier professional Ironman triathlete and formulator of Vega. www.brendanbrazier.comFeaturing 100 whole food recipes and a 12 week meal plan The Thrive Diet will show you how plant-based whole foods can improve health performance and vitality.www.thrivediet.comBrendan Brazier{THRIVE The Vegan Nutrition Guide to Optimal Performance in Sports and Life BRENDAN BRAZIER} Complete Whole Food Health OptimizerAll-in-one natural plant-based formula Excellent source of protein fiber & antioxidantsProvides 100% recommended daily intake of vitamins & minerals Made in Canada"
            ],
            [
                "https://dsld.od.nih.gov/label/18356",
                18356,
                "Complete Whole Food Health Optimizer Berry Flavor",
                "Sequel Vega",
                "8 38766 00502 7",
                "36.6 oz.; 1039 g",
                "69 Gram(s) [2 scoops]",
                "Other Combinations [A1325]",
                "Powder [E0162]",
                "2013-02-25",
                "On Market",
                "SUGGESTED USE: Take one or more servings daily for optimal health and vitality. Mix two level scoops of Vega into one and a half to two cups (12 to 16 fluid ounces) of cold water and shake well. Makes a nutritionally complete and satisfying whole food liquid meal without compromises. For those with smaller appetites; try just half a serving (one scoop) as a meal or snack. You can also use Vega as a boost to your favorite blended smoothie recipe. As with any high fiber product; start slowly and gradually increase intake over several days. Be sure to drink plenty of water with increased dietary fiber.",
                "Other",
                "Vega Provides Essential Everyday NutritionCombining whole food goodness with fast food convenience Vega is a convenient and complete source of plant-based whole foods. Easily digested alkaline-forming and pleasant-tasting Vega is ideal for anyone looking for a simple one-stop supplement solution to support optimal health and vitality. Formulated by Brendan Brazier veganprofessional Ironman Triathlete and bestselling author on nutrition Vega is a synergistic collection of Brendan’s favorite plant-based superfoods. For years Brendan has thrived by fuelling his body with whole food meals in liquid form. After extensive formulation and testing Vega is a replica of Brendan’s tried-and-true health and performance optimizing shake. Best of all Vega is clean green and suitable for those on almost any kind of diet including calorie-reduced low carb low glycemic gluten-free diabetic cleansing elimination and vegetarian/vegan. Use Vega Complete Whole Food Health Optimizer to help:• Promote optimal health and increase energy and stamina• Meet 100%of recommended daily intake of vitamins &minerals• Meet 60% of recommended daily intake of fiber• Support the development of bones & teeth• Ensure healthy thyroid and hormonal function• Enhance digestion and gastrointestinal function• Preserve good cardiovascular health• Support eyesight skin health and immune system• Maintain proper muscle function• Encourage healthyweight loss by improvingmetabolism increasing feeling of fullness and controlling blood sugar{Veg News Best of Show Awards 2006 Best New Vegetarian Product EXPO WEST}{alive Award of Excellence Gold 2007}{alive Award of Excellence 2006} Read The Thrive Diet by Brendan Brazier professional Ironman triathlete and formulator of Vega. www.brendanbrazier.comFeaturing 100 whole food recipes and a 12 week meal plan The Thrive Diet will show you how plant-based whole foods can improve health performance and vitality.www.thrivediet.comBrendan Brazier{THRIVE The Vegan Nutrition Guide to Optimal Performance in Sports and Life BRENDAN BRAZIER} Complete Whole Food Health OptimizerAll-in-one natural plant-based formula Excellent source of protein fiber & antioxidantsProvides 100% recommended daily intake of vitamins & minerals Made in Canada GMP Good Manufacturing Practices"
            ],
            [
                "https://dsld.od.nih.gov/label/18357",
                18357,
                "Complete Whole Food Health Optimizer Vanilla Chai Flavor",
                "Sequel Vega",
                "8 38766 00504 1",
                "34.5 oz.; 979 g",
                "65 Gram(s) [2 scoops]",
                "Other Combinations [A1325]",
                "Powder [E0162]",
                "2013-02-25",
                "On Market",
                "SUGGESTED USE: Take one or more servings daily for optimal health and vitality. Mix two level scoops of Vega into one and a half to two cups (12 to 16 fluid ounces) of cold water and shake well. Makes a nutritionally complete and satisfying whole food liquid meal without compromises. For those with smaller appetites; try just half a serving (one scoop) as a meal or snack. You can also use Vega as a boost to your favorite blended smoothie recipe. As with any high fiber product; start slowly and gradually increase intake over several days. Be sure to drink plenty of water with increased dietary fiber.",
                "Other",
                "Vega Provides Essential Everyday NutritionCombining whole food goodness with fast food convenience Vega is a convenient and complete source of plant-based whole foods. Easily digested alkaline-forming and pleasant-tasting Vega is ideal for anyone looking for a simple one-stop supplement solution to support optimal health and vitality. Formulated by Brendan Brazier veganprofessional Ironman Triathlete and bestselling author on nutrition Vega is a synergistic collection of Brendan’s favorite plant-based superfoods. For years Brendan has thrived by fuelling his body with whole food meals in liquid form. After extensive formulation and testing Vega is a replica of Brendan’s tried-and-true health and performance optimizing shake. Best of all Vega is clean green and suitable for those on almost any kind of diet including calorie-reduced low carb low glycemic gluten-free diabetic cleansing elimination and vegetarian/vegan. Use Vega Complete Whole Food Health Optimizer to help:• Promote optimal health and increase energy and stamina• Meet 100%of recommended daily intake of vitamins &minerals• Meet 60% of recommended daily intake of fiber• Support the development of bones & teeth• Ensure healthy thyroid and hormonal function• Enhance digestion and gastrointestinal function• Preserve good cardiovascular health• Support eyesight skin health and immune system• Maintain proper muscle function• Encourage healthyweight loss by improvingmetabolism increasing feeling of fullness and controlling blood sugar{Veg News Best of Show Awards 2006 Best New Vegetarian Product EXPO WEST}{alive Award of Excellence Gold 2007}{alive Award of Excellence 2006} Read The Thrive Diet by Brendan Brazier professional Ironman triathlete and formulator of Vega. www.brendanbrazier.comFeaturing 100 whole food recipes and a 12 week meal plan The Thrive Diet will show you how plant-based whole foods can improve health performance and vitality.www.thrivediet.comBrendan Brazier{THRIVE The Vegan Nutrition Guide to Optimal Performance in Sports and Life BRENDAN BRAZIER} Complete Whole Food Health OptimizerAll-in-one natural plant-based formula Excellent source of protein fiber & antioxidantsProvides 100% recommended daily intake of vitamins & minerals Made in Canada GMP Good Manufacturing Practices"
            ],
            [
                "https://dsld.od.nih.gov/label/18359",
                18359,
                "One All-In-One Nutritional Shake Chocolate",
                "Vega",
                "8 38766 00520 1",
                "30.9 oz.; 876 g",
                "10.95 Gram(s) [(.375-1.5 oz.) (1/4-1 scoop)]",
                "Other Combinations [A1325]",
                "Powder [E0162]",
                "2013-02-25",
                "On Market",
                "Directions (adults):Mix one level scoop of Vega One Nutritional Shake in 1–1.5 cups (250–375 ml) of ice-coldwater; juice or non-dairy beverage; shake well and enjoy.Vega One is also a delicious; nutrient-supplementing addition to your favorite smoothierecipe—just blend and thrive! Take one or more servings daily for optimal health.* To minimize symptoms; start with one-quarter of a serving and gradually increase intake over the next few weeks. Be sure to drink plenty of water (at least 8 cups a day) with increased dietary fiber intake.",
                "Other",
                "Complete Daily Essentials to Help You Thrive• Cover your key nutrient bases for optimal health*• Provide energy to sustain an active life*• Help metabolize fats proteins and carbohydrates*• Support normal glucose metabolism*• Develop strong bones and teeth and maintain healthy skin and eyes*• Facilitate proper muscle function and repair of connective tissue*• Promote natural healthy intestinal flora*• Help support a healthy immune system*For complete benefit details visit myvega.com PLANTBASED 50% DAILY INTAKE VITAMINS & MINERALS Made in Canada"
            ],
            [
                "https://dsld.od.nih.gov/label/18362",
                18362,
                "One All-In-One Nutritional Shake Natural",
                "Vega",
                "8 38766 00522 5",
                "30.4 oz.; 862 g",
                "8.975 Gram(s) [(.325-1.3 oz.) (1/4-1 scoop)]",
                "Other Combinations [A1325]",
                "Powder [E0162]",
                "2013-03-25",
                "On Market",
                "Directions (adults):Mix one level scoop of Vega One Nutritional Shake in 1–1.5 cups (250–375 ml) of ice-coldwater; juice or non-dairy beverage; shake well and enjoy.Vega One is also a delicious; nutrient-supplementing addition to your favorite smoothierecipe—just blend and thrive! Take one or more servings daily for optimal health.*After opening; store in a cool dry place with lid tightly closed. To minimize symptoms; start with one-quarter of a serving and gradually increase intake over the next few weeks. Be sure to drink plenty of water (at least 8 cups a day) with increased dietary fiber intake.",
                "Other",
                "Complete Daily Essentials to Help You Thrive• Cover your key nutrient bases for optimal health*• Provide energy to sustain an active life*• Help metabolize fats proteins and carbohydrates*• Support normal glucose metabolism*• Develop strong bones and teeth and maintain healthy skin and eyes*• Facilitate proper muscle function and repair of connective tissue*• Promote natural healthy intestinal flora*• Help support a healthy immune system*For complete benefit details visit myvega.com PLANTBASED NATURAL50% DAILY INTAKE VITAMINS & MINERALS Made in Canada"
            ],
            [
                "https://dsld.od.nih.gov/label/18364",
                18364,
                "One All-In-One Nutritional Shake Vanilla Chai",
                "Vega",
                "8 38766 00523 2",
                "30.8 oz.; 874 g",
                "9.925 Gram(s) [(.35-1.4 oz.) (1/4-1 scoop)]",
                "Other Combinations [A1325]",
                "Powder [E0162]",
                "2013-02-25",
                "On Market",
                "Directions (adults):Mix one level scoop of Vega One Nutritional Shake in 1–1.5 cups (250–375 ml) of ice-coldwater; juice or non-dairy beverage; shake well and enjoy.Vega One is also a delicious; nutrient-supplementing addition to your favorite smoothierecipe—just blend and thrive! Take one or more servings daily for optimal health.* To minimize symptoms; start with one-quarter of a serving and gradually increase intake over the next few weeks. Be sure to drink plenty of water (at least 8 cups a day) with increased dietary fiber intake.",
                "Other",
                "Complete Daily Essentials to Help You Thrive• Cover your key nutrient bases for optimal health*• Provide energy to sustain an active life*• Help metabolize fats proteins and carbohydrates*• Support normal glucose metabolism*• Develop strong bones and teeth and maintain healthy skin and eyes*• Facilitate proper muscle function and repair of connective tissue*• Promote natural healthy intestinal flora*• Help support a healthy immune system*For complete benefit details visit myvega.com PLANTBASED 50% DAILY INTAKE VITAMINS & MINERALS Made in Canada"
            ],
            [
                "https://dsld.od.nih.gov/label/42174",
                42174,
                "One All-In-One Nutritional Shake Vanilla Chai",
                "Vega",
                "8 38766 00528 7",
                "15.4 oz.; 437 Gram(s)",
                "38 Gram(s) [(1 scoop)(1.3 oz.)]",
                "Other Combinations [A1325]",
                "Powder [E0162]",
                "2015-02-25",
                "On Market",
                "Directions (adults):Mix one level scoop of Vega One Nutritional Shake in 1–1.5 cups (250–375 ml) of ice-cold water; juice or non-dairy beverage; shake well and enjoy. Vega One is also a delicious; nutrient-supplementing addition to your favorite smoothie recipe—just blend and thrive! Take one or more servings daily for optimal health.* To minimize symptoms; start with one-quarter of a serving and gradually increase intake over the next few weeks. Be sure to drink plenty of water (at least 8 cups a day) with increased dietary fiber intake.",
                "Other",
                "Complete Daily Essentials to Help You ThriveCover your key nutrient bases for optimal health*Provide energy to sustain an active life*Help metabolize fats proteins and carbohydrates*Support normal glucose metabolism*Develop strong bones and teeth and maintain healthy skin and eyes*Facilitate proper muscle function and repair of connective tissue*Promote natural healthy intestinal flora*Help support a healthy immune system* Formulated by Brendan Brazier:vegan professional Ironman triathlete and bestselling health author on plant-based nutrition.brendanbrazier.com{signature} Brendan Brazier {QR CODE} PLANT-BASED 50% DAILY INTAKE VITAMINS & MINERALS no sugar added Made in Canada"
            ]
        ]
    ); // top 10 recommendation
    const { age, description } = useParams();
    const navigate = useNavigate();

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

    return (
        <div className='recommendation'>
            <Navbar />
            <div className='to_mainpage' onClick={() => navigate('/mainpage')}>
                <KeyboardBackspaceIcon />
                <div>To main page</div>
            </div>
            <div className='recommendation_outer'>
                {recList && (
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