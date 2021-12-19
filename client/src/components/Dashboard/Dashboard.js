import {React, useEffect, useState} from 'react';
import Header from '../Header/Header';
import { connect }from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import { useHistory } from 'react-router-dom';
import { Button, Container, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TicketGrid from '../Tickets/TicketGrid'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'absolute',
        left: '15vw',
        top: '15vh',
        width: '80vw',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    dashButton: {
        height: '80px',
        width: '200px'
    },
    dashGrid: {
        height: '50vh',
        width: '80vw'
    }

}))

const Dashboard = ({loginReducer}) => {
    const [ ticketList, setTicketList ] = useState([]);
    const [sortModel, setsortModel] = useState([
        {
        field: 'timeCreated',
        sort: 'desc'
        }
    ])
    const history = useHistory();
    const classes =useStyles();

    useEffect(() => {
        axios.get("http://localhost:5000/login")
        .then((res, err) => {
            if(err) console.log(err)

            if(!res.data.loggedIn){
                history.push('/')
            }
        })

        axios.post("http://localhost:5000/dashboard-ticket",{ name: loginReducer.loginStatus})
        .then((res, err) => {
            if(err) console.log(err)

            setTicketList(res.data)
        })
        
    }, [loginReducer.loginStatus])

    return (
        <>
           <Container className={classes.container}>
               <Box  sx={{ flexGrow: 1, ml: "100px"}}>
                   <Grid container spacing={1}>
                       <Grid item xs={5} >
                          <Button
                           className={classes.dashButton}
                            color="secondary"
                            variant='outlined'
                            onClick={() => history.push('/my-tickets')}
                            >
                            {`${ticketList.length} tickets in queue`}
                           </Button>

                       </Grid>
                       <Grid item xs={6}>
                           <Button
                           className={classes.dashButton}
                            color="primary"
                            variant="contained"
                            onClick={() => history.push('/my-projects')}
                            >
                               My Projects
                           </Button>
                       </Grid> 
                       <Grid item xs={5}>
                           <Button
                            className={classes.dashButton}
                            color="primary"
                            variant="contained"
                            onClick={() => history.push('/my-tickets')}
                            >
                                My Tickets
                           </Button>
                       </Grid>
                       <Grid item xs={6}>
                           <Button
                            className={classes.dashButton}
                            color="primary"
                            variant="contained"
                            onClick={() => history.push('/create-ticket')}
                            >
                               Create Ticket
                           </Button>
                       </Grid>
                   </Grid>
               </Box>
               <Container className={classes.dashGrid}>
                <TicketGrid ticketList={ ticketList } sortModel= {sortModel} />
               </Container>
           </Container>
           <Header/>
           <Sidebar/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        loginReducer: state.login
    }
}

export default connect(mapStateToProps)(Dashboard);