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

            problem_name: "",
            hacker_name:"",
            skills: "Java",
            location: "i.e. building + room number",
            email: "",
            hacker_identifier: "",
            hacker_slack_name: "",

        };
        this.handleChange = this.handleChange.bind(this);
       
        this.handleSubmit = () => alert("submitted");

        this.handleStatusChange = this.handleStatusChange.bind(this);
        
    }
    handleStatusChange(event) {
        this.setState({
            select:event.target.value
        })
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
        
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

                <form className="RequestForm">
                    <h4>Describe your problem</h4>
                    <label for="problem_name">
                        Problem
                        <input type="text"
                            defaultValue="i.e. finding a bug in Java"
                            onChange={this.handleChange}
                            name="problem_name"
                        ></input>
                    </label>
                    <br />
                    <label for="skill">
                        What skills do you need help with?
                        <input type="text"
                            defaultValue="i.e. Java, Python, UI Design etc."
                            id="skills"
                        ></input>
                    </label>

                    <h4>Hacker Info</h4>
                    <label for="hacker_name">
                        Name
                        <input type="text"
                            value={this.state.hacker_name}
                            onChange={this.handleChange}
                            name="hacker_name"></input>
                    </label>
                    
                    <br />
                    <label for="email">
                        Email
                        <input type="text"
                            onChange={this.handleChange}
                            name="email"></input>
                    </label>
                    
                    <br />
                    <label for="location">
                        Location
                        <input type="text"
                            defaultValue="Building + room number/area (ex. QNC 1501)"
                            onChange={this.handleChange}
                            name="location"></input>
                    </label>
                    
                    <br />
                    <label for="hacker_slack_name">
                        Slack handle (optional)
                        <input type="text"
                            defaultValue="@"
                            onChange={this.handleChange}
                            name="hacker_slack_name"></input>
                    </label>
                    
                    <br />
                    <label for="hacker_identifier">
                        Identifiers (optional)
                        <input type="text"
                            defaultValue="i.e. the guy in the bright red jacket!"
                            onChange={this.handleChange}
                            name="hacker_identifier"></input>
                    </label>
                    
                    <br />
                    <Link to={{
                        pathname: "/Hacker/RequestReview",
                        search: "?sort=this.state.problem_name",
                        state: {
                            problem_name: this.state.problem_name,
                            hacker_name: this.state.hacker_name,
                            email: this.state.email,
                            location: this.state.location,
                            hacker_slack_name: this.state.hacker_slack_name,
                            hacker_identifier: this.state.hacker_identifier
                        }
                    }}
                        className="reviewButton"
                    >Review</Link>
                </form>
            </div>);
    }
};

class Test extends Component {

   
    render() {
        return (
            <div className="RequestPage">
                <h2>Request a Mentor</h2>
                <RequestForm
                />
            </div>
        );
    }
};

export default Test;