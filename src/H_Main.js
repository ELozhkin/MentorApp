// JavaScript source code
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import RequestMentor from './client/components/RequestMentor';
import RequestReview from './client/components/RequestReview';
import Hello from './client/components/hello';

class Switcher extends Component {
    render() {
        return (<div>
            <Switch>
                <Route exact path='/Hacker' component={Hello} />
                <Route path='/Hacker/RequestMentor' component={RequestMentor} />
                <Route path='/Hacker/RequestReview' component={RequestReview}/>
            </Switch>
        </div>);
    }
}
class HackerMain extends Component {
    render() {
        return (
            <div>
                <header>
                    <h3>SH logo</h3>
                    <hr />
                </header>

                <Switcher/>
            </div>

        );
    }
};
export default HackerMain;