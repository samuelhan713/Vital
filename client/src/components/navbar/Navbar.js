import React, { useState } from 'react';
import './navbar.css';
import Button from '../widgets/Button';
import logo from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo2.png";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
import ButtonMaterial from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    console.log(isAuthenticated);
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };
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

                {!isAuthenticated ? (
                    <div className="navbar_links">
                        <Button text="Login" to="/login" />
                        <Button text="Register" to="/register" />
                    </div>
                ) : (
                    <>
                        <div className='logout_container' onClick={() => setModal(!modal)}>
                            <MenuIcon style={{ color: "gray" }} />
                            <AccountCircleIcon style={{ width: "35px", height: "35px", color: "gray" }} />
                        </div>
                        {modal && (
                            <div className='logout_modal'>
                                <p className='logout_btn' onClick={handleLogout}>Logout</p>
                            </div>
                        )}
                    </>
                    // <ButtonMaterial
                    //     type="submit"
                    //     variant="contained"
                    //     style={{ backgroundColor: "black" }}
                    //     onClick={handleLogout}
                    // >
                    //     Logout
                    // </ButtonMaterial>
                )}
            </div>
        </div>
    );
}

export default Navbar;