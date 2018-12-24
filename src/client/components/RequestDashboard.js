import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTable, { ReactTableDefaults } from 'react-table';
import BootstrapTable from 'react-bootstrap-table-next';


var store = {
    headerOffset: null
};

let data = [
    {
        id: "Python Help",
        name: "John Doe",
        date: "December 23",
        time: "12:01pm",
        email: "test@uwaterloo.ca",
        location: "QNC 1234",
        slack: "@test",
        details: "details 0",
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
        label: "Requests"
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
                        {this.props.id}
                        <br />
                        {this.props.date}
                        {this.props.time}
                        <br />
                        skill 
                    </div>
                </div>
                <RowContent
                    open={this.state.open}
                    name={this.props.name}
                    email={this.props.email}
                    location={this.props.location}
                    slack={this.props.slack}
                    details={this.props.details}
                />
                {this.props.children}
            </li>
         )
    }

};

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
                <div className="content open extraInfo" onClick={this.clicker.bind(this)}>
                    <ul>
                        <li>{this.props.name}</li>
                        <li>{this.props.email}</li>
                    </ul>
                    <ul>
                        <li>{this.props.location}</li>
                        <li>{this.props.slack}</li>
                    </ul>
                    {this.props.details}
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

//--- OLD VERSION OF TABLE BELOW ---
{/*class RequestDashboard extends Component {

    render() {  
        const data = [{
            issue: 'Help Java',
            name: 'Emma',
            location: "E7",
            description: "These are some test words test",
            moreInfo: {
                time: '12:30 pm',
                lastName:'word',
                age:12,
            }
            }, {
                issue: 'Python',
                name: 'Alissa',
                location: "RCH",
                moreInfo: {
                    time: '2:00 pm',
                    lastName: 'word2',
                    age:13,
                }
            }]
        const columns = [
               {
                    accessor: "issue",

                },
          
                
        ]
        const sub_columns = [
            {
                Header: "",
                id: "description",
                accessor: d => d.description,
                Cell: ({ value }) => (
                    <a onClick={console.log('clicked value')}>Help</a>,
                    <p>test</p>,
                    <p>test2</p>
                )
            },
        ]
      


        


      
        return (
         
            <div className="RequestDashboard">

             
                <hr />
                <div class="RequestTitle">
                    <h3>Requests</h3>
                    <h3>test</h3>

                </div>

                
                <ReactTable
                    data={data}
                    resolveData={data => data.map(row => row)}
                    loadingText={" "}
                    columns={columns}
                    defaultPageSize={10}
                    className="RequestTable"
                    SubComponent={(row) => {
                        return (
                            <div>
                                <ReactTable
                                    data={data}
                                    columns={sub_columns}
                                    showPagination={false}
                                    pageSize={3}
                                    className="ExpandRow"
                                    loadingText={" "}

                                />
                            </div>)
                    }}
                />

            </div>
           
        );
    }
}*/}
export default RequestDashboard;


