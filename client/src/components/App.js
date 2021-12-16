import { React, useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, connect } from 'react-redux';
import CreateTicket from './Tickets/CreateTicket';
import EditTicket from './Tickets/EditTicket';
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard';
import axios from 'axios';
import ManageProjects from './ManageProject/ManageProjects';
import { finalLogin } from '../actions';
import CreateProject from './ManageProject/CreateProject';
import EditProject from './ManageProject/EditProjects';
import MyTickets from './Tickets/MyTickets';
import newLogin from './Login/newLogin';
import newRegister from './Login/newRegister';
import MyProjects from './ManageProject/MyProjects';
import ProjectTickets from './Tickets/ProjectTickets';

axios.defaults.withCredentials = true;

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost:5000/login")
        .then(res => {
            if(res.data.loggedIn) dispatch(finalLogin(res.data.user))
            })        
    }, [dispatch])

    return (
        <Router>
            <Route path="/" exact component={newLogin} />
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/create-ticket' exact component={CreateTicket} />
            <Route path='/edit-ticket' exact component={EditTicket} />
            <Route path='/manage-projects' component={ManageProjects} />
            <Route path='/create-project' component={CreateProject} />
            <Route path='/edit-project' component={EditProject} />
            <Route path='/my-tickets' component={MyTickets} />
            <Route path='/test-route' component={newLogin} />
            <Route path='/create-account' component={newRegister} />
            <Route path='/my-projects' component={MyProjects} />
            <Route path='/project-tickets' component={ProjectTickets} />
        </Router>
    )
}

const mapStateToProps = (state) => {
    return {
        loginReducer: state.login
    }
}

export default connect(mapStateToProps, finalLogin)(App);