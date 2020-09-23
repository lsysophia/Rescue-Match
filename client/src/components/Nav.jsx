import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
    render() {
        return (
            <header>
                <div className="logo">
                    <Link to="/">Rescue Match</Link>
                </div>
                <nav>
                    <ul>
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/about"><li>About</li></Link>
                        {this.props.userAuth
                            ?
                            <ul>
                                <Link to="/users/profile"><li>Profile</li></Link>
                                <li className="logout-click" onClick={() => { this.props.logout() }}>Logout</li>
                            </ul>
                            : <Link to='/login'><li>Login</li></Link>}
                    </ul>
                </nav>
            </header>
        )
    }
}
