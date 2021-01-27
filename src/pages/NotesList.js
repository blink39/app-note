import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, css } from '@emotion/react'

import NoteAdd from '../components/NoteAdd'
import NoteEdit from '../components/NoteEdit'
import Notes from '../components/Notes'

function NotesList() {

    const containerNotes = css`
        width: 80%;
        margin: 0 auto;
        @media (max-width: 800px) {
            width: 90%;
            height: 300px;
        }
    `
    
    const loginContainer = css`
        padding: 20px;
        box-shadow: 1px 5px 9px #888888;
        border-radius: 5px;
        width: 30%;
        margin: 150px auto;
        border: 1px solid #f2f2f2;
    `

    const buttonLogin = css`
        padding: 10px 15px 10px 15px;
    `
    
    const buttonLogout = css`
        margin-right: 15px;
        margin-top: 10px;
        float: right;
    `

    const input = css`
        border-radius: 10px;
        width: 80%;
        margin-bottom: 10px;
        height: 25px;
        padding: 10px;
        outline: none;
    `

    let notesList
    const [notesData, setNotes] = useState()
    const [loading, setLoading] = useState(true)
    const [modalStatus, setShowModal] = useState(false)
    const [currData, setCurrData] = useState()
    const [refresh, setRefresh] = useState(new Date())
    const [token, setToken] = useState(localStorage.getItem("loginToken"))
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

    const loginToken = localStorage.getItem("loginToken")

    const sendGetRequest = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `${process.env.REACT_APP_URL_DEV}/notes`,
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            setLoading(false)
            setNotes(res.data)
        } catch (err) {
            if ( err.response.data.errors ) {
                let errMsg = ''
                err.response.data.errors.map( errorItem => {
                    errMsg += errorItem.message + '\n'
                })
                alert(errMsg)
            }
        }
    };
    
    const login = async () => {
        try {
            const res = await axios({
                method: "POST",
                url: `${process.env.REACT_APP_URL_DEV}/auth/login`,
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: {
                    username: state.username,
                    password: state.password
                }
            })
            localStorage.setItem('loginToken', res.data.token)
            setToken(res.data.token)
            setRefresh(new Date())
            setState({
                username : "",
                password : ""
            })
        } catch (err) {
            if ( err.response.data.errors ) {
                let errMsg = ''
                err.response.data.errors.map( errorItem => {
                    errMsg += errorItem.message + '\n'
                })
                alert(errMsg)
            }
        }
    };

    useEffect(() => {
        if ( loginToken ) {
            setToken(loginToken)
            sendGetRequest()
        }
    }, [refresh])

    function showModal(data) {
        setCurrData(data)
        setShowModal(true)
    }
    
    function hideModal() {
        setShowModal(false)
    }

    function logout() {
        localStorage.setItem('loginToken', '')
        setToken('')
    }

    if (notesData) {
        notesList = notesData.data.map(item => {
            return (
                <Notes key={item.id} data={item} handleEdit={() => showModal(item)} refresh={setRefresh}/>
            )
        })
    }


    return ( token
        ?
            loading
            ?
                <div>
                    <h1>Loading ...</h1>
                </div>
            :
                <div css={css`margin-top: 25px;`}>
                    <button css={buttonLogout} onClick={logout}>Logout</button>
                    <NoteAdd refresh={setRefresh}/>
                    <div css={containerNotes}>
                        {notesList}
                    </div>
                    <NoteEdit show={modalStatus} handleClose={hideModal} data={currData} refresh={setRefresh}/>
                </div>
        :
            <div css={loginContainer}>
                <span css={css`font-size: 30px;font-weight: bold;`}>Sign in</span>
                <br/> <br/> <br/>
                <input css={input} type="text" id="username" value={state.username} onChange={handleChange} placeholder="Username" autoComplete="off"/>
                <br/>
                <input css={input} type="password" id="password" value={state.password} onChange={handleChange} placeholder="Password" />
                <br/>
                <button css={buttonLogin} onClick={login}>Login</button>
            </div>
    )
}

export default NotesList