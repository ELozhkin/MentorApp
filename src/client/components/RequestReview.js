// JavaScript source code
import React, { Component } from 'react';

class Review extends Component {

    constructor(props) {
        super(props);
        this.state = {
            problem_name: props.location.state.problem_name,
            test: props.location.state
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
                test
                <button onClick={this.display}>test</button>
            </div>
            )
    }
}

export default Review;