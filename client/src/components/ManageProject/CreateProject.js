import {React, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Button, List, Select, ListItem, MenuItem, Container, InputLabel, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    nameList: {
        width: '15em',
        height: '13em',
        maxHeight: '13em',
        overflowY: 'auto',
        border: '1px solid black'
    },
    transferContainer: {
        display: 'flex',
        marginBottom: theme.spacing(4),
        alignItems: 'center',
        justifySelf: 'start'
    },
    transferArrows: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    container: {
        position: 'absolute',
        left: '20vw',
        top: '20vh',
        width: '70vw',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start'
    },
    createProject : {
        width: '40%',
        alignSelf: 'center',
    },
    arrowButton: {
        width:'60%',
        alignSelf: 'center',
    }
}))


const CreateProject = ({ loginReducer }) => {
    const classes = useStyles();
    const history = useHistory();
    const [projectName, setProjectName] = useState('');
    const [projectLead, setProjectLead] = useState('');
    const [userList, setUserList] = useState([]);
    const [selectedUserList, setSelectedUserList] = useState([]);
    const [selectedUserName, setSelectedUserName] = useState('');
    const [highlightedName, setHighlightedName] = useState('');
    const [projectLeadList, setProjectLeadList] = useState([]);

    useEffect(() => {
        if(loginReducer.loginStatus.length === 0){
            history.push('/');
        }

        axios.get("http://localhost:5000/projectusers")
        .then(res => {
           setUserList(res.data)
        })
    }, [])

    const buttonClickRight = () => {
        let newArr;
            newArr = userList.filter(obj => {
                if(obj.user === selectedUserName){
                    setSelectedUserList([{ user: selectedUserName, role: obj.role }, ...selectedUserList])
                }                
                return obj.user !== selectedUserName
            })
            setUserList(newArr);
        
    }

    const buttonClickLeft = () => {
        let newArr;
        newArr = selectedUserList.filter(obj => {
            if(obj.user === selectedUserName){
                    setUserList([{ user: selectedUserName, role: obj.role }, ...userList])
            }                
            return obj.user !== selectedUserName
        })
        setSelectedUserList(newArr);
    }

    const buttonClickSelector = (e) => {
        setSelectedUserName(e.target.id); 
    }

    const createProject = (e) => {
        let users = selectedUserList.map(obj => {
            if(obj.user === projectLead){
                return { 
                    user: obj.user,
                    role: obj.role,
                    project: projectName,
                    projectlead: true
                }
            }else{
                return {
                    user: obj.user,
                    role:obj.role,
                    project: projectName,
                    projectlead: false
                }
            }
        })

        axios.post("http://localhost:5000/createproject", {
        users
        }).then(res =>{
            console.log(res.data)
            history.push('/manage-projects')
        })

    }

    const testState = () => [
        console.log(userList, selectedUserList)
    ]

    return (
        <>
            <Container className={classes.container}>
                
                <Container className={classes.transferContainer}>
                    <InputLabel id='create-project-project-name'>Project Name: </InputLabel>
                    <TextField type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                </Container>
               <Container className={classes.transferContainer}>
                    <InputLabel id='create-project-project-lead'>Project Lead:  </InputLabel>
                    <Select 
                    labelId= 'create-project-project-lead'
                    autoWidth 
                    value={projectLead} 
                    onChange={(e) => setProjectLead(e.target.value) }>
                        {selectedUserList.map((obj, index) => {
                            return(
                            <MenuItem value={obj.user} key={index + 100} >
                                {obj.user}
                            </MenuItem>
                            )
                        })}
                    </Select>

               </Container> 
                <Container className={classes.transferContainer}>
                    <Container className={classes.transferArrows}>
                        <InputLabel>All Users</InputLabel>
                        <List className={classes.nameList}>
                            <RenderNamesList arr={userList} func={(event) => buttonClickSelector(event)} num={0} />
                        </List>
                    </Container>
                    <Container className={classes.transferArrows}>
                        <Button
                        className={classes.arrowButton}
                        color='secondary'
                        variant='contained'
                        size = 'small'
                        onClick={() => buttonClickRight()}>
                            {'>>>'}
                        </Button>
                        <Button
                        className={classes.arrowButton}
                        color='secondary'
                        variant='contained'
                        size= 'small'
                        onClick={() => buttonClickLeft()}
                        >
                            {'<<<'}
                        </Button>
                    </Container>
                    <Container className={classes.transferArrows}>
                        <InputLabel>Project Members</InputLabel>
                        <List className={classes.nameList}>              
                            <RenderNamesList arr={selectedUserList} func={(event) => buttonClickSelector(event)} num={userList.length - 1} />
                        </List>
                    </Container>
                </Container>
                
                <Button 
                className={classes.createProject}
                color='primary' 
                variant='contained'
                onClick={() => createProject()}>Create Project</Button>
            </Container>
            <Header />
            <Sidebar />
        </>
    )
}

const RenderNamesList = ({arr = [], func, num}) => {

    return(
        <>
            {arr.map((obj, index) =>{
                return(
                    <ListItem id={obj.user} button key={index + num} value={obj.user} onClick={func}>
                        {obj.user}
                    </ListItem  >
                )
            })}
        </>
    )  
}

const mapStateToProps = (state) => {
    return {
        loginReducer: state.login
    }
}

export default connect(mapStateToProps)(CreateProject);