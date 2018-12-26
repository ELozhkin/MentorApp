import React, { Component, ReactDOM } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Hello from './client/components/hello';
import MentorMain from './M_Main';
import HackerMain from './H_Main';

class App extends Component {
  render() {
    return (
      <div className="App">
            <Switch>
                <Route exact path='/' component={Hello} />
                <Route path='/Mentor' component={MentorMain} />
                <Route path='/Hacker' component={HackerMain}/>
            </Switch>
           
      </div>
    );
  }
}

export default App;
