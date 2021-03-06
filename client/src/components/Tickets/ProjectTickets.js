import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TicketGrid from './TicketGrid';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'absolute',
        left: '15vw',
        top: '15vh',
        width: '80vw',
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        alignContent: 'flex-start',
        [theme.breakpoints.down(900)]: {
            width: '105vw',
            left: '0',
        },
    },
    projectTitle: {
        alignSelf: 'center',
        minHeight: '75px',
        maxHeight: '150px',
        flex: '.1',
    }

}))


const ProjectTickets = ({ projectTickets }) => {
    const classes = useStyles();
    const history = useHistory();
    const [ ticketList, setTicketList ] = useState([]);

    useEffect(() => {
        axios.get("https://mern-tracking-bugs.herokuapp.com/login")
        .then((res, err) => {
            if(err) console.log(err)

            if(!res.data.loggedIn){
                history.push('/')
            }
        })

        axios.post('https://mern-tracking-bugs.herokuapp.com/get-tickets', 
        ({ project: projectTickets.projectName}))
        .then((res,err) => {
            if(err)console.log(err)
            else{
                setTicketList(res.data)
            }
        })
    }, [projectTickets.projectName, history])

    return (
        <>
        <Container className={classes.container}> 
            <h1 className={classes.projectTitle}>{projectTickets.projectName}</h1>           
            <TicketGrid ticketList={ticketList} />
        </Container>
        <Header />
        <Sidebar />
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        projectTickets: state.projectTickets
    }
}

export default connect(mapStateToProps)(ProjectTickets);

