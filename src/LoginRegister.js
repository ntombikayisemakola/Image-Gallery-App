import React, { useState } from "react";
import axios from "axios";
import './LoginRegister.css';
import { FaLock, FaEnvelope, FaUser } from "react-icons/fa";

function LoginRegister() {
    const [action, setAction] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [registerData, setRegisterData] = useState({ fullnames: '', emailAddress: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({ emailAddress: '', password: '', fullnames: '', confirmPassword: '' });

    const handleEmailAddressChange = (e) => {
        setEmailAddress(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({ emailAddress: '', password: '' });

        const data = {
            EmailAddress: emailAddress,
            Password: password,
        };
        
        const url = 'https://localhost:44308/api/Test/Login'; // Ensure this URL is correct
        axios.post(url, data)
            .then((result) => {
                alert(result.data);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({ fullnames: '', emailAddress: '', password: '', confirmPassword: '' });

        // Registration logic here
        if (registerData.password !== registerData.confirmPassword) {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Passwords do not match' }));
            return;
        }

        const url = 'https://localhost:44308/api/Test/Registration'; // Ensure this URL is correct
        axios.post(url, registerData)
            .then((result) => {
                alert(result.data);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const registerLink = () => {
        setAction('active');
    };

    const loginLink = () => {
        setAction('');
    };

    return (
        <div className={`wrapper ${action}`}>
            <div className="form-box login">
                <form onSubmit={handleLoginSubmit}>
                    <h1>Login</h1>
                    
                    <div className="input-box">
                        <input 
                            type="email" 
                            name="emailAddress" 
                            placeholder="Email" 
                            value={emailAddress} 
                            onChange={handleEmailAddressChange} 
                            required 
                        />
                        <FaEnvelope className="icon" />
                        {errors.emailAddress && <span className="error">{errors.emailAddress}</span>}
                    </div>

                    <div className="input-box">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={handlePasswordChange} 
                            required 
                        />
                        <FaLock className="icon" />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" /> Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form onSubmit={handleRegisterSubmit}>
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input 
                            type="text" 
                            name="fullnames" 
                            placeholder="Full Names" 
                            value={registerData.fullnames} 
                            onChange={handleRegisterChange} 
                            required 
                        />
                        <FaUser className="icon" />
                        {errors.fullnames && <span className="error">{errors.fullnames}</span>}
                    </div>

                    <div className="input-box">
                        <input 
                            type="email" 
                            name="emailAddress" 
                            placeholder="Email" 
                            value={registerData.emailAddress} 
                            onChange={handleRegisterChange} 
                            required 
                        />
                        <FaEnvelope className="icon" />
                        {errors.emailAddress && <span className="error">{errors.emailAddress}</span>}
                    </div>

                    <div className="input-box">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={registerData.password} 
                            onChange={handleRegisterChange} 
                            required 
                        />
                        <FaLock className="icon" />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>

                    <div className="input-box">
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="Confirm Password" 
                            value={registerData.confirmPassword} 
                            onChange={handleRegisterChange} 
                            required 
                        />
                        <FaLock className="icon" />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" required /> I agree to the Terms & Conditions</label>
                    </div>

                    <button type="submit">Register</button>

                    <div className="register-link">
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginRegister;
