import React from 'react'
import {Link} from 'react-router-dom'

function Navigation() {
    return (
        <div>
            <Link to='/'>
            <button>Notes</button>
            </Link>
            <Link to='/login'>
            <button>Login</button>
            </Link>
        </div>
    )
}

export default Navigation