import { React, useState , useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editingProject } from '../../actions'
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Container, MenuItem, Select, Box, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Gird, DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid'
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


const ManageProjects = ({ projectEditReducer, loginReducer }) => {
    const [projectList, setProjectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    
    useEffect(() => {

        axios.get("http://localhost:5000/projectusers")
        .then((res, err)=> {
            if(err)console.log(err)
                       
        })

        axios.get("http://localhost:5000/projects")
        .then((res, err) => {
            if(err)console.log(err)
            let tempArr = [];
            let newArr = res.data.map(obj => {
                return obj.project
            }).map(obj =>{
                if(tempArr.includes(obj) === false){
                    tempArr = [...tempArr, obj]
                }
                return obj
            })
            setProjectList(tempArr);
            setSelectedProject(tempArr[0]);
        
        })
    }, []) 

    const changeProject = (e) => {
        setSelectedProject(e.target.value);
        console.log(selectedProject)
    }
    const rows = projectList.map((obj, index) => {
        return {

        }
    })

    return (
       <>
            <Container className={classes.container}>
                <Box sx={{ flexGrow: 1, overflow: 'auto'}}>
                    <Grid container spacing={2}>
                        {projectList.map((obj, index) => {
                            return(
                                <>
                                <Grid item xs={8} >
                                    {obj}
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={ () => {
                                        history.push('/edit-project')
                                        dispatch(editingProject(obj))
                                    }                                        
                                    }>Edit</Button>
                                </Grid>
                                </>
                            )
                        })}
                            
                            
                    </Grid>
                </Box>
                <Button
                color='secondary'
                variant='contained' 
                 onClick={() => history.push('/create-project')}>Create Project</Button>
                
            </Container>
            <Header/>
            <Sidebar/>
       </>
    )
}

const RenderList = ({list}) => {

    return(
        <>
            {list.map((obj, index,) =>{
                return <MenuItem key={index} value={obj}>{obj}</MenuItem>
            })}
        </>
    )  
}

const RenderNamesList = ({arr = [], func, num}) => {

    return(
        <>
            {arr.map((obj, index) =>{
                return(
                <li key={index + num}>
                    <button value={obj} onClick={func}>{obj}</button>
                </li>
                )
            })}
        </>
    )  
}
const mapStateToProps = (state) => {
    return {
        projectEditReducer: state.projectEdit,
        loginReducer: state.login
    }
}

export default connect(mapStateToProps, {editingProject})(ManageProjects);
