import React, { Component } from 'react'

// react-strap
import Card from 'react-bootstrap/Card'

// readct-icons
import { FcApproval } from "react-icons/fc";

class Footer extends Component {
    render() {
        return (
            <div>
                <Card border="dark" bg="secondary" text="light" className="text-center" style={{ margin: "8px" }}>
                    <Card.Header><b><FcApproval />Developed by: </b><a target="_blank" style={{ color: "white" }} href="home">Himanshu Setia</a></Card.Header>
                </Card>
            </div>
        )
    }
}

export default Footer
