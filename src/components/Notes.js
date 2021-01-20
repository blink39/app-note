import React from 'react'

function Notes(props) {
    return (
        <div>
            <h3>{props.data.title}</h3>
            <span>{props.data.content}</span>
        </div>
    )
}

export default Notes