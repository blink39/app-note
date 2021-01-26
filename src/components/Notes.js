import React, { useState } from 'react'

/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, css, keyframes } from '@emotion/react'

function Notes(props) {

    const [visiblility, setVisibility] = useState('hidden')
    const [animateStatus, setAnimate] = useState(true)

    const fadeIn = keyframes`
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    `;

    const fadeOut = keyframes`
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    `;

    const container = css`
        border-radius: 5px;
        border: 2px solid #f2f2f2;
        padding: 10px;
        width: 22%;
        display: inline-block;
        vertical-align: top;
        margin: 0 auto;
        margin-right: 10px;
        margin-bottom: 10px;
        text-align: left;
        height: 210px;
        &:hover {
            box-shadow: 0px 1px 3px #888888;
        }
    `

    const title = css`
        font-size: 20px;
        font-weight: bold;
    `

    const upper = css`
        height: 85%;
        overflow: hidden;
    `

    const lower = css`
        visibility: ${visiblility};
        animation: ${animateStatus ? fadeIn : fadeOut} 0.4s linear;
        text-align: right;
        font-family:'Roboto', sans-serif;
    `

    const button = css`
        background-color: white;
        border: none;
        padding: 10px;
        outline: none;
        border-radius: 5px;
        &:hover {
            background-color: #f2f2f2;
        }
    `

    function onMouseEnter() {
        setVisibility('visible');
        setAnimate(true);
    };

    function onMouseLeave() {
        setVisibility('hidden');
        setAnimate(false);
    };

    return (
        <div css={container} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
            <div css={upper}>
                <span css={title}>{props.data.title}</span>
                <br/><br/>
                <span>{props.data.content}</span>
            </div>
            <div css={lower}>
                <button css={button}>Edit note</button>
                <button css={button}>Delete note</button>
            </div>
        </div>
    )
}

export default Notes