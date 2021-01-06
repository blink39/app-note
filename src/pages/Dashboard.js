import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import SideNav from '../components/SideNav'
import MainContent from '../components/MainContent'
import {loggingOut} from '../actions'

import '../styles/sideNav.css'

function Dashboard() {
    
    const history = useHistory()
    const dispatch = useDispatch()
    const isLogged = useSelector(state => state.isLogged)
    
    const constructor = () => {
        if (!isLogged) {
            history.push("/login")
        }
    }
    constructor()
    
    const [categoryId, setId] = useState(1);

    const sendDataToParent = (index) => {
        setId(index);
    };

    function goToLogin() {
        dispatch(loggingOut())
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