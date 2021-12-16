import React from 'react';
import { useDispatch, connect } from 'react-redux';
import axios from 'axios';
import { editTicket } from '../../actions';
import { useHistory } from 'react-router-dom';
import { Button, Container, List, ListItem, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    pageOverlay:{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw%',
        height: '100vh',
        zIndex: 8,
        background: 'rgb(117, 117, 117, .6)',
        display: 'none',
        maxWidth: '100%'
    },
    ticketContainer: {
        position: 'fixed',
        top: '10vh',
        left: '30vw',
        width: '40vw',
        height: '60vh',
        fontSize: '1.2em',   
        background: 'white',
        zIndex: 100,
        
    },
    close: {
        position: 'absolute',
        top: '0%',
        left: '95%',
        '& hover': {
            background: 'secondary'
        }
    },
    
}));

const Ticket = ({ ticket }) => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();


    const pageOverlayOffClick = (e) => {
        e.preventDefault();
        if(e.target === e.currentTarget) {
            e.target.style.display = 'none'
        }
    }
    
    const updateTicket = (event) => {
        event.preventDefault();
        dispatch(editTicket(ticket));
        history.push('/edit-ticket');
    }

    const newDeleteTicket = (e) => {
        e.preventDefault();
        document.getElementsByClassName('ticket-delete-box')[0].style.display = 'block';
    }
    const closeButton = () => {
        document.getElementsByClassName('page-overlay')[0].style.display = 'none'
    }
    

    return (
        <Container className={`page-overlay ${classes.pageOverlay}`} onClick={(e) => pageOverlayOffClick(e)}>
            <Container className={classes.ticketContainer}>
                <CloseIcon color='secondary' className={`close-button ${classes.close}`} onClick={ () =>closeButton() }/>
                <List>
                    <ListItem><b>Title:</b> &nbsp; {ticket.title}</ListItem>
                    <ListItem><b>Project:</b> &nbsp; {ticket.project}</ListItem>
                    <ListItem><b>Priority:</b> &nbsp; {ticket.priority}</ListItem>
                    <ListItem><b>Status:</b> &nbsp; {ticket.status}</ListItem>
                    <ListItem><b>Description:</b> &nbsp; {ticket.description}</ListItem>
                </List>
                <Button
                color = 'primary'
                variant= 'contained'
                onClick={(e) => updateTicket(e)}>Update Ticket</Button>
                <Button 
                color = 'secondary'
                variant = 'contained'
                onClick={(e) => newDeleteTicket(e)}>Delete Ticket</Button>
            </Container>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return{
        ticketEdit: state.ticketEdit
    }
}

export default connect(mapStateToProps, { editTicket })(Ticket);