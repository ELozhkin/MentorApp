import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    {
        id: 6,
        name: "name 6",
        details: "details 6",
        state: "live"
    }
];

let cols = [
    {
        label: "My Claimed Requests"
    }
];

{/*RowItem class is refers to each row entry that is visible before drop-down 
 * in the request dashboard.
    
    TODO:
    Fix display within return section.
    add buttons for skills 
 */}
class RowItem extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }
    toggleRow(e) {
        this.setState({ open: !this.state.open });
        console.log('toggleRow, ', this.state.open);
    }

    render() {
        let classes = '';
        if (this.state.open) {
            classes = 'open';
        }

        return (
            <li onClick={this.toggleRow.bind(this)} className={classes}>
                <div className="heading">
                    <div className="col">
                        {this.props.problem_name}
                        <br />

                        {this.props.date}
                        {this.props.time}


                        <br />
                        skill
                    </div>
                </div>
                <RowContent
                    open={this.state.open}
                    name={this.props.hacker_name}
                    email={this.props.email}
                    location={this.props.location}
                    slack={this.props.hacker_slack_name}
                    details={this.props.details}
                    notes={this.props.notes}
                />
                {this.props.children}
            </li>
        )
    }

};

{/*Form handles submission form for mentors to CLAIM a request.*/ }
class Form extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('/api/url', {
            method: 'POST',
            body: data
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="claimedRequests">
                <button className="resolveButton">Yes! its Resolved</button>
                <button>No - cancel claim</button>
            </form>
        );
    }


}
{/*RowContent is the content within the collapsible section of the request dashboard
    i.e. shows additional info 
 */}
class RowContent extends React.Component {
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
                        <br/>
                        <hr />
                        <Form />
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
    constructor() {
        super();
        this.state = {
            headerOffset: null,
            headerFixed: true
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
{/*Controls top header for the list - this part may not be included*/ }
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
class myTickets extends Component {
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

        let jsxhtml = (

            <div className="container">
                <Table
                    data={data}
                    columns={cols}
                    headerFixed={this.state.tableHeaderFixed}
                    scrollFn='' />

            </div>
        )
        {/* --------if mentor has not accepted any tickets yet ---- SET THIS AS DEFAULT
         * 
         * 
         if (data.empty == true) {
            console.log(data.empty);

            jsxhtml = (
                <div className="nothingYet">
                    <p>Nothing yet!</p>
                    <p>Requests that you claim will show up here.</p>
                </div>
            )
        }
         */}
        

        return (

            <div>
                {jsxhtml}
            </div>);

    }
};
export default myTickets;


