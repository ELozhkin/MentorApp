import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mini_logo from './Mini_logo.png';

class Nav extends Component {
    render() {
        return (
            <header>
                
                <img src={mini_logo} className="headerLogo" alt="SH Logo"/>
                <hr/>
                <ul class="mentorNav">
                    <li>
                        <Link to='/Mentor/openRequests'>Open</Link>
                    </li>
                    <li>
                        <Link to='/Mentor/myTickets'>My Tickets</Link>
                    </li>
                </ul>
            </header>

        );

    }
}
export default Nav;