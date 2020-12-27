import React from 'react'

import Data from '../data/noteData'

function MainContentLeft(props) {
    
    const titleComponents = Data.map(item => {
        if (item.categoryId === props.categoryId) {
            return (
                <label onClick={() => {props.sendDataToParent(item.id)}}>{item.title}</label>
            )
        }
    })


    return (
        <div className="main-left">
            <div className="main-left-header">
                <button><span className="fas fa-sticky-note"></span> Write a new note</button>
            </div>
            <div className="main-left-body">
                {titleComponents}
            </div>
        </div>
    )
}

export default MainContentLeft