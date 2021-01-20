import React, { useState } from 'react'

function Login() {
    const [state , setState] = useState({
        username : "",
        password : ""
    })

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    function login() {
        fetch("http://localhost:3001/auth/login", {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: state.username,
                password: state.password
            })
        })
        .then(response => response.json())
        .then(responseData => {
            if ( responseData.errors ) {
                let errMsg = ''
                responseData.errors.map( errorItem => {
                    errMsg += errorItem.message + '\n'
                })
                alert(errMsg)
            }
            else if ( responseData.token ) {
                alert('Success')
                localStorage.setItem('loginToken', responseData.token);
            }
        })
    }

    return (
        <div>
            <input type="text" id="username" value={state.username} onChange={handleChange} placeholder="Username" />
            <input type="password" id="password" value={state.password} onChange={handleChange} placeholder="Password" />
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login