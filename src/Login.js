import React, { Fragment, useState } from "react";
import axios from "axios";

function Login(){
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailAddressChange = (value) => {
        setEmailAddress(value);
    }
    const handlePasswordChange = (value) => {
        setPassword(value);
    }
    
    const handleLogin = () => {
        const data = {
        EmailAddress : emailAddress,
        Password : password,
     };

     const url = 'https://localhost:44308/api/Test/Login';
     axios.post(url, data).then((result) =>{
        alert(result.data);
     }).catch((error)=>{
        alert(error);
     })
    }

    return(
        <Fragment>
            <label>Email Address</label>
        <input type="text" id="txtEmailAddress" placeholder='Enter Email Address' onChange={(e) => handleEmailAddressChange(e.target.value)} /><br></br>
        <label>Password</label>
        <input type="text" id="txtPassword" placeholder='Enter Password' onChange={(e) => handlePasswordChange(e.target.value)} /><br></br>
        <br></br>
        <button onClick={() => handleLogin()}>Login</button>
        </Fragment>
    )
}

export default Login;