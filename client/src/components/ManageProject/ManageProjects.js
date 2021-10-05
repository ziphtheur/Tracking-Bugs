import { React, useState , useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editingProject } from '../../actions'
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
   


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


    return (
       <>
            <div className="manage-projects-container">
                <select value={selectedProject} onChange={changeProject}>
                    <RenderList list={projectList} />
                </select>
                <button onClick={() =>{
                    history.push('/edit-project')
                    dispatch(editingProject(selectedProject))
                } }>Edit Project</button>
                <button onClick={() => history.push('/create-project')}>Create Project</button>
                
            </div>
            <Header/>
            <Sidebar/>
       </>
    )
}

const RenderList = ({list}) => {

    return(
        <>
            {list.map((obj, index,) =>{
                return <option key={index}>{obj}</option>
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
