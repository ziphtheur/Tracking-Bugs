import{ React, useState, useEffect} from 'react';
import Ticket from './Ticket';
import { useHistory } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    ticketDeleteBox: {
        position: 'fixed',
        top: '0vh',
        left: '0vw',
        width: '100vw',
        height: '100vh',
        zIndex: 8,
        background: 'rgb(117, 117, 117, .6)',
        display: 'none',
    },
    activeBox: {
        position: 'fixed',
        padding: '5px',
        left: '40vw',
        top: '30vh',
        width: '20vw',
        height: '25vh',
        backgroundColor: 'blanchedalmond',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        fontSize: '24px',
    }

}))


const TicketGrid = ({ ticketList, sortModel }) => {
    const history = useHistory();
    const classes = useStyles();
    const [selectedTicket, setSelectedTicket] = useState([]);
    const [ tempSortModel, setTempSortModel ] = useState(sortModel);

    useEffect(() => {
        axios.get("http://localhost:5000/login")
        .then((res, err) => {
            if(err) console.log(err)

            if(!res.data.loggedIn){
                history.push('/')
            }
        })
    })

    const rows = ticketList.map((obj, index) =>{
        return(
               {id: index, 
                title: obj.title, 
                project: obj.project, 
                priority: obj.priority, 
                status: obj.ticketStatus, 
                description: obj.description,
                timeCreated: obj.createdTime.replace('T', ' ').replace('.000Z', ''),
                assignedDev: obj.assignedDev, 
                submitter: obj.submitter}
                
        )
    })
    const columns = [
        { 
            field: 'title', 
            headerName: 'Title', 
            hideSortIcons: true,
            minWidth: 200,

        },
        {
            field: 'project',
            headerName: 'Project',
            hideSortIcons: true,
            minWidth: 150
        },
        {
            field: 'priority',
            headerName: 'Priority',
            hideSortIcons: true,
            minWidth: 150
        },
        {
            field: 'status',
            headerName: 'Status',
            hideSortIcons: true,
            minWidth: 140
        },
        {
            field: 'description',
            headerName: 'Description',
            hideSortIcons: true,
            minWidth: 250
        },
        {
            field: 'timeCreated',
            headerName: 'Time Created',
            hideSortIcons: true,
            minWidth: 200
        },
        {
            field: 'submitter',
            headerName: 'Submitter',
            hideSortIcons: true,
            minWidth: 300
        }

    ]
    const yesDelete = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/delete-ticket', selectedTicket)
        .then(res => console.log(res.data))

        history.push('/dashboard');
    }

    const noDelete = (e) => {
        e.preventDefault();
        document.getElementsByClassName('ticket-delete-box')[0].style.display = 'none';
    }

    return(
        <>
            <Ticket ticket={selectedTicket} />
            <p>
               (Double click a row to edit/update the ticket)
            </p>
            <DataGrid 
                        rows= {rows}
                        columns= {columns}
                        sortModel={tempSortModel}
                        autoPageSize = {true}
                        disableColumnMenu = {true}   
                        onRowDoubleClick = {e => {
                            setSelectedTicket(e.row)  
                            document.getElementsByClassName('page-overlay')[0].style.display = 'block'
                        }}                     
                />
             <Container className={`ticket-delete-box ${classes.ticketDeleteBox}`}>
            <Container className={classes.activeBox}>
                Are you sure you want to Delete?
                <Button
                color='secondary'
                variant='contained'
                onClick={(e) => yesDelete(e)}
                >
                    Yes
                </Button>
                <Button 
                color='primary'
                variant='contained'
                onClick={(e) => noDelete(e)}>No</Button>
            </Container>
        </Container>
        </>
    )
}

export default TicketGrid;
