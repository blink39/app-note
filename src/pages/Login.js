import React from 'react'
import { useHistory } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import Input from '../components/Input'
import {loggingIn} from '../actions'

import '../styles/login.css'

function Login() {

    const history = useHistory()
    const dispatch = useDispatch()
    const isLogged = useSelector(state => state.isLogged)

    function goToDashboard() {
        dispatch(loggingIn())
        history.push("/dashboard")
    }

    return(
        <div className="login-form">
            <div className="login-logo">
                <img className="avatar" src="https://www.w3schools.com/howto/img_avatar2.png" alt="Logo"/>
            </div>

            <div className="login-container">
                <h3 className="label-login">Username</h3>
                <Input className="input-login" type="text" placeHolder="Enter Username"/>
                <h3 className="label-login">Password</h3>
                <Input className="input-login" type="password" placeHolder="Enter Password"/>
                <br/>
                <button className="btn-login" onClick={goToDashboard}>Login</button>
            </div>
        </div>
    )
}

export default Login