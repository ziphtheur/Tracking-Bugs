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

}))

const Dashboard = ({loginReducer}) => {
    const [ ticketList, setTicketList ] = useState();
    const history = useHistory();
    const classes =useStyles();

    useEffect(() => {
        let name = loginReducer;

        
    })

    return (
        <>
           <Container className={classes.container}>
               <Box  sx={{ flexGrow: 1, overflow: 'auto'}}>
                   <Grid container spacing={2}>
                       <Grid item sx={6}>
                           number of open tickets

                           <Button
                            color="primary"
                            variant="contained">
                               My Projects
                           </Button>
                       </Grid> 
                       <Grid item sx={6}>
                           <Button
                            color="primary"
                            variant="contained">
                                My Tickets
                           </Button>
                       </Grid>
                       <Grid item sx={6}>
                           <Button
                            color="primary"
                            variant="contained">
                               Create Ticket
                           </Button>
                       </Grid>
                       <Grid item sx={6}>
                           <Button
                            color="primary"
                            variant="contained">

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