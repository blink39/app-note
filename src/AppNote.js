import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import DashboardPage from './pages/Dashboard'
import LoginPage from './pages/Login'

function App() {
    return(
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/dashboard" component={DashboardPage}/>
                </Switch>
            </div>
        </Router>
    )
}

const Home = () => (
    <LoginPage />
)

export default App