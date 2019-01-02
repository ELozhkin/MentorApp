// JavaScript source code
import React, { Component } from 'react';

class Review extends Component {

    constructor(props) {
        super(props);
        this.state = {
            problem_name: props.location.state.problem_name,
            hacker_name: props.location.state.hacker_name,
            location: props.location.state.location,
            email: props.location.state.email,
            hacker_identifier: props.location.state.hacker_identifier
        }
        //const { problem_name } = props.location.state;
        this.display = this.display.bind(this);
    }
    display(event) {
        alert(this.state.problem_name);
    }
    render() {
        
        return (
            <div>
                Request Summary
                
            <br />
                {this.state.problem_name}
                <br />
                <h2>My Information</h2>
                {this.state.hacker_name}
                <br />
                {this.state.email}
                <br />
                {this.state.location}
                <br />
                {this.state.hacker_identifier}
                <button onClick={this.display}>test</button>
            </div>
            )
    }
}

export default Review;