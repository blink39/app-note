import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import SideNav from '../components/SideNav'
import MainContent from '../components/MainContent'

import '../styles/sideNav.css'

function Dashboard() {
    
    const history = useHistory()
    
    const [categoryId, setId] = useState(1);

    const sendDataToParent = (index) => {
        setId(index);
    };

    function goToLogin() {
        history.push("/login")
    }
    
    return(
        <div>
            <SideNav logoutFunction={goToLogin} sendDataToParent={sendDataToParent}/>
            <div className="main">
                <MainContent categoryId={categoryId}/>
            </div>
        </div>
    )
}

export default Dashboard