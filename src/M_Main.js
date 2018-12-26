import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from './client/components/Nav';

import Hello from './client/components/hello';
import RequestDashboard from './client/components/RequestDashboard';
import MakeRequest from './client/components/MakeRequest';
import MyTickets from './client/components/MyTickets';

class Switcher extends Component {
    render() {
        return (<div>
            <Switch>
                {/*SWITCH THIS TO LOGIN PAGE*/}
                <Route exact path='/Mentor' component={RequestDashboard} /> 
                <Route path='/Mentor/openRequests' component={RequestDashboard} />
                <Route path='/Mentor/myTickets' component={MyTickets} />
                <Route path='/hello' component={Hello} />
            </Switch>
        </div>);
    }
}
class MentorMain extends Component {
    render() {
        return (
            <div >
                <Nav/>
                <Switcher />
            </div>
        );
    }
}

export default MentorMain;
