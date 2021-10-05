import {React, useState} from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { finalLogin } from '../../actions'
import Register from './Register';
import './login.css'
import axios from 'axios';



const Login = ({ loginReducer }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const buttonClick = (e, name) => {
        setLogin(name)
        setPassword("PassWord1")
    }

    const formSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/login", {
            username: login,
            password: password
        }).then(res => {
            if(res.data.message){
                alert('wrong username/password')
            }else{
                dispatch(finalLogin(res.data))
                history.push("/dashboard")
            }
        })              
    }

    const createAccount = () => {
        document.querySelector(".register-container").style.display = "flex";
        document.querySelector(".login-container").style.display = "none";
    }

    const toTestAccount = () => {
        document.querySelector(".test1-login-container").style.display = "grid";
        document.querySelector(".login-container").style.display = "none";
    }

    return (
        <div className="login-page">
            <div className="test1-login-container">
                <button className="admin-button" onClick={(event) => buttonClick(event, 'Admin')}>Admin</button>
                <button className="developer-button" onClick={(event) => buttonClick(event, 'Developer')}>Developer</button>
                <button className="project-manager-button" onClick={(event) => buttonClick(event, 'Project Manager')}>Project Manager</button>
                <button className="team-member-button" onClick={(event) => buttonClick(event, 'Team Member')}>Team Member</button>
            </div>
            <div className="login-container"> 
                <h1>Bug-Tracker Login</h1>
                <form id="login-form" onSubmit={formSubmit}>
                    <div className="login-username">
                        <label>Username: </label>
                        <input type="text" required value={login} onChange={(e) => setLogin(e.target.value)} />
                    </div>
                    <div className="login-password">
                        <label>Password: </label>
                        <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </form>
                <button className="to-test-accounts" onClick={toTestAccount}>test accounts</button>
            </div>
            <button className="login-submit" form="login-form" type="submit">Login</button>
            <button className="create-account" onClick={createAccount}>Create Account</button>
            <Register />
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loginReducer: state.login
    }
}

export default connect(mapStateToProps, { finalLogin })(Login);