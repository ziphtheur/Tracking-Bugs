import React from 'react';
import NewHeader from '../Header/newHeader';
import Sidebar from '../Sidebar/Sidebar';
import { useHistory } from 'react-router-dom';


const Dashboard = () => {
    const history = useHistory();

    return (
        <div>
           <NewHeader/>
           <Sidebar/>
        </div>
    )
}

export default Dashboard;