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
            has_dogs: props.user.has_dogs,
            has_yard: props.user.has_yard
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    }

    componentDidMount(){
        this.props.getUserDetails()
    }

    handleInputChange(e) {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        this.setState({
            [name]: value
        })
    }

    handleCheckboxChange(e) {
        const checkedBox = e.currentTarget.name
        this.setState({
            [checkedBox]: !this.state[checkedBox]
        })
      }

    render() {
        return (
            <div>
                <form className="form-box" onSubmit={(e) => this.props.handleUserEditSubmit(e, this.state, this.props.user.id)}>
                    <input type="text"
                        name="name"
                        value={this.state.name}
                        placeholder={this.props.user.name}
                        onChange={this.handleInputChange}
                    />
                    <input type="email"
                        name="email"
                        value={this.state.email}
                        placeholder={this.props.user.email}
                        onChange={this.handleInputChange}
                    />
                    <input type="number"
                        name="zipcode"
                        value={this.state.zipcode}
                        placeholder={this.props.user.zipcode}
                        onChange={this.handleInputChange}
                    />
                    <p>Please check on all that apply</p>
                    <span>Do you have any kids?</span>
                    <input type="checkbox"
                        name="has_child"
                        defaultChecked={this.state.has_child}
                        onChange={this.handleCheckboxChange}
                    />
                    <span>Do you have any cats?</span>
                    <input type="checkbox"
                        name="has_cats"
                        defaultChecked={this.state.has_cats}
                        onChange={this.handleCheckboxChange}
                    />
                    <span>Do you have any dogs?</span>
                    <input type="checkbox"
                        name="has_dogs"
                        defaultChecked={this.state.has_dogs}
                        onChange={this.handleCheckboxChange}
                    />
                    <span>Do you have a yard?</span>
                    <input type="checkbox"
                        name="has_yard"
                        // defaultChecked={this.state.has_yard.value}
                        defaultChecked={this.state.has_yard}
                        onChange={this.handleCheckboxChange}
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