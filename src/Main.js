// JavaScript source code
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Hello from './client/components/hello';
import Nav from './client/components/Nav';
import RequestDashboard from './client/components/RequestDashboard';
import MakeRequest from './client/components/MakeRequest';
import MyTickets from './client/components/MyTickets';

class Main extends Component {
    render() {
        return (
            <div >
                
                <Switch>
                    <Route exact path='/myTickets' component={MyTickets} />
                    <Route path='/openRequests' component={RequestDashboard} />
                    {/*<Route path='/makeRequest' component={MakeRequest}/>*/}
                    <Route path='/hello' component={Hello}/>
                </Switch>
              

            </div>
        );
    }
}

export default Main;
