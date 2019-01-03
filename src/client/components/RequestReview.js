// JavaScript source code
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Review extends Component {

    constructor(props) {
        super(props);
        this.state = {
            problem_name: props.location.state.problem_name,
            hacker_name: props.location.state.hacker_name,
            location: props.location.state.location,
            email: props.location.state.email,
            hacker_slack_name: props.location.state.hacker_slack_name,
            hacker_identifier: props.location.state.hacker_identifier
        }
        this.display = this.display.bind(this);
    }
    display(event) {
        alert(this.state.problem_name);
    }
    render() {
        
        return (
            <div className="Summary">
                <div className="RequestSummary">
                <h3>Request Summary</h3>
                <p>
                    {this.state.problem_name}
                </p>
                skills
                <h4>My Information</h4>
                <ul>
                    <li>{this.state.hacker_name}</li>
                    <li>{this.state.email}</li>
                    <li>{this.state.location}</li>
                    <li>{this.state.slack}</li>
                    <li>{this.state.hacker_identifier}</li>
                    </ul>
                </div>
                
                <Link
                    className="reviewButton editBtn"
                    to={{
                    pathname: "/Hacker/RequestMentor",
                    state: {
                        problem_name: this.state.problem_name,
                        hacker_name: this.state.hacker_name,
                        email: this.state.email,
                        location: this.state.location,
                        hacker_identifier: this.state.hacker_identifier
                    }
                }}>edit</Link>
                <button onClick={this.display} className="reviewButton">Submit Request</button>
            </div>
            )
    }
}

export default Review;