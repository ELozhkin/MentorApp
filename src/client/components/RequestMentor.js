// JavaScript source code
import React, { Component } from 'react';   
import { Dialog } from '@reach/dialog';
import { Link } from 'react-router-dom';


class ConfirmChange extends Component {
    state = {
        open: false,
        callback: null
    };
    show = callback => event => {
        event.preventDefault();
        event = {
            ...event,
            target: {
                ...event.target,
                value: event.target.value
            }
        }
        this.setState({
            open: true,
            callback: () => callback(event)
        })
    }
    hide = () => this.setState({
        open: false,
        callback:null
    })
    confirm = () => {
        this.state.callback()
        this.hide()
    }

    render() {
        return (
            <React.Fragment>
                {this.props.children(this.show)}
                {this.state.open && (
                    <Dialog>
                        <h1>
                            {this.props.title}
                        </h1>
                        <p>
                            {this.props.description}
                        </p>
                        <button onClick={this.hide}>Cancel</button>
                        <button onClick={this.confirm}>Submit</button>
                    </Dialog>
                    )}
            </React.Fragment>
            )
    }

}

class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: "open",

            problem_name: "i.e. finding a bug in Java",
            skills: "Java",
            location: "i.e. building + room number"
        };
        this.handleChange = this.handleChange.bind(this);
       
        this.toReview = this.toReview.bind(this);

        this.handleSubmit = () => alert("submitted");

        this.handleStatusChange = event => {
            this.setState({
                select:event.target.value
            })
        }
        
    }
    handleChange(event) {
        this.setState({
            problem_name: event.target.value,
            skills:event.target.value
        });
        
    }
    toReview(event) {
        alert(this.state.problem_name);
    }
    
    render() {
        return (
            <div>
                {/*  <ConfirmChange title="Confirm" description="are you sure">
                    {confirm => (
                        <form onSubmit={confirm(this.handleSubmit)}>
                            <label>
                                <select
                                    value={this.state.select}
                                    onChange={confirm(this.handleStatusChange)}
                                >
                                    <option value="open">Open</option>
                                    <option value="close">Close</option>
                                </select>
                            </label>
                            <button>Submit</button>
                        </form>
                        )}
                </ConfirmChange>*/}

                <form >
                    <h4>Describe your problem</h4>
                    <label for="problem_name">
                        Problem
                        <input type="text"
                            value={this.state.problem_name}
                            onChange={this.handleChange}
                        ></input>
                    </label>
                    <br />
                    <label for="skill">
                        What skills do you need help with?
                        <input type="text"
                            id="skills"
                        ></input>
                    </label>

                    <h4>Hacker Info</h4>
                    <label for="hacker_name">
                        Name
                        <input type="text" id="hacker_name"></input>
                    </label>
                    
                    <br />
                    <label for="email">
                        Email
                        <input type="text" id="email"></input>
                    </label>
                    
                    <br />
                    <label for="location">
                        Location
                        <input type="text" id="location"></input>
                    </label>
                    
                    <br />
                    <label for="hacker_slack_name">
                        Slack handle (optional)
                        <input type="text" id="hacker_slack_name"></input>
                    </label>
                    
                    <br />
                    <label for="hacker_identifier">
                        Identifiers (optional)
                        <input type="text" id="hacker_identifier"></input>
                    </label>
                    
                    <br />
                    <button onClick={this.toReview}>Submit</button>
                    <Link to={{
                        pathname: "/Hacker/RequestReview",
                        search: "?sort=this.state.problem_name",
                        state: {
                            problem_name: this.state.problem_name,
                            
                        }
                    }}>test</Link>
                </form>
            </div>);
    }
};

class Test extends Component {

   
    render() {
        return (
            <div>
                <h2>Request a Mentor</h2>
                <RequestForm
                   
                />
            </div>
        );
    }
};

export default Test;