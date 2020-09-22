import React, { Component } from 'react'

class UserEdit extends Component {
    constructor(props) {
        super()
        this.state = {
            name: props.user.name,
            email: props.user.email,
            zipcode: props.user.zipcode,
            has_child: props.user.has_child,
            has_cats: props.user.has_cats,
            has_dogs: props.user.has_dogs
        }
    }

    componentDidMount(){
        this.props.getUserDetails()
    }

    render() {
        return (
            <div>
                <form className="form-box" onSubmit={(e) => this.props.handleUserEditSubmit(e, this.state, this.props.user.id)}>
                    <input type="text"
                        name="name"
                        value={this.state.name}
                        placeholder='Name'
                        onChange={this.props.handleInputChange}
                        required
                    />
                    <input type="email"
                        name="email"
                        value={this.state.email}
                        placeholder='Email'
                        onChange={this.props.handleInputChange}
                        required
                    />
                    <input type="number"
                        name="zipcode"
                        value={this.state.zipcode}
                        placeholder='Zipcode'
                        onChange={this.props.handleInputChange}
                        required
                    />
                    <p>Please check on all that apply</p>
                    <span>Do you have any cats?</span>
                    <input type="checkbox"
                        name="has_cats"
                        value={this.state.has_cats}
                        onChange={this.props.handleCheckboxChange}
                    />
                    <span>Do you have any dogs?</span>
                    <input type="checkbox"
                        name="has_dogs"
                        value={this.state.has_dogs}
                        onChange={this.props.handleCheckboxChange}
                    />
                    <span>Do you have any kids?</span>
                    <input type="checkbox"
                        name="has_child"
                        value={this.state.has_child}
                        onChange={this.props.handleCheckboxChange}
                    />
                    <span>Do you have a yard?</span>
                    <input type="checkbox"
                        name="has_yard"
                        value={this.state.has_yard}
                        onChange={this.props.handleCheckboxChange}
                    />
                    <input type="submit"
                        value="Finish Editing"
                    />
                </form>
            </div>
        )
    }

}

export default UserEdit