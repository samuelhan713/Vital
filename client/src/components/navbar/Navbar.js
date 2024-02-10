import React, { useState } from 'react';
import './navbar.css';
import Button from '../widgets/Button';
import logo from "../../assets/images/logo.png"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="navbar_container">
            <div className='navbar_inner'>
                <div className="navbar_logo_container">
                    <img
                        src={logo}
                        onClick={() => {
                            navigate("/");
                        }}
                        className="main_logo"
                        alt="logo"
                    />
                    Supplement.ai
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