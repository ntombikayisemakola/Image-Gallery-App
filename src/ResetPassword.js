import React, { useState } from "react";
import axios from "axios";
import './ResetPassword.css';
import { FaLock } from "react-icons/fa";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };

    const handleResetPasswordSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setMessage('Passwords do not match');
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword)) {
            setMessage('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number.');
            return;
        }

        const url = 'https://localhost:44308/api/Test/ResetPassword'; // Ensure this URL is correct
        axios.post(url, { newPassword })
            .then((result) => {
                setMessage('Password has been reset successfully.');
            })
            .catch((error) => {
                setMessage('Failed to reset password. Please try again.');
            });
    };

    return (
        <div className="wrapper">
            <div className="form-box reset-password">
                <form onSubmit={handleResetPasswordSubmit}>
                    <h1>Reset Password</h1>
                    
                    <div className="input-box">
                        <input 
                            type="password" 
                            name="newPassword" 
                            placeholder="New Password" 
                            value={newPassword} 
                            onChange={handleNewPasswordChange} 
                            required 
                        />
                        <FaLock className="icon" />
                    </div>

                    <div className="input-box">
                        <input 
                            type="password" 
                            name="confirmNewPassword" 
                            placeholder="Confirm New Password" 
                            value={confirmNewPassword} 
                            onChange={handleConfirmNewPasswordChange} 
                            required 
                        />
                        <FaLock className="icon" />
                    </div>

                    {message && <span className="message">{message}</span>}

                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
