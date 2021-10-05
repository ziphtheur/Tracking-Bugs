import React from 'react';
import { useHistory } from 'react-router-dom';
import './sidebar.css';
import { ListItemText, List, ListItem, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
        sidebar: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '15vw',
            minWidth: '15vw',
            height: '100vh',
            borderRight: 'solid 1px black',
            zIndex: '2',
            background: 'white',
        },
        sidebarLinks: {
            marginTop: '15vh',
            marginLeft: '0px',
            display: 'flex',
            flexDirection: 'column',
            height: '30vh',
        },
        DevAdmin: {
            display: 'none',

        }
        
  }));
  

const NewSidebar = () => {
    const classes= useStyles();
    const history = useHistory();

    return (
        <Container className={classes.sidebar}>
            <Typography component='h1'>
                MERN BugTracker
            </Typography>
            <List className={classes.sidebarLinks}>
                <ListItem button variant="contained" onClick={() => history.push('/dashboard')} >
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem className={classes.DevAdmin} button onClick={() => history.push('/manage-user-role')}>
                    <ListItemText primary="Manage User Roles"/>
                </ListItem>
                <ListItem button onClick={() => history.push('/manage-projects')}>
                    <ListItemText primary="Manage Projects"/>
                </ListItem>
                <ListItem className={classes.DevAdmin} button onClick={() => history.push('/my-projects')}>
                    <ListItemText primary="My Projects"/>
                </ListItem>
                <ListItem button onClick={() => history.push('/my-tickets')}>
                    <ListItemText primary="My Tickets" />
                </ListItem>
                <ListItem button onClick={() => history.push('/create-ticket')}>
                    <ListItemText primary="Create Ticket" />
                </ListItem>
            </List>

        </Container>
        
    )
}
export default NewSidebar;