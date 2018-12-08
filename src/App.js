import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './client/components/hello';
import Nav from './client/components/Nav';
import Main from './Main';
import RequestDashboard from './client/components/RequestDashboard';

class App extends Component {
  render() {
    return (
      <div className="App">

            <Nav/>
            <Main/>
            

      </div>
    );
  }
}

export default App;
