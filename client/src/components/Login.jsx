import React, { Component } from 'react'
export default class Login extends Component {

    render() {
        return (
            <div className="form-box">
                <form className="column-flex" onSubmit={(e) => this.props.handleLoginSubmit(e, this.state)} >
                    <input type="text" name="username" value={username} placeholder="Username" onChange={this.props.handleInputChange} /> 
                    <input type="password" name="password" value={password} placeholder="Password" onChange={this.props.handleInputChange}/>
                    <input type="submit" value="Log in!" />
                </form>
                <form className="form-box" onSubmit={() => this.props.toggleLoginRegister()} >
                    <input type="submit" value="Register" />
                </form>

            </div>
        )
    }
}