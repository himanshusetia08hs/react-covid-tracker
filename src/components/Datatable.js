import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'

class Datatable extends Component {

    render() {

        // destructuring of props as they are implemented using hooks
        const { state, districts } = this.props;

        // console.log("Props",this.props);
        // console.log("Hello",state,districts.data[state]);

        return (
            
            <Table striped bordered hover size="sm" responsive style={{ margin: "0px",padding:"0px" }}>
                <font size="2"  >
                    <thead>

                        <tr style={{background:"light"}}>
                            <th>District</th>
                            <th>Active</th>
                            <th>Confirmed</th>
                            <th>Recovered</th>
                            <th>Deaths</th>
                        </tr>
                        
                        {/* javascript block code to be evaluated in JSX */}
                        {
                            Object.keys( districts.data[state].districtData ).map( (value) => {
                                
                                if((value=== "Unknown")||(value === "unknown"))
                                    return null;
                                    
                                // console.log(districts.data[state].districtData[value]);
                                // console.log(value);  // it contains districts
                                return (
                                    <tr>
                                        <td>{value}</td>
                                        <td>{districts.data[state].districtData[value].active}</td>
                                        <td>
                                            {
                                                // for confirmend delta variant
                                                districts.data[state].districtData[value].delta.confirmed !== 0 ? 
                                                <Badge pill variant="danger"><small><i className="fas fa-arrow-up"/></small>{ districts.data[state].districtData[value].delta.confirmed}</Badge> 
                                                : <></> 
                                            }
                                            {districts.data[state].districtData[value].confirmed}
                                        </td>
                                        <td>
                                            {/* {console.log(typeof(districts.data[state].districtData[value].delta.recovered))} */}
                                            {
                                                // for recovered delta variant
                                                districts.data[state].districtData[value].delta.recovered !== 0 ? 
                                                <Badge pill variant="success"><small><i className="fas fa-arrow-up"/></small>{ districts.data[state].districtData[value].delta.recovered}</Badge> 
                                                : <></> 
                                            }
                                            {districts.data[state].districtData[value].recovered}
                                        </td>
                                        <td>
                                            {
                                                // for deceased delta variant
                                                districts.data[state].districtData[value].delta.deceased !== 0 ? 
                                                <Badge pill variant="warning"><small><i className="fas fa-arrow-up"/></small>{ districts.data[state].districtData[value].delta.deceased}</Badge>
                                                : <></> 
                                            }
                                            {districts.data[state].districtData[value].deceased}
                                        </td> 

                                    </tr>
                                )
                            })
                            
                        }

                    </thead>
                </font>  
            </Table>
        )
    }
}

export default Datatable


