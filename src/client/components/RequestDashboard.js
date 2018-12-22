import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTable, { ReactTableDefaults } from 'react-table';
import BootstrapTable from 'react-bootstrap-table-next';


var store = {
    headerOffset: null
};

let data = [
    {
        id: 0,
        name: "name 0",
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
    },
    {
        id: 7,
        name: "name 7",
        details: "details 7",
        state: "live"
    },
    {
        id: 8,
        name: "name 8",
        details: "details 8",
        state: "live"
    },
    {
        id: 9,
        name: "name 9",
        details: "details 9",
        state: "live"
    },
    {
        id: 10,
        name: "name 10",
        details: "details 10",
        state: "live"
    }
];

let cols = [
    {
        icon: "",
        label: "Order Number"
    },
    {/*{
        icon: "",
        label: "Name"
    },
    {
        icon: "",
        label: "Details"
    },
    {
        icon: "",
        label: "State"
    }*/}
];

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
                    <div className="col"> {this.props.id}</div>
                    {/*<div className="col"> {this.props.name}</div>
                    <div className="col"> {this.props.details}</div>
                    <div className="col"> {this.props.state}</div>*/}
                </div>
                <RowContent open={this.state.open} />
                {this.props.children}
            </li>
         )
    }

};

class RowContent extends React.Component {
    clicker() {

    }

    render() {
        let jsxhtml = (
            <div className="content" onClick={this.clicker.bind(this)}>
                row content
                <br/>
                test
                {this.props.children}

            </div>);

        if (this.props.open) {
            jsxhtml = (<div className="content open" onClick={this.clicker.bind(this)}>
                row content
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
class HeaderColumn extends Component {
    constructor() {
        super();
    }
    render() {
        return (<div className="hcol">{this.props.label}</div>);
    }
}


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
                {/*<div className="topbox">Top section..</div>*/}
                <Table data={data}
                    columns={cols}
                    headerFixed={this.state.tableHeaderFixed}
                    scrollFn='' />
            </div>
            )
    }
};


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


