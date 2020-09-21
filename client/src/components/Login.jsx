import React, { Component } from 'react'
export default class Login extends Component {

    render() {
        return (
            <div className="form-box">
                <form className="column-flex" onSubmit={(e) => this.props.handleLoginSubmit(e)} >
                    <input type="text" name="loginUserName" value={this.props.loginUserName} placeholder="Username" onChange={this.props.handleInputChange} /> 
                    <input type="password" name="loginPassword" value={this.props.loginPassword} placeholder="Password" onChange={this.props.handleInputChange}/>
                    <input type="submit" value="Log in!" />
                </form>
                <span>Don't have an account?</span>
                <form className="form-box" onSubmit={() => this.props.toggleLoginRegister()} >
                    <input type="submit" value="Register" />
                </form>

            </div>
        )
    }
}