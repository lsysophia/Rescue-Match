import React, { Component } from 'react'

class Register extends Component {

    render() {
        return (
            <div className="form-box">
                <form className="column-flex" onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>
                    <input type="text"
                        name="username"
                        value={this.props.username}
                        placeholder="Username"
                        onChange={this.props.handleInputChange}
                        required
                    />
                    <input type="password"
                        name="password"
                        value={this.props.password}
                        placeholder="Password"
                        onChange={this.props.handleInputChange}
                        required
                    />
                    <input type="email"
                        name="email"
                        value={this.props.email}
                        placeholder="Email"
                        onChange={this.props.handleInputChange}
                        required
                    />
                    <input type="text"
                        name="name"
                        value={this.props.name}
                        placeholder="Name"
                        onChange={this.props.handleInputChange}
                        required
                    />
                    <input type="number"
                        name="zipcode"
                        value={this.props.zipcode}
                        placeholder="Zipcode"
                        onChange={this.props.handleInputChange}
                        required
                    />
                    <p>Please check on all that apply</p>
                    <span>Do you have any cats?</span>
                    <input type="checkbox"
                        name="has_cats"
                        value={this.props.has_cats}
                        onChange={this.props.handleCheckboxChange}
                    />
                    <span>Do you have any dogs?</span>
                    <input type="checkbox"
                        name="has_dogs"
                        value={this.props.has_dogs}
                        onChange={this.props.handleCheckboxChange}
                    />
                    <span>Do you have any kids?</span>
                    <input type="checkbox"
                        name="has_child"
                        value={this.props.has_child}
                        onChange={this.props.handleCheckboxChange}
                    />
                    <span>Do you have a yard?</span>
                    <input type="checkbox"
                        name="has_yard"
                        value={this.props.has_yard}
                        onChange={this.props.handleCheckboxChange}
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