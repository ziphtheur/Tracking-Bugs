import { React, useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [ regUsername, setRegUsername ] = useState('');
    const [ regPassword, setRegPassword ] = useState('');

    const register = () => {

        axios.post("http://localhost:5000/register" , {
            username: regUsername,
            password: regPassword
        }).then(res => console.log(res))

        document.querySelector(".register-container").style.display = "none";
        document.querySelector(".")
    }

    const toRegularAccounts = () => {
        document.querySelector(".register-container").style.display = "none";
        document.querySelector(".login-container").style.display = "flex";
    }

    return(
        <div className="register-container">
            <h1>Create New Account</h1>
            <form className="register-form" onSubmit={register}>
                <div className="reg-username">
                    <label>Username:</label>
                    <input type="text" value={regUsername} required onChange={(e) => setRegUsername(e.target.value)} />
                </div>
                <div className="reg-password">
                    <label>Password:</label>
                    <input type="text" value={regPassword} required onChange={(e) => setRegPassword(e.target.value)} />
                </div>
                <input className="submit-new-account" type="submit" value="Submit New Account" />
            </form>
            <button className="to-regular-account" onClick={toRegularAccounts}>regular accounts</button>
        </div>
    )
}

export default Register;