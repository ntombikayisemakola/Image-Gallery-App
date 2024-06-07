import React, { Fragment, useState } from "react";
import axios from "axios";
import './Registration.css';

function Registration(){
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleFullNameChange = (value) => {
        setFullName(value);
    }
    const handleEmailAddressChange = (value) => {
        setEmailAddress(value);
    }
    const handlePasswordChange = (value) => {
        setPassword(value);
    }
    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
    }
    
    const handleSave = () => {
        const data = {
        FullName : fullName,
        EmailAddress : emailAddress,
        Password : password,
        ConfirmPassword : confirmPassword,
        IsActive : 1
     };

     const url = 'https://localhost:44308/api/Test/Registration';
     axios.post(url, data).then((result) =>{
        alert(result.data);
     }).catch((error)=>{
        alert(error);
     })
    }

    return(
        <Fragment>
        <div className="registration-container">
        <div>Registration</div>
        <label>Full Name</label>
        <input type="text" id="txtName" placeholder='Enter Full Name' onChange={(e) => handleFullNameChange(e.target.value)} /><br></br>
        <label>Email Address</label>
        <input type="text" id="txtEmailAddress" placeholder='Enter Email Address' onChange={(e) => handleEmailAddressChange(e.target.value)} /><br></br>
        <label>Password</label>
        <input type="text" id="txtPassword" placeholder='Enter Password' onChange={(e) => handlePasswordChange(e.target.value)} /><br></br>
        <label>Confirm Password</label>
        <input type="text" id="txtConfirmPassword" placeholder='Enter Confirm Password' onChange={(e) => handleConfirmPasswordChange(e.target.value)} /><br></br>
        <button onClick={() => handleSave()}>Save</button>
        </div>
        </Fragment>
    )
}

export default Registration;