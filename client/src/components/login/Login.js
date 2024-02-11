import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SHA256, enc } from "crypto-js";
import "./Login.css"
import { loginUserAPIMethod, createUserAPIMethod } from "../../api/auth";
import { login } from "../../features/userSlice";
import Lottie from "lottie-react";
import landingData1 from "../../assets/Lottie/ProcessIndicator.json";
import Navbar from '../navbar/Navbar';


const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginLoading, setLoginIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/mainpage");
        }
    }, [isLoggedIn]);

    const style = {
        height: 50,
        width: 50,
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginIsLoading(true);

        // let hashedpassword = SHA256(formData.password).toString(enc.Hex);

        const user = {
            email: formData.email,
            password: formData.password
        };

        loginUserAPIMethod(user)
            .then((res) => {
                if (res.ok) {
                    res.json().then((jsonResult) => {
                        dispatch(login(jsonResult));
                        setIsLoggedIn(true);
                    });
                } else {
                    setIsLoggedIn(false);
                    setErrorMessage("Incorrect username or password");
                }
            })
            .catch((err) => {
                console.error("Error during login:", err);
                setIsLoggedIn(false);
                setErrorMessage("Something went wrong during login");
            })
            .finally(() => {
                setLoginIsLoading(false);
            });
    };

    const register = () => {
        navigate("/register");
    }

    return (
        <div className="login-form-container">
            <Navbar />
            <h1>Welcome back!</h1>
            <p>Hope you're feeling better today.</p>
            <div className="login-form-sub-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login_email">
                        <label htmlFor="email">Email:</label>
                        <TextField
                            id="email"
                            type="email"
                            // variant="standard"
                            onChange={handleChange}
                            name="email"
                            value={formData.email}
                            required
                            fullWidth
                            autoComplete="off"
                        />
                    </div>

                    <div className="login_password">
                        <label htmlFor="password">Password:</label>
                        <TextField
                            id="password"
                            type="password"
                            // variant="standard"
                            onChange={handleChange}
                            name="password"
                            value={formData.password}
                            required
                            fullWidth
                            autoComplete="off"
                        />
                        {errorMessage && (
                            <div className="pwd_err ui negative mini message">
                                {errorMessage}
                            </div>
                        )}
                    </div>

                    <div className="buttons">
                        {loginLoading ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                }}
                            >
                                <Lottie animationData={landingData1} style={style} />
                            </div>
                        ) : (
                            <Button type="submit" variant="contained" style={{ backgroundColor: "#ff395c", height: "40px" }}>Sign In</Button>
                        )}
                        <div className="login_no_account" onClick={() => navigate('/register')}><p>Don't have an account?</p></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login