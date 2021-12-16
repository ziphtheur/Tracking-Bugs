import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Container } from '@material-ui/core';
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
        alignContent: 'center',
        overflow: 'auto',
        alignContent: 'flex-start'
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
    const [ ticketList, setTicketList ] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:5000/get-tickets', 
        ({ project: projectTickets.projectName}))
        .then((res,err) => {
            if(err)console.log(err)
            else{
                console.log(res.data)
                setTicketList(res.data)
            }
        })
    }, [])

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

