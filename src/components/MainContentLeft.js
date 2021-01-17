import React, { useState, useEffect } from 'react'

import Modal from './ModalInsert'
import Data from '../data/noteData'

function MainContentLeft(props) {
    
    const[isShowAdd, setStateAdd] = useState(false)
    const[isShowEdit, setStateEdit] = useState(false)

    const bearer = 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiYWN0aXZlVGltZSI6MTYxMDg3NjMzNTUxNiwiaWF0IjoxNjEwODc2MzM1fQ.t_pSTx5soQhSY5jrWAvYzYxrCs5xU3pgYvhkoscQia8";

    useEffect(() => {
        fetch("http://localhost:3001/notes", {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData)
        })
    });

    const titleComponents = Data.map(item => {
        if (item.categoryId === props.categoryId) {
            return (
                <div key={item.id} className="content-title">
                    <label onClick={() => {props.sendDataToParent(item.id)}}>{item.title}</label>
                    <span className="icon-title fas fa-edit" onClick={openModalEditHandler}></span>
                    <span className="icon-title fas fa-trash"></span>
                </div>
            )
        }
    })

    function openModalAddHandler() {
        setStateAdd(true)
    }

    function closeModalAddHandler(){
        setStateAdd(false)
    }

    function openModalEditHandler() {
        setStateEdit(true)
    }

    function closeModalEditHandler(){
        setStateEdit(false)
    }

    function addNote() {
        fetch("http://localhost:3001/notes", {
            method: 'POST',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'created by react',
                content: 'testing 1'
            })
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData)
        })
    }
    
    function editNote() {
        fetch("http://localhost:3001/notes/2", {
            method: 'PUT',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'edited by react',
                content: 'edited testing 1'
            })
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData)
        })
    }
    
    function deleteNote() {
        fetch("http://localhost:3001/notes/2", {
            method: 'DELETE',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData)
        })
    }

    return (
        <div className="main-left">
            <div className="main-left-header">
                <button className="btn-add-modal" onClick={openModalAddHandler}><span className="fas fa-sticky-note"></span> Write a new note</button>
                <Modal show={isShowAdd} handleClose={closeModalAddHandler} headerTitle="Input Note">
                    <input placeholder="Input Title" />
                    <input placeholder="Input Content" />
                    <button>Submit</button>
                </Modal>
                <Modal show={isShowEdit} handleClose={closeModalEditHandler} headerTitle="Edit Note">
                    <input placeholder="Edit Title" />
                    <input placeholder="Edit Content" />
                    <button>Submit</button>
                </Modal>
            </div>
            <div className="main-left-body">
                {titleComponents}
            </div>
            
            <button onClick={addNote}>Add</button>
            <button onClick={editNote}>Edit</button>
            <button onClick={deleteNote}>Delete</button>
        </div>
    )
}

export default MainContentLeft