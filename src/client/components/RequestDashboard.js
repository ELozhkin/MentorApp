import React, { Component } from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import BootstrapTable from 'react-bootstrap-table-next';



class RequestDashboard extends Component {

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
            {/*{
                    Header: "Name",
                    id: "name",
                    accessor: d => d.name
                },
            */}
                
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
}
export default RequestDashboard;


