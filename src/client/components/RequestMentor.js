// JavaScript source code
import React, { Component } from 'react';


class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            problem: "i.e. finding a bug in Java",
            skills: "Java",
            location: "i.e. building + room number"
        };
    }
    changeHandler = event => {
        this.setState({
            value: event.target.value
        });
    }
    render() {
        return (
            <div>
                <form>
                    <h4>Describe your problem</h4>
                    <label for="problem_name">
                        Problem
                        <input type="text"
                            id="problem_name"
                            value={this.state.problem}
                            onChange={this.changeHandler}
                        ></input>
                    </label>
                    <br />
                    <label for="skill">What skills do you need help with?</label>
                    <input type="text" id="skills"></input>

                    <h4>Hacker Info</h4>
                    <label for="hacker_name">Name</label>
                    <input type="text" id="hacker_name"></input>
                    <br />
                    <label for="email">Email</label>
                    <input type="text" id="email"></input>
                    <br />
                    <label for="location">Location</label>
                    <input type="text" id="location"></input>
                    <br />
                    <label for="hacker_slack_name">Slack handle (optional)</label>
                    <input type="text" id="hacker_slack_name"></input>
                    <br />
                    <label for="hacker_identifier">Identifiers (optional)</label>
                    <input type="text" id="hacker_identifier"></input>
                    <br />
                </form>
            </div>);
    }
};

class Test extends Component {
   
    render() {
        return (
            <div>
                <h2>Request a Mentor</h2>
                <RequestForm/>
            </div>
        );
    }
};

export default Test;