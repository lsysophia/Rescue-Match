import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Profile extends Component {

    componentDidMount(){
        this.props.getUserDetails()
    }

  render() {
      return (
          <div>
            <div className="profile-page">
                <aside>
                    <h3>Welcome Back, {this.props.user.username}!</h3>
                    <h3>Below is your information:</h3>
                    <div className="user-info">
                        <p><em>Email:</em> {this.props.user.email}</p>
                        <p><em>Zipcode:</em> {this.props.user.zipcode}</p>
                        <p><em>Have Children:</em> {this.props.user.has_child === false ? <span>No</span> : <span>Yes</span>}</p>
                        <p><em>Have Cats:</em> {this.props.user.has_cats === false ? <span>No</span> : <span>Yes</span>}</p>
                        <p><em>Have Dogs:</em> {this.props.user.has_dogs === false ? <span>No</span> : <span>Yes</span>}</p>
                        <p><em>Have Yard:</em> {this.props.user.has_yard === false ? <span>No</span> : <span>Yes</span>}</p>
                        <h4><Link to='/user/edit'>Edit Profile</Link></h4>
                    </div>
                </aside>
                <section>
                    <h3>Here's the list of your saved animals</h3>
                    <div className="display-animal">
                        { this.props.userPets.map((pet) => {
                            return <li key={pet.id}>
                                    <div className="single-display-box">
                                        <img src={pet.photo} alt='pet' />
                                            <div className="info">
                                                <p>Name: {pet.name}</p>
                                                <p>Contact: {pet.contact}</p>
                                                <button onClick={() => this.props.removeMatch(pet.id)}>Unmatch</button>
                                            </div>
                                    </div>
                            </li>
                        })}
                    </div>
                </section>
            </div>
        </div>
      )
  }

}

export default Profile