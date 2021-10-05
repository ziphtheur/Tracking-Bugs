import React from 'react';
import { connect } from 'react-redux';
import './header.css';
import { Container, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        position: 'absolute',
        top: '0',
        left: '15vw',
        width: '85vw',
        height: '8vh',
        display: 'flex',
        alignItems: 'flex-end',
        borderBottom: 'solid 1px black' ,
    },
    profile: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyItems: 'center'
    }

}));

const NewHeader  = ({finalLogin}) => {
    const classes = useStyles();

    return(
        <Container className={classes.header}>
            <Typography component='h1'>Logged in as: {finalLogin.loginStatus}</Typography>
            <List className={classes.profile}>
                <ListItem><NotificationsIcon/></ListItem>
                <ListItem><AccountCircleIcon/></ListItem>
            </List>
        </Container>      
    )
}

const mapStateToProps = (state) => {
    return {
        finalLogin: state.login
    }
}

export default connect(mapStateToProps, {})(NewHeader);