import React from 'react'
import {BrowserRouter as Router, Switch, Route, HashRouter} from 'react-router-dom'
/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, css } from '@emotion/react'

import NotesPage from './pages/NotesList'
import NoteDetailPage from './pages/NotesDetail'
import LoginPage from './pages/Login'
import Nav from './components/Navigation'

function App() {

    const container = css`
        font-family:'Roboto', sans-serif;
        text-align: center;
    `

    return(
        <HashRouter>
            <div css={container}>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/detail" exact component={NoteDetailPage}/>
                    <Route path="/detail/:id" exact component={NoteDetailPage}/>
                    <Route path="/login" exact component={LoginPage}/>
                </Switch>
            </div>
        </HashRouter>
    )
}

const Home = () => (
    <NotesPage />
)

export default App