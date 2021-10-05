import React from 'react';
import { connect } from 'react-redux';
import './header.css';

const Header  = ({finalLogin}) => {

    return(
        <div className="header">
            <h1>Logged in as: {finalLogin.loginStatus}</h1>
            <div>Notifications</div>
            <div>User Profile</div>
        </div>        
    )
}

const mapStateToProps = (state) => {
    return {
        finalLogin: state.login
    }
}

export default connect(mapStateToProps, {})(Header);