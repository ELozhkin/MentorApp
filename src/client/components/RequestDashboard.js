import React, { Component, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import { MDCChipSet } from '@material/chips';
import { Chip, Paper } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import ReactDOM from 'react-dom';
import ReactTable, { ReactTableDefaults } from 'react-table';
import BootstrapTable from 'react-bootstrap-table-next';


var store = {
    headerOffset: null
};

let data = [
    {
        hacker_name: "John Doe",
        problem_name: "Python Help",
        skill: ['Angular', 'Java', 'Python'],
        description: "something extra",
        location: "QNC 1234",
        time_created: {
            now: "12:01pm",
            default: "Date.now"
        },
        hacker_slack_name: "@hackerslack",
        date: "December 23",
        time: "12:01pm",
        notes: "wearing a bright red hoodie",
        email: "test@uwaterloo.ca",
        
        slack: "@test",
        
        state: "live"
    },
    {
        id: 1,
        name: "name 1",
        details: "details 1",
        state: "live"
    },
    {
        id: 2,
        name: "name 2",
        details: "details 2",
        state: "draft"
    },
    {
        id: 3,
        name: "name 3",
        details: "details 3",
        state: "live"
    },
    {
        id: 4,
        name: "name 4",
        details: "details 4",
        state: "live"
    },
    {
        id: 5,
        name: "name 5",
        details: "details 5",
        state: "live"
    },
];

let cols = [
    {
        label: "Requests"
    }
];
class ChipArray extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skill:  this.props.skill
        }

    };
    render() {
        const content = (
            <div>
                {this.state.skill.map((skill) =>
                    <Chip
                        label={skill}
                    />
                    )}
            </div>
         );
        return (
            <div>
                {content}
            </div>
        );
    }
}

{/*RowItem class is refers to each row entry that is visible before drop-down 
 * in the request dashboard.
    
    
 */}
class RowItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            skill: this.props.skill
        }
    }
    toggleRow(e) {
        
            this.setState({
                open: !this.state.open
            });
            console.log('toggleRow, ', this.state.open);
        
    }
    
    doNothing(e) {
        this.setState({
            open: this.state.open
        });
        console.log('toggleRow, ', this.state.open);

    }

    render() {
        let classes = '';
        if (this.state.open) {
            classes = 'open';
        }
        
        const content = (
            <div>
                {this.state.skill}
                
            </div>
        );

        return (
            <div>
            <li className={classes}>
                    <div className="heading"
                        onClick={this.toggleRow.bind(this)}>
                    <div className="col">
                        {this.props.problem_name}
                        <br />
                            {this.props.date} - {this.props.time}

                    </div>
                    
                </div>
                
                    <RowContent
                        onClick={this.doNothing}
                    open={this.state.open}
                    name={this.props.hacker_name}
                    skill={this.props.skill}
                    email={this.props.email}
                    location={this.props.location}
                    slack={this.props.hacker_slack_name}
                    details={this.props.details}
                        notes={this.props.notes}
                />
                {this.props.children}
                </li>
            </div>
         )
    }

};

{/*Form handles submission form for mentors to claim a request.*/}
class Form extends React.Component {
    constructor(){
        super();
        this.state = {
            open:true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.hey = this.hey.bind(this);
    }
    hey() {
        alert("Test");
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('/api/url', {
            method: 'POST',
            body: data
        });
    }
    handleChange(evt, event) {
        
        this.setState({
            [evt.target.name]: evt.target.value
        });

    }
    

    render() {
        return (
            
            <form onSubmit={this.handleSubmit} className="claimForm">
                <label htmlFor="username">Name
                     <input 
                        name="mentor.identifier.name"
                        type="text"
                        onChange={this.handleChange}
                        
                    />
                    </label>
                <br/>
               
                <br/>
                <label htmlFor="email">Slack Handle
                    <input id="mentor.identifier.slack"
                        name="mentor.slack"
                        type="text"
                        onChange={this.handleChange}
                        />
                    </label>
                <br/>
                
                <br />
                <button onClick={this.hey}>Claim</button>
            </form>

        );
    }


}

{/*RowContent is the content within the collapsible section of the request dashboard
    i.e. shows additional info 
 */}
class RowContent extends React.Component {
    constructor(props) {
        super(props);
       
    }
    clicker() {
    }

    render() {
        let jsxhtml = (
            <div className="content" onClick={this.clicker.bind(this)}>
                row content
                {this.props.children}
            </div>);

        if (this.props.open) {
            console.log(this.props.details);
            jsxhtml = (
                <div className="content open" onClick={this.clicker.bind(this)}>
                    <div className="extraInfo">
                        <ul className="extraInfo">
                            
                            <ChipArray
                                className="ChipsMentor"
                                    skill={this.props.skill}
                                />
                            <br/>
                            <li>{this.props.name}</li>
                            <li>{this.props.email}</li>
                            
                            
                        </ul>
                        <ul className="extraInfo">
                            <li>{this.props.location}</li>
                            <li>{this.props.slack}</li>
                        </ul>
                    </div>
                    <div className=" extraDetails">
                        <p>{this.props.notes}</p>
                        <hr />
                        <Form
                        />
                    </div>
                    
                    
                    {this.props.children}
                </div>
                );
        }

        return (
            <div>
                {jsxhtml} 
            </div>
            )            
    }
};

{/*Table combines Row and RowContent to create the entire table
    includes logic that toggles between open and !open
 */}
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerOffset: null,
            headerFixed:true
        }
    }

    componentDidMount() {
        console.log('reactDom: ', ReactDOM.findDOMNode(this.refs.header));
        store.headerOffset = ReactDOM.findDOMNode(this.refs.header).getBoundingClientRect().top;
        console.log('store:', store.headerOffset);
    }
    render() {
        let columns = this.props.columns.map((item, inx) => {
            return (<HeaderColumn label={item.label} />);
        });

        let rows = this.props.data.map((item, inx) => {
            return (<RowItem{...item}></RowItem>);
        });
        let classes = 'header';
        if (this.props.headerFixed) {
            classes = 'header fixed';
        }
        return (
            <div className="table">
                {this.props.children}
                <div className={classes} ref="header">{columns}
                    <div className="shadow"></div>
                </div>
                <ul>
                    {rows}
                </ul>
            </div>);
    }

}
{/*Controls top header for the list - this part may not be included*/}
class HeaderColumn extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="hcol">
                {this.props.label}
            </div>
        );
    }
}

{/*Combines everything - exported class*/}
class RequestDashboard extends Component {
    constructor() {
        super();
        this.state = {
            tableHeader: null,
            tableHeaderFixed: false
        }
    }

    handleScroll(e) {
        let scrollTop = e.srcElement.body.scrollTop;
        console.log('app scroll...', scrollTop, store.headerOffset);
        if (scrollTop >= store.headerOffset) {
            this.setState({
                tableHeaderFixed: true
            });
        }
        else {
            this.setState({
                tableHeaderFixed: false
            });
        }
    }

    componentDidMount() {
        console.log('app mounted');
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }


    render() {


        return (
            <div className="container">
               
                <Table
                    data={data}
                    columns={cols}
                    headerFixed={this.state.tableHeaderFixed}
                    scrollFn='' />

            </div>
            )
    }
};

export default RequestDashboard;


