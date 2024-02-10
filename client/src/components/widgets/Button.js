import React from "react";
import { useNavigate } from "react-router-dom";
import "./widgets.css";
const Button = ({ text, to }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(to);
    };
    return (
        <div className="btn_container" onClick={handleClick}>
            {text}
        </div>
    );
};

export default Button;