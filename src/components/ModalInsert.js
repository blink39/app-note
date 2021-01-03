import React from 'react'

import '../styles/modal.css'

function ModalInsert(props) {
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <div className="modal-content">
            <span className="close" onClick={props.handleClose}>&times;</span>
            <p>{props.headerTitle}</p>
            <br/>
            {props.children}
            </div>
        </div>
    )
}

export default ModalInsert