import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { projectTickets } from '../../actions'
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Container, Grid, Box } from '@material-ui/core';
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
        alignContent: 'center',
        overflow: 'auto',
        [theme.breakpoints.down(900)]: {
            width: '100vw',
            left: '0',
        },
    },
    projectButton: {
        width: '200px',
        height: '200px',
        fontSize: '100%',
        [theme.breakpoints.down(700)]: {
            width: '150px',
            height: '150px',
        },
        [theme.breakpoints.down(500)]: {
            width: '100px',
            height: '100px',
        },
    },

}))


const MyProjects = ({ loginReducer }) => {
    const classes= useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [projectsList, setProjectList] = useState([]);

    useEffect(() => {
        axios.get("https://mern-tracking-bugs.herokuapp.com/login")
        .then((res, err) => {
            if(err) console.log(err)

            if(!res.data.loggedIn){
                history.push('/')
            }
        })

        axios.post('https://mern-tracking-bugs.herokuapp.com/get-projects', { loginStatus: loginReducer.loginStatus})
        .then((res, err) => {
            let tempArr = [];
            let resArray = res.data;
            resArray.map(obj => {
                if(tempArr.includes(obj)){
                    return '';
                }else{
                    tempArr.push(obj)
                    return obj;
                }
                
            })
            setProjectList(tempArr)
        })
    })

    const selectProject = (projectName) => {
        dispatch(projectTickets(projectName))
        history.push('/project-tickets')
    }

    return (
        <>
        <Container className={classes.container}>
            <Box sx={{ flexGrow: 1}}>
                <Grid container spacing={3}>
                    {projectsList.map((obj, index) => {
                        let color ='';
                        if(index%2 === 0){
                            color = 'primary'
                        }else{
                            color = 'secondary'
                        }
                        return(
                            <>
                            <Grid item xs ={4}>
                                <Button
                                key={index}
                                className={classes.projectButton}
                                variant='contained'
                                color={color}
                                onClick= {() => {
                                    selectProject(obj.project)
                                }}
                                >
                                    {obj.project}
                                </Button>
                            </Grid>
                            </>
                        )
                    })}
                </Grid>
            </Box>
        </Container>
        <Header/>
        <Sidebar/>
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        loginReducer: state.login
        
    }
}

export default connect(mapStateToProps,{ projectTickets })(MyProjects);