import React, { useState } from 'react'

import Data from '../data/noteData'

function MainContentRight(props) {
    
    const [state, setState] = useState(() => {
        let tempTitle = ''
        let contentText = ''

        Data.forEach((item) => {
            if (item.id === 1) {
                tempTitle = item.title
                contentText = item.Content
            }
        })

        return {
            id : 1,
            title : tempTitle,
            content : contentText
        }
    })

    if(state.id !== props.titleId){
        Data.map(item => {
            if (item.id === props.titleId) {
                setState(prevState => {
                    return {
                        ...prevState,
                        id : item.id,
                        title : item.title,
                        content: item.Content
                    }
                })
            }
        })
    }

    return (
        <div className="main-right">
            <div className="main-right-body">
                <h1>{state.title}</h1>

                <label>{state.content}</label>
            </div>
        </div>
    )
}

export default MainContentRight