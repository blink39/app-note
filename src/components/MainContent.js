import React, { useState } from 'react'

import MainContentLeft from '../components/MainContentLeft'
import MainContentRight from '../components/MainContentRight'
import '../styles/mainContent.css'

import SideNavdata from '../data/sideNavData'

function MainContent(props) {

    const [titleId, setTitleId] = useState(1);

    const sendDataToParent = (index) => {
        setTitleId(index);
    };

    const headerTitle = SideNavdata.map(item => {
        if (item.id === props.categoryId) {
            return (
                item.text
            )
        }
    })

    return (
        <div>
            <div className="main-content-header">
                <h3>{headerTitle}</h3>
            </div>
            <div className="main-content-body">
                <div className="main-content-body-left">
                    <MainContentLeft categoryId={props.categoryId} sendDataToParent={sendDataToParent}/>
                </div>
                <div className="main-content-body-right">
                    <MainContentRight titleId={titleId}/>
                </div>
            </div>
        </div>
    )
}

export default MainContent