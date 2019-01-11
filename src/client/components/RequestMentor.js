// JavaScript source code
import React, { Component } from 'react';   
import { Dialog } from '@reach/dialog';
import { Link } from 'react-router-dom';

import ChipInput from 'material-ui-chip-input';


class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: "open",

            problem_name: "",
            hacker_name:"",
            skill: [],
            location: "",
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

    handleAddChip(chip) {
        if (this.props.onBeforeAdd && !this.props.onBeforeAdd(chip)) {
            this.setState({ preventChipCreation: true })
            return false
        }
        this.setState({ inputValue: '' })
        const chips = this.props.value || this.state.skill

        if (this.props.dataSourceConfig) {
            if (typeof chip === 'string') {
                chip = {
                    [this.props.dataSourceConfig.text]: chip,
                    [this.props.dataSourceConfig.value]: chip
                }
            }

            if (this.props.allowDuplicates || !chips.some((c) => c[this.props.dataSourceConfig.value] === chip[this.props.dataSourceConfig.value])) {
                if (this.props.value && this.props.onAdd) {
                    this.props.onAdd(chip)
                } else {
                    this.updateChips([...this.state.chips, chip])
                }
            }
        } else if (chip.trim().length > 0) {
            if (this.props.allowDuplicates || chips.indexOf(chip) === -1) {
                if (this.props.value && this.props.onAdd) {
                    this.props.onAdd(chip)
                } else {
                    this.setState({
                        skill: [...this.state.skill, chip]
                    })
                }
            }
        } else {
            return false
        }
        return true
    }


    AddChip(chip) {
        this.setState({
            skill: [...this.state.skill, chip]
        })
    }

    handleDelete(deletedChip) {
        this.setState({
            skill: this.state.skill.filter((c) => c !== deletedChip)
        })

    }

    
    render() {
        return (
            <div>
                <form className="RequestForm">
                    <h4>Describe your problem</h4>
                    <label for="problem_name">
                        Problem
                        <input type="text"
                            placeholder="i.e. finding a bug in Java"
                            onChange={this.handleChange}
                            name="problem_name"
                        ></input>
                    </label>
                    <br />
                    <label for="skill"
                        className="skills">
                        What skills do you need help with?
                        <br />
                        (i.e. Java, Python, UI Design etc.)
                        
                         <ChipInput
                            {...this.props}
                            value={this.state.skill}
                            onAdd={(chip) => this.handleAddChip(chip)}
                            onDelete={(deletedChip) => this.handleDelete(deletedChip)}
                            onBlur={(event) => {
                                if (this.props.addOnBlur && event.target.value) {
                                    this.handleAdd(event.target.value)
                                }
                            }}

                            fullWidth
                            label=''
                        />
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
                            placeholder="Building + room number/area (ex. QNC 1501)"
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
                            placeholder="i.e. the guy in the bright red jacket!"
                            onChange={this.handleChange}
                            name="hacker_identifier"></input>
                    </label>
                    
                    <br />
                    <Link
                        to={{
                        pathname: "/Hacker/RequestReview",
                        search: "?sort=this.state.problem_name",
                        state: {
                            problem_name: this.state.problem_name,
                            hacker_name: this.state.hacker_name,
                            skill:this.state.skill,
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