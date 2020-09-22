import React, { Component } from 'react'

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
                    <div className="user-info">
                        <p><em>Email:</em> {this.props.user.email}</p>
                        <p><em>Zipcode:</em> {this.props.user.zipcode}</p>
                        <p><em>Have Children:</em> {this.props.user.has_child === false ? <span>No</span> : <span>Yes</span>}</p>
                        <p><em>Have Cats:</em> {this.props.user.has_cats === false ? <span>No</span> : <span>Yes</span>}</p>
                        <p><em>Have Dogs:</em> {this.props.user.has_dogs === false ? <span>No</span> : <span>Yes</span>}</p>
                        <p><em>Have Yard:</em> {this.props.user.has_yard === false ? <span>No</span> : <span>Yes</span>}</p>
                    </div>
                </aside>
                <section>
                    <h4>Here's a list of your saved animals</h4>
                    <div className="display-animal">
                        { this.props.userPets.map((pet) => {
                            console.log(pet)
                            return <li key={pet.id}>
                                    <img src={pet.photo} alt='pet' />
                                    <p>Name: {pet.name}</p>
                                    <button onClick={() => this.props.removeMatch(pet.id)}>Unmatch</button>
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