import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class About extends Component {
    render() {
        return (
            <article className="about-box">
                <h1>Rescue Match</h1>
                <p className="about">
                    Welcome to the Rescue Match web-app! This app was created to match users with rescue animals that they may like. 
                    </p><br></br>
                <p>
                    If you would like to register, please register <Link to='/register'>Here</Link>
                </p><br></br>
                <h2>How to use this app</h2>
                <p>
                    
                    </p>
                <h2>Search Functionality</h2>
                <p>
                    Search results will be auto-populated based on the Zipcode you have filled out in your profile. You can click through the animals on display and click on "Yes" or "No".
                </p><br></br>


                <h2>Technologies used for this project</h2>
                <div className="center">
                    <ul>
                        <li><span role="img" aria-label="tech">• Ruby on Rails 6</span></li>
                        <li><span role="img" aria-label="tech">• React</span></li>
                        <li><span role="img" aria-label="tech">• PSQL</span></li>
                        <li><span role="img" aria-label="tech">• Rails Crono Gem</span></li>
                        <li><span role="img" aria-label="tech">• CSS</span></li>
                    </ul>
                </div>

                <h2>Developer</h2>
                <div className="center">
                    <p><span role="img" aria-label="fire"></span><a href="https://github.com/lsysophia" target="_blank" rel="noopener noreferrer">Sophia Li</a></p>
                </div>
            </article>
        )
    }
}