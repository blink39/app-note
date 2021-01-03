import React, { useState } from 'react'

import Modal from './ModalInsert'
import Data from '../data/noteData'

function MainContentLeft(props) {
    
    const[isShowAdd, setStateAdd] = useState(false)
    const[isShowEdit, setStateEdit] = useState(false)

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
        </div>
    )
}

export default MainContentLeft