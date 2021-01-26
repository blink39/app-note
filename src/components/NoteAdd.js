import React, { useState } from 'react'
import axios from 'axios'

/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, css } from '@emotion/react'

function NoteAdd() {
    
    const [display, setDisplay] = useState({
        status: 'none',
        height: 15
    })

    const container = css`
        border-radius: 7px;
        border: 1px solid #f2f2f2;
        padding: 10px;
        box-shadow: 1px 5px 9px #888888;
        width: 50%;
        margin: 0 auto;
        margin-bottom: 25px;
    `

    const inputContainer = css`
        display: ${display.status};
        margin-bottom: 10px;
    `

    const input = css`
        border-width: 0px;
        border: none;
        width: 100%;
        font-size: 20px;
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
        height: ${display.height}px;
        width: 100%;
    `
    
    const buttonContainer = css`
        display: ${display.status};
        text-align: right;
        font-family:'Roboto', sans-serif;
    `

    const button = css`
        background-color: white;
        border: none;
        padding: 10px;
        outline: none;
        border-radius: 5px;
        &:hover {
            background-color: #f2f2f2;
        }
    `
    
    function showDisplay() {
        setDisplay({
            status : "block",
            height: 100
        })
    }
    
    function hideDisplay() {
        setDisplay({
            status : "none",
            height: 15
        })
    }
    
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
            hideDisplay()
            setState({
                title : "",
                content : ""
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

    return (
        <div css={container}>
            <div css={inputContainer}>
                <input css={input} type="text" id="title" value={state.title} onChange={handleChange} placeholder="Title" autoComplete="off" />
            </div>
            <textarea css={textarea} id="content" value={state.content} onChange={handleChange} placeholder="Make a note..." onClick={showDisplay}/>
            <div css={buttonContainer}>
                <button css={button} onClick={hideDisplay}>Close</button>
                <button css={button} onClick={addNote}>Add Note</button>
            </div>
        </div>
    )
}

export default NoteAdd