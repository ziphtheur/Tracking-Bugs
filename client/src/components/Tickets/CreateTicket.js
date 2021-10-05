import {React, useState, useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Select, MenuItem, Container, InputLabel, TextField, TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './CreateTicket.css';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'absolute',
        left: '20vw',
        top: '20vh',
        width: '70vw',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    itemContainer: {
        marginBottom: '1em',
        display: 'flex',
        flex: '1',
        alignItems: 'center',
    },
    labels: {
        marginRight: '1em'
    }

}))


const CreateTicket = ({ loginReducer }) => {
    const history = useHistory();
    const classes = useStyles();
    const [ticketTitle, setTicketTitle] = useState("");
    const [ticketDescription, setTicketDescription] = useState("");
    const [projectName, setProjectName] = useState("");
    const [assignedDeveloper, setAssignedDeveloper] = useState("Any");
    const [ticketPriority, setTicketPriority] = useState("High");
    const [ticketStatus, setTicketStatus] = useState("On Hold");
    const [currrentTime, setCurrentTime] = useState("");
    const [submitter, setSubmitter] = useState("");
    const [projectList, setProjectList] = useState([]);   

    useEffect( () => {
        const dateTime = new Date();
        const tempDateTime = setInterval(() => {
            if(dateTime.getSeconds() < 10){
                setCurrentTime(`${dateTime.getFullYear()}-${dateTime.getMonth()+1}-${dateTime.getDate()} ${dateTime.getHours() - 4}:${dateTime.getMinutes()}:0${dateTime.getSeconds()}`)    
            }else{
                setCurrentTime(`${dateTime.getFullYear()}-${dateTime.getMonth()+1}-${dateTime.getDate()} ${dateTime.getHours() - 4}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`)
            }

            
        }, 1000)

        return () => { clearInterval(tempDateTime)}


        
    }, [currrentTime])

    useEffect( () => {
        setSubmitter(loginReducer.loginStatus) 

        axios.get("http://localhost:5000/projectname")
        .then(res => {
            setProjectList(res.data)
        }) 

    }, [loginReducer])  

    const formSubmit = (event) => {
        event.preventDefault();
        let ticket = {
            ticketTitle: ticketTitle,
            projectName: projectName,
            assignedDeveloper: assignedDeveloper,
            ticketDescription: ticketDescription,
            ticketPriority: ticketPriority,
            ticketStatus: ticketStatus,
            currrentTime: currrentTime,
            submitter: submitter
        }

        axios.post('http://localhost:5000/createticket', ticket)
        .then(res => {
            console.log(res.data)
        })

        history.push('/dashboard')
    }    

// Assigned developer needs to be admin accesss only
    return (
        <>
            <Sidebar />
            <Header />
            <Container className={classes.container}>
                <form className="create-ticket" onSubmit={(e) => formSubmit(e)}>
                    <Container className={classes.itemContainer}>
                        <InputLabel className={classes.labels} id='create-ticket-title-label'>Ticket Title</InputLabel>
                        <TextField 
                        labelId = 'create-ticket-title-label'
                        id="ticket-Title" 
                        value={ticketTitle} 
                        onChange={event => setTicketTitle(event.target.value)}/>
                    </Container>
                   <Container className={classes.itemContainer}>
                        <InputLabel className={classes.labels} id='create-ticket-projectName-label'>Project Name</InputLabel>
                        <Select 
                        labelId='create-ticket-projectName-label'
                        value={projectName} 
                        onChange={e => setProjectName(e.target.value)}
                        >
                            {projectList.map((obj, index) => {
                                return(
                                    <MenuItem value={obj} key={index + 10}>{obj}</MenuItem>
                                ) 
                            })}
                        </Select>
                   </Container>
                    <Container className={classes.itemContainer}>
                        <InputLabel className={classes.labels} id='create-ticket-assignedDev-label'>Assigned Developer</InputLabel>
                        <Select 
                        labelId='create-ticket-assignedDev-label'
                        value={assignedDeveloper} 
                        onChange={e => setAssignedDeveloper(e.target.value)}>
                            <MenuItem value="Any">Any</MenuItem>
                            <MenuItem value={null}> employees assigned </MenuItem>
                        </Select>
                    </Container>
                    <Container className={classes.itemContainer}>
                        <InputLabel className={classes.labels} id='create-ticket-priority-label'>Ticket Priority</InputLabel>
                        <Select 
                        labelId='create-ticket-priority-label'
                        value={ticketPriority} 
                        onChange={e => setTicketPriority(e.target.value)}>
                            <MenuItem className="priority-high" value="High">High</MenuItem>
                            <MenuItem className="priority-medium" value="Medium">Medium</MenuItem>
                            <MenuItem className="priority-low" value="Low">Low</MenuItem>
                        </Select>
                    </Container>
                    <Container className={classes.itemContainer}>
                        <InputLabel className={classes.labels} id='create-ticket-status-label'>Ticket Status</InputLabel>
                        <Select 
                        labelId='create-ticket-status-label'
                        value={ticketStatus} 
                        onChange={e => setTicketStatus(e.target.value)}>
                            <MenuItem value="On Hold">On Hold</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Fixed">Fixed</MenuItem>
                            <MenuItem value="Under Review">Under Review</MenuItem>
                            <MenuItem value="Approved">Approved</MenuItem>
                            <MenuItem value="Deployed">Deployed</MenuItem>
                            <MenuItem value="Closed">Closed</MenuItem>        
                        </Select>
                    </Container>
                        <InputLabel className={classes.labels} id='create-ticket-description-label'>Description</InputLabel>
                        <TextareaAutosize
                        labelId='create-ticket-description-label' 
                        minRows={5} value={ticketDescription} 
                        onChange={event => setTicketDescription(event.target.value)} />
                    <Button 
                    color='primary'
                    variant='contained' 
                    type="submit">Submit</Button>
                </form>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        loginReducer: state.login
    }
}

export default connect(mapStateToProps)(CreateTicket);