import React, { useState, useEffect } from 'react'
import axios from 'axios'

/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, css } from '@emotion/react'

function NotesDetail({match}) {
    
    const input = css`
        border-width:0px;
        border:none;
        &:focus {
            outline: none;
        }
    `

    const textarea = css`
        border-width:0px;
        border:none;
        &:focus {
            outline: none;
        }
        resize: none;
        height: 100px;
        width: 300px;
    `

    const [state , setState] = useState({
        title : "",
        content : ""
    })
    
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const loginToken = localStorage.getItem("loginToken")

    const getDataNote = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `${process.env.REACT_APP_URL_DEV}/notes/${match.params.id}`,
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json'
                }
            })
            setState(prevState => ({
                ...prevState,
                title : res.data.data.title,
                content : res.data.data.content
            }))
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
        if ( match.params.id ) {
            getDataNote()
        }
    }, [])

    const addNote = async () => {
        try {
            const res = await axios({
                method: "POST",
                url: "http://localhost:3001/notes",
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    title : state.title,
                    content : state.content
                }
            })
            alert('Success Add')
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

    const editNote = async () => {
        try {
            const res = await axios({
                method: "PUT",
                url: `http://localhost:3001/notes/${match.params.id}`,
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    title : state.title,
                    content : state.content
                }
            })
            alert('Success Edit')
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

    const deleteNote = async () => {
        try {
            const res = await axios({
                method: "DELETE",
                url: `http://localhost:3001/notes/${match.params.id}`,
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json'
                }
            })
            alert('Success Delete')
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

    return (
        <div>
            <input css={input} type="text" id="title" value={state.title} onChange={handleChange} placeholder="Input Title" autoComplete="off" />
            <br/>
            <textarea css={textarea} id="content" value={state.content} onChange={handleChange} placeholder="Input Content" />
            <br/>

            {
            match.params.id
            ? 
                <div>
                    <button onClick={editNote}>Edit note</button>
                    <button onClick={deleteNote}>Delete</button>
                </div>
            :
                <button onClick={addNote}>Add note</button>
            }

        </div>
    )
}

export default NotesDetail