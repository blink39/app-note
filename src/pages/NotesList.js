import React, { useState, useEffect } from 'react'

import Notes from '../components/Notes'

function NotesList() {
    let notesData
    const [state, setState] = useState()
    const [loading, setLoading] = useState(false)
    const loginToken = localStorage.getItem("loginToken")

    useEffect(() => {
        if ( loginToken ) {
            fetch("http://localhost:3001/notes", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(responseData => {
                setState(responseData.data)
                setLoading(true)
            })
        }
    })

    notesData = state.map( item => {
        return (
            <Notes key={item.id} data={item}/>
        )
    })

    return ( loginToken
        ?
            <div>
                {notesData}
            </div>
        :
            <h1>Please login first</h1>
    )
}

export default NotesList