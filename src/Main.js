// JavaScript source code
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Hello from './client/components/hello';
import Nav from './client/components/Nav';
import RequestDashboard from './client/components/RequestDashboard';

class Main extends Component {
    render() {
        return (
            <div >
                
                <Switch>
                    <Route exact path='/' component={Hello} />
                    <Route path='/openRequests' component={RequestDashboard} />
                </Switch>
                
                {/*<RequestDashboard />
                <p>hello</p>*/}


            </div>
        );
    }
}

export default Main;
