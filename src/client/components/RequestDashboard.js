import React, { Component } from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';

class RequestDashboard extends Component {
    //constructor(props) {
    //    super(props);
    //    this.state = {
    //        data: getData()
    //    };
    //}

    //getData() {
    //    this.state.testObj = fetch('');
    //};
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
                    Header: "Issue",
                    accessor: "issue",

                },
            {/*{
                    Header: "Name",
                    id: "name",
                    accessor: d => d.name
                },
            */}
                
        ]
        const sub_columns = [
            {
                Header: "Description",
                id: "description",
                accessor: d => d.description
            },
        ]
        //const sub_columns = [
        {/*sub_columns.push(
            {
                id: 'button',
                accessor: 'name',
                Cell: ({ value }) => (<a onClick={console.log('clicked value', value)}>Help</a>)
            }
        )*/}
        
        //]


        return (
            <div className="RequestDashboard">
                
                {/*<div className="DashboardIcons">
                    <div className="icon1"></div>
                    <div className="icon2"></div>
                    
                </div>*/}
                <hr />
                <h3>Requests</h3>
                <hr/>
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
                                <p>test</p>
                                <ReactTable
                                    data={data}
                                    columns={sub_columns}
                                    showPagination={false}
                                    pageSize={3}
                                />
                            </div>)
                    }}
                 />
               
            </div>
           
        );
    }
}
export default RequestDashboard;
