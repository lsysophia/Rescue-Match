import React, { Component } from 'react'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            email: '',
            name: '',
            zipcode: '',
            has_cats: '',
            has_dogs: '',
            has_child: '',
            has_yard: '',
        }
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    }

    handleCheckboxChange() {
        this.setState({})
    }

    render() {
        return (
            <div className="form-box">
                <form className="column-flex" onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>
                    <input type="text"
                        name="username"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.props.handleInputChange}
                        required
                    />
                    <input type="password"
                        name="password"
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.props.handleInputChange}
                        required
                    />
                    <input type="email"
                        name="email"
                        value={this.state.email}
                        placeholder="Email"
                        onChange={this.props.handleInputChange}
                        required
                    />
                    <input type="text"
                        name="name"
                        value={this.state.name}
                        placeholder="Name"
                        onChange={this.props.handleInputChange}
                        required
                    />
                    <input type="number"
                        name="zipcode"
                        value={this.state.zipcode}
                        placeholder="Zipcode"
                        onChange={this.props.handleInputChange}
                        required
                    />
                    <input type="checkbox"
                        name="has_cats"
                        value={this.state.has_cats}
                        placeholder="Do you have any cats?"
                        onChange={this.handleCheckboxChange}
                    />
                    <input type="checkbox"
                        name="has_dogs"
                        value={this.state.has_dogs}
                        placeholder="Do you have any dogs?"
                        onChange={this.handleInputChange}
                    />
                    <input type="checkbox"
                        name="has_child"
                        value={this.state.has_child}
                        placeholder="Do you have any kids?"
                        onChange={this.handleInputChange}
                    />
                    <input type="checkbox"
                        name="has_yard"
                        value={this.state.has_yard}
                        placeholder="Do you have a yard?"
                        onChange={this.handleInputChange}
                    />
                    <input type="submit"
                        value="Register"
                    />
                </form>
            </div>
        )
    }
}

export default Register