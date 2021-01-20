import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import NotesPage from './pages/NotesList'
import LoginPage from './pages/Login'
import Nav from './components/Navigation'

function App() {
    return(
        <Router>
            <div>
              <Nav />
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" exact component={LoginPage}/>
                </Switch>
            </div>
        </Router>
    )
}

const Home = () => (
    <NotesPage />
)

export default App