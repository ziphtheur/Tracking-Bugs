import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { finalLogin } from '../../actions/index';
import './header.css';
import { Container, List, ListItem, ListItemText, Typography, Menu, MenuItem } from '@material-ui/core';
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

const NewHeader  = ({loginReducer}) => {
    const classes = useStyles();
    const [anchor, setAnchor] = useState();
    const dispatch= useDispatch();
    const history = useHistory();
    const open = Boolean(anchor);

    const logOut = () => {
        dispatch(finalLogin(['', '']))
        handleClose();
        history.push('/');

    }

    const handleClickLogout = (e) => {
        setAnchor(e.currentTarget);
    }

    const handleClose = () => {
        setAnchor(null);
    }

    return(
        <Container className={classes.header}>
            <Typography component='h1'>Logged in as: {loginReducer.loginStatus}</Typography>
            <List className={classes.profile}>
                <ListItem><NotificationsIcon/></ListItem>
                <ListItem>
                    <AccountCircleIcon
                    id= 'basic-button'
                    aria-controls='basic-menu'
                    aria-haspopup='true'
                    aria-expanded= {open ? 'true' : undefined}
                    onClick ={handleClickLogout}
                    />
                    <Menu
                    id="basic-menu"
                    anchorEl={anchor}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aris-labelledby' : 'basic-button',
                    }}
                    >     
                    <MenuItem onClick={() => logOut()}>LogOut</MenuItem>                   
                    </Menu>
                    
                </ListItem>
            </List>
        </Container>      
    )
}

const mapStateToProps = (state) => {
    return {
        loginReducer: state.login
    }
}

export default connect(mapStateToProps)(NewHeader);