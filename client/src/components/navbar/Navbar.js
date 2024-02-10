import React, { useState } from 'react';
import './navbar.css';
import Button from '../widgets/Button';
import logo from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo2.png";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Extract the pathname from the location object
    const currentPath = location.pathname;
    console.log(currentPath);

    return (
        <div className="navbar_container dark">
            <div className='navbar_inner'>
                <div className="navbar_logo_container">
                    <img
                        src={logo2}
                        onClick={() => {
                            navigate("/");
                        }}
                        className="main_logo"
                        alt="logo"
                    />
                    vital
                </div>

                {!auth ? (
                    <div className="navbar_links">
                        <Button text="Login" to="/login" />
                        <Button text="Register" to="/register" />
                    </div>
                ) : (
                    <div className="btn_container">
                        Logout
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;