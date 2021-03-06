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
        alignContent: 'center',
        [theme.breakpoints.down(900)]: {
            left: '0',
            width: '100vw'
        },
    },
    dashButton: {
        height: '80px',
        width: '200px',
        [theme.breakpoints.down(500)]: {
            width: '150px',
            marginRight: '50px',
        },
        
    },
    dashGrid: {
        flex: 'start',
        height: '50vh',
        width: '80vw',
        [theme.breakpoints.down(900)]: {
            width: '100vw'
        },
    },
    buttonBox: {
        marginLeft: '100px',
        [theme.breakpoints.down(900)]: {
            marginLeft: '100px',
            width: '100vw',
        },
        [theme.breakpoints.down(700)]: {
            marginLeft: '50px',
        },
        [theme.breakpoints.down(500)]: {
            marginLeft: '0',
        },
        
    }

}))

const Dashboard = ({loginReducer}) => {
    const [ ticketList, setTicketList ] = useState([]);
    const [ permission, setPermission ] = useState('');
    const [ user, setUser ] = useState('');
    const history = useHistory();
    const classes =useStyles();
    const sortModel = [
        {
        field: 'timeCreated',
        sort: 'desc'
        }
    ]

    useEffect(() => {
        axios.get("https://mern-tracking-bugs.herokuapp.com/login")
        .then((res, err) => {
            if(err) console.log(err)

            if(!res.data.loggedIn){
                console.log(res.data)
                history.push('/')
            }else{
                setPermission(res.data.user[1])
                setUser(res.data.user[0])
            }
        })

        axios.post("https://mern-tracking-bugs.herokuapp.com/dashboard-ticket",{ name: user})
        .then((res, err) => {
            if(err) console.log(err)

            setTicketList(res.data)
        })
        
    }, [ user, history ])

    const permissionCheckTickets = () => {
        if(permission !== 'Team Member') {
            return(
             <>
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
             </>
            )
        }
    }

    const permissionCheckProjects = () => {
        if(permission !== 'Team Member'){
            return(
             <>
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
             </>
             )
            }
    }

    return (
        <>
           <Container className={classes.container}>
               <Box className={classes.buttonBox}  sx={{ flexGrow: 1}}>
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
                           {permissionCheckProjects()}      
                           {permissionCheckTickets()}
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