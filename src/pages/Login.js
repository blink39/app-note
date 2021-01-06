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

    async function goToDashboard() {
        //https://www.javascripttutorial.net/javascript-fetch-api/#:~:text=The%20Fetch%20API%20allows%20you,resolve%20into%20the%20actual%20data
        // learn promise async await
        try {
            let result = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    username: 'test',
                    password: 'password'
                })
            })

            let user = await result.json()
            
            let d = new Date()
            d.setTime(d.getTime() + (30*24*60*60*1000))
            let expires = "expires="+ d.toUTCString()

            document.cookie = "username=" + user.username + ";" + expires + ";path=/"
        } catch(e) {
            console.log(e)
        }

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