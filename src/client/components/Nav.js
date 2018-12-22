// JavaScript source code
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <header>
                <h3>SH logo</h3>
                <hr/>
                <ul class="mentorNav">
                    <li>
                        <Link to='/openRequests'>Open</Link>
                    </li>
                    <li>
                        <Link to='/myTickets'>My Tickets</Link>
                    </li>
                </ul>
            </header>

        );

    }
}
export default Nav;