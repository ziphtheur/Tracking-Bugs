import {React, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Select, MenuItem, Container, InputLabel, TextField, TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './EditTicket.css'

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

const EditTicket = ({ ticketEdit }) => {
    const history = useHistory();
    const classes = useStyles();
    const [ticketTitle, setTicketTitle] = useState("");
    const [ticketDescription, setTicketDescription] = useState("");
    const [projectName, setProjectName] = useState("");
    const [assignedDeveloper, setAssignedDeveloper] = useState("");
    const [ticketPriority, setTicketPriority] = useState("");
    const [ticketStatus, setTicketStatus] = useState("");
    const [currrentTime, setCurrentTime] = useState("");
    const [submitter, setSubmitter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/login")
        .then((res, err) => {
            if(err) console.log(err)

            if(!res.data.loggedIn){
                history.push('/')
            }
        })
        
        setTicketTitle(ticketEdit.ticket.title);
        setTicketDescription(ticketEdit.ticket.description);
        setTicketPriority(ticketEdit.ticket.priority);
        setProjectName(ticketEdit.ticket.project);
        setAssignedDeveloper(ticketEdit.ticket.assignedDev);
        setTicketDescription(ticketEdit.ticket.description);
        setTicketStatus(ticketEdit.ticket.status);
        setCurrentTime(ticketEdit.ticket.timeCreated);
        setSubmitter(ticketEdit.ticket.submitter);
        console.log(ticketEdit.ticket.id)
    }, [ticketEdit, history])

    const formSubmit = (e) => {
        e.preventDefault();
        
        let updatedTicket = {
            ticketID: ticketEdit.ticket.id,
            ticketTitle: ticketTitle,
            projectName: projectName,
            assignedDeveloper: assignedDeveloper,
            ticketDescription: ticketDescription,
            ticketPriority: ticketPriority,
            ticketStatus: ticketStatus,
            currrentTime: currrentTime,
            submitter: submitter
        }
        axios.post('http://localhost:5000/edit-ticket', updatedTicket)
        .then(res => {
            console.log(res.data)
        })

        history.push('/my-tickets')
    }

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
                        <TextField
                        labelId='create-ticket-projectName-label'
                        value={projectName}>
                            {projectName}
                        </TextField>
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
        ticketEdit: state.ticketEdit
    }
}

export default connect(mapStateToProps)(EditTicket);