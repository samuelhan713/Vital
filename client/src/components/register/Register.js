import { useState } from "react"
import "./Register.css"
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Register = () => {
    const navigate = useNavigate();

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
        console.log('Form submitted with data:', formData);
    };

    const signIn = () => {
        navigate("/login");
    }
      
    return (
        <div className="registration-form-container">
            <div className="registration-form-sub-container">
                <form className="registration-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <TextField
                            type="firstName"
                            variant="standard"
                            onChange={handleChange}
                            name="firstName"
                            value={formData.firstName}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <TextField
                            id="lastName"
                            type="text"
                            variant="standard"
                            onChange={handleChange}
                            name="lastName"
                            value={formData.lastName}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <TextField
                            id="email"
                            type="email"
                            variant="standard"
                            onChange={handleChange}
                            name="email"
                            value={formData.email}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password:</label>
                        <TextField
                            id="password"
                            type="password"
                            variant="standard"
                            onChange={handleChange}
                            name="password"
                            value={formData.password}
                            required
                        />
                    </div>
                    <div className="buttons">
                        <Button type="submit" variant="contained">Register</Button>
                        <Button variant="outlined" onClick={signIn}>Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register