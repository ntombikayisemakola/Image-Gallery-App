import React, { useState } from "react";
import axios from "axios";
import './LoginRegister.css';
import { FaLock, FaEnvelope, FaUser } from "react-icons/fa";
import bcrypt from "bcryptjs";

function LoginRegister() {
    const [action, setAction] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [registerData, setRegisterData] = useState({ fullnames: '', emailAddress: '', password: '', confirmPassword: '', IsActive: true });
    const [errors, setErrors] = useState({ emailAddress: '', password: '', fullnames: '', confirmPassword: '' });
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');

    const handleEmailAddressChange = (e) => {
        setEmailAddress(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleForgotPasswordEmailChange = (e) => {
        setForgotPasswordEmail(e.target.value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({ emailAddress: '', password: '' });

        const hashedPassword = bcrypt.hashSync(password, 10);

        const data = {
            EmailAddress: emailAddress,
            Password: hashedPassword,
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
        setErrors({ fullNames: '', emailAddress: '', password: '', confirmPassword: '' });

        if (!validateFullNames(registerData.fullnames)) {
            setErrors((prevErrors) => ({ ...prevErrors, fullnames: 'Full names should contain only letters and spaces' }));
            return;
        }

        if (registerData.password !== registerData.confirmPassword) {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Passwords do not match' }));
            return;
        }

        if (!validatePasswordComplexity(registerData.password)) {
            setErrors((prevErrors) => ({ ...prevErrors, password: 'Password does not meet complexity requirements' }));
            return;
        }

        const hashedPassword = bcrypt.hashSync(registerData.password, 10);

        const data = {
            ...registerData,
            password: hashedPassword,
            confirmPassword: hashedPassword // Note: Typically, you wouldn't store the confirm password in the database
        };

        const url = 'https://localhost:44308/api/Test/Registration'; // Ensure this URL is correct
        axios.post(url, data)
            .then((result) => {
                alert(result.data);
                // Trigger confirmation email sending here
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

    const forgotPasswordLink = () => {
        setAction('forgot-password');
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        setForgotPasswordMessage('');

        // Add your logic here for sending reset password request
    };

    const loginLink = () => {
        setAction('');
    };

    const backToLogin = () => {
        setAction('');
    };

    const validatePasswordComplexity = (password) => {
        // Password complexity requirements
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password);

        // Check if password meets all complexity requirements
        if (
            password.length < minLength ||
            !hasUpperCase ||
            !hasLowerCase ||
            !hasNumber ||
            !hasSymbol
        ) {
            return false;
        }

        return true;
    };

    const validateFullNames = (fullnames) => {
        const fullNamesRegex = /^[A-Za-z\s]+$/;
        return fullNamesRegex.test(fullnames);
    };

    return (
        <div className={`wrapper ${action}`}>
            <div className="form-box login">
                <form onSubmit={handleLoginSubmit}>
                    <h1>Image Gallery App</h1>
                    <br></br>
                    <h2>Login</h2>

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
                        <a href="#" onClick={forgotPasswordLink}>Forgot password?</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form onSubmit={handleRegisterSubmit}>
                    <h2>Register Profile</h2>
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

            <div className="form-box forgot-password">
                <form onSubmit={handleForgotPasswordSubmit}>
                    <h1>Reset Password</h1>
                    <div className="input-box">
                        <input 
                            type="email" 
                            name="forgotPasswordEmail" 
                            placeholder="Enter your registered email" 
                            value={forgotPasswordEmail} 
                            onChange={handleForgotPasswordEmailChange} 
                            required 
                        />
                        <FaEnvelope className="icon" />
                    </div>
                    {forgotPasswordMessage && <span className="message">{forgotPasswordMessage}</span>}

                    <div className="input-box">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="New Password" 
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
                            placeholder="Confirm New Password" 
                            value={registerData.confirmPassword} 
                            onChange={handleRegisterChange} 
                            required 
                        />
                        <FaLock className="icon" />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit">Reset Password</button>

                    <div className="register-link">
                        <p>Remembered your password? <a href="#" onClick={backToLogin}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginRegister;
