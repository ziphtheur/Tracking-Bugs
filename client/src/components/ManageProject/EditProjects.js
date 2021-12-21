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
        justifyContent: 'start',
        [theme.breakpoints.down(900)]: {
            width: '105vw',
            left: '0',
        },
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


const EditProject = ({projectEditReducer, loginReducer}) => {
    const history = useHistory();
    const classes = useStyles();
    const [projectName, setProjectName] = useState(projectEditReducer.project);
    const [projectLead, setProjectLead] = useState('');
    const [userList, setUserList] = useState([]);
    const [selectedUserList, setSelectedUserList] = useState([]);
    const [selectedUserName, setSelectedUserName] = useState('');
     
    useEffect(() => {
        axios.get("https://mern-tracking-bugs.herokuapp.com/login")
        .then((res, err) => {
            if(err) console.log(err)

            if(!res.data.loggedIn){
                history.push('/')
            }
        })

        let newArr;
        axios.get("https://mern-tracking-bugs.herokuapp.com/projects")
        .then(res => {
            newArr = res.data.filter(obj => {
                return obj.project === projectEditReducer.project 
            }).map(obj => {
                if(obj.projectlead === 1) {
                    setProjectLead(obj.name)
                    console.log(obj.name)
                }
                return obj.name
            })
            
        })
        
        axios.get("https://mern-tracking-bugs.herokuapp.com/projectusers")
        .then(res => {
           setUserList(res.data.filter(obj => {
               
               return newArr.includes(obj.user) === false
           }))
           setSelectedUserList(res.data.filter(obj => {
               
            return newArr.includes(obj.user)
        }))
        })
    }, [history, projectEditReducer.project])

    const buttonClickRight = () => {
        let newArr;
            newArr = userList.filter(obj => {
                if(obj.user === selectedUserName){
                    setSelectedUserList([{ user: selectedUserName, role: obj.role }, ...selectedUserList])
                }                
                return obj.user !== selectedUserName
            })
            setUserList(newArr);
            console.log(selectedUserList)
        
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
        console.log(projectLead)
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

        axios.post("https://mern-tracking-bugs.herokuapp.com/deleteproject", {
            projectName
        }).then(res => {
            console.log(res.data)
        })

        axios.post("https://mern-tracking-bugs.herokuapp.com/createproject", {
        users
        }).then(res => {
            console.log(res.data)
            
        })
        history.push('/manage-projects')
    }

    const deleteProject = (e) => {
        axios.post("https://mern-tracking-bugs.herokuapp.com/deleteproject", {
        projectName
        }).then(res =>{
            console.log(res.data);
        })
        history.push('/manage-projects')
    }

    return (
        <>   <Container className={classes.container}>
                
        <Container className={classes.transferContainer}>
            <InputLabel id='create-project-project-name'>Project Name: </InputLabel>
            <TextField type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        </Container>
       <Container className={classes.transferContainer}>
            <InputLabel id='create-project-project-lead'>Project Lead:  </InputLabel>
            <Select 
            labelId= 'create-project-project-lead'
            autoWidth  
            value= {projectLead}
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
                color='primary'
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
            onClick={() => createProject()}>Save Project</Button>
            <Button
            className={classes.createProject}
            color='secondary'
            variant='contained'
            onClick={() => deleteProject()}>Delete Project</Button>
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
        projectEditReducer: state.projectEdit,
        loginReducer : state.login
    }
}

export default connect(mapStateToProps)(EditProject);