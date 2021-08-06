import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
// import { FcMindMap } from "react-icons/fc";


class Header extends Component {
    render() {
        return (
            <div>
                <Navbar bg="black" variant="dark" className="text-center">
                    <Navbar.Brand href="#home">
                        <img width="28ch" src="logomain.png" alt="this is logo" />{'   '}
                        INDIA: COVID-19 Tracker (Anuprgyanam *)
                    </Navbar.Brand>
                </Navbar>
            </div>
        )
    }
}

export default Header
