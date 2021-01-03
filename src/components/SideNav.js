import React from 'react'

import Data from '../data/sideNavData'

function SideNav(props) {

    const dataComponents = Data.map(item => {
        return (
            <span key={item.id} onClick={() => {props.sendDataToParent(item.id)}}>{item.text}</span>
        )
    })

    return (
        <div className="side-nav">
            <div className="side-nav-header">
                <span><img className="side-nav-avatar" src="https://www.w3schools.com/howto/img_avatar2.png" alt="Logo"/> Name</span>
            </div>
            <div className="side-nav-body">
                {dataComponents}
                <span onClick={props.logoutFunction}>Logout</span>
            </div>
        </div>
    )
}

export default SideNav