import React, { Component } from 'react'

class Profile extends Component {

    componentDidMount(){
        this.props.getUserDetails()
    }

  render() {
      return (
          <div>
            <div className="user-Box">
                <section>
                    <h3>Welcome Back, {this.props.user.username}!</h3>
                    <div className="user-info">
                        <p><em>Email:</em> {this.props.user.email}</p>
                        <p><em>Zipcode:</em> {this.props.user.zipcode}</p>
                        <p><em>Have Children:</em> {this.props.user.has_child === false ? <span>No</span> : <span>Yes</span>}</p>
                        <p><em>Have Cats:</em> {this.props.user.has_cats === false ? <span>No</span> : <span>Yes</span>}</p>
                        <p><em>Have Dogs:</em> {this.props.user.has_dogs === false ? <span>No</span> : <span>Yes</span>}</p>
                        <p><em>Have Yard:</em> {this.props.user.has_yard === false ? <span>No</span> : <span>Yes</span>}</p>
                    </div>
                </section>
            </div>
            {/* add list of matched animals */}
        </div>
      )
  }
    
}

export default Profile