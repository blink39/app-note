import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import NoteAdd from '../components/NoteAdd'
import Notes from '../components/Notes'

function NotesList() {

    let notesList
    const [notesData, setNotes] = useState()
    const [loading, setLoading] = useState(true)
    const loginToken = localStorage.getItem("loginToken")

    const sendGetRequest = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: "http://localhost:3001/notes",
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
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

    useEffect(() => {
        if ( loginToken ) {
            sendGetRequest()
        }
    }, [])

    if (notesData) {
        notesList = notesData.data.map(item => {
            return (
                <Link to={`/detail/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <Notes key={item.id} data={item} />
                </Link>
            )
        })
    }

    return ( loginToken
        ?
            loading
            ?
                <div>
                    <h1>Loading ...</h1>
                </div>
            :
                <div>
                    <NoteAdd/>
                    {notesList}
                    <Link to='/detail'>
                        <button>Add</button>
                    </Link>
                </div>
        :
            <div>
                <h1>Login First ...</h1>
            </div>
    )
}

export default NotesList