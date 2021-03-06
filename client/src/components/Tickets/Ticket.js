import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { editTicket } from '../../actions';
import { useHistory } from 'react-router-dom';
import { Button, Container, List, ListItem, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
    pageOverlay:{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: 8,
        background: 'rgb(117, 117, 117, .6)',
        display: 'none',
        maxWidth: '100%'
    },
    ticketContainer: {
        position: 'fixed',
        top: '10vh',
        left: '20vw',
        width: '60vw',
        height: 'auto',
        fontSize: '1.2em',   
        background: 'white',
        zIndex: 100,
        overflowY: 'auto',
        [theme.breakpoints.down(900)]: {
            width: '80vw',
            left: '10vw'
        },
        [theme.breakpoints.down(700)]: {
            width: '100vw',
            left: '0',
        },
        
    },
    close: {
        position: 'absolute',
        top: '0%',
        right: '0px',
        '& hover': {
            background: 'secondary'
        }
    },
    buttonDiv: {
        marginBottom: ' 15px'
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
                <div className={classes.buttonDiv}>
                    <Button
                    color = 'primary'
                    variant= 'contained'
                    onClick={(e) => updateTicket(e)}>Update Ticket</Button>
                    <Button 
                    color = 'secondary'
                    variant = 'contained'
                    onClick={(e) => newDeleteTicket(e)}>Delete Ticket</Button>
                </div>
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