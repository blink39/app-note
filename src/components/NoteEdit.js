import React, { useState, useEffect } from 'react'
import axios from 'axios'

/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, css } from '@emotion/react'

function NoteEdit(props) {

    const container = css`
        display: ${props.show ? 'block' : 'none'};
        position: fixed;
        z-index: 1;
        padding-top: 45px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
    `

    const form = css`
        background-color: white;
        border-radius: 7px;
        border: 1px solid #f2f2f2;
        padding: 10px;
        box-shadow: 1px 5px 9px #888888;
        width: 40%;
        margin: 0 auto;
        margin-bottom: 25px;
    `
    
    const inputContainer = css`
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
        height: 300px;
        width: 100%;
    `
    
    const buttonContainer = css`
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

    const [state , setState] = useState({
        titleEdit : "",
        contentEdit : ""
    })

    useEffect(() => {
        if (props.data) {
            setState({
                titleEdit: props.data.title,
                contentEdit: props.data.content
            })
        }
    }, [props])

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const loginToken = localStorage.getItem("loginToken")

    const editNote = async () => {
        try {
            const res = await axios({
                method: "PUT",
                url: `${process.env.REACT_APP_URL_DEV}/notes/${props.data.id}`,
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    title : state.titleEdit,
                    content : state.contentEdit
                }
            })
            props.refresh(new Date())
            props.handleClose()
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
            <div css={form}>
                <div css={inputContainer}>
                    <input css={input} type="text" id="titleEdit" value={state.titleEdit} onChange={handleChange} placeholder="Title" autoComplete="off" />
                </div>
                <textarea css={textarea} id="contentEdit" value={state.contentEdit} onChange={handleChange} placeholder="Make a note..." />
                <div css={buttonContainer}>
                    <button css={button} onClick={props.handleClose}>Close</button>
                    <button css={button} onClick={editNote}>Edit note</button>
                </div>
            </div>
        </div>
    )
}

export default NoteEdit