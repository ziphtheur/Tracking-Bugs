import {React, useEffect, useState} from 'react';
import NewHeader from '../Header/newHeader';
import { connect }from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import { useHistory } from 'react-router-dom';
import { Button, Container, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'absolute',
        left: '15vw',
        top: '20vh',
        width: '80vw',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    dashButton: {
        height: '120px',
        width: '200px'
    }

}))

const Dashboard = ({loginReducer}) => {
    const [ ticketList, setTicketList ] = useState();
    const history = useHistory();
    const classes =useStyles();

    useEffect(() => {

        axios.post("http://localhost:5000/dashboard-ticket",{ name: loginReducer.loginStatus})
        .then((res, err) => {
            if(err) console.log(err)

            console.log(res)
        })
        
    })

    return (
        <>
           <Container className={classes.container}>
               <Box  sx={{ flexGrow: 1, overflow: 'auto'}}>
                   <Grid container spacing={2}>
                       <Grid item xs={5}>
                           number of open tickets

                       </Grid>
                       <Grid item xs={6}>
                           <Button
                           className={classes.dashButton}
                            color="primary"
                            size="large"
                            variant="contained"
                            onClick={() => history.push('/manage-projects')}
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
           </Container>
           <NewHeader/>
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