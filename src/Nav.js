import React from 'react'
import {Link} from 'react-router-dom'

function Nav() {
    return (
        <nav className="nav-header">
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link to='/login'>
                    <li>Login</li>
                </Link>
                <Link to='/dashboard'>
                    <li>Dashboard</li>
                </Link>
                
            </ul>
        </nav>
    )
}

export default Nav