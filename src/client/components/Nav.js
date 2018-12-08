// JavaScript source code
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <header>
                <h1>SH logo</h1>
                <ul>
                    <li>
                        <Link to='/dashboard'>Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                </ul>
            </header>

        );

    }
}
export default Nav;