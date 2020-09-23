import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../modules/Auth'
// import dotenv from '../../.env'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listOfAnimals: [],
            displayAnimal: {
                name: '',
                species: '',
                gender: '',
                age: '',
                breeds: {},
                description: '',
                contact: '',
                primary_photo_cropped: '',
                status: '',
                size: '',
                environment: {}
            },
            nextApiPage: "",
            user_id: this.props.user.user_id,
            zipcode: this.props.user.zipcode
        }
        this.handleAnswer = this.handleAnswer.bind(this)
        this.getAnimals = this.getAnimals.bind(this)
        this.handlePetSubmit = this.handlePetSubmit.bind(this)
    }

    componentDidMount() {
        // debugger
        // this.props.resetFireRedirect()
        // if (this.props.userAuth) {
            this.props.getUserDetails()
            // debugger
        // }
        if (this.state.zipcode) {
            this.getAnimals()
        }
        // debugger
    }

    getAnimals(nextPage = `/v2/animals?location=${this.state.zipcode}`) {
        // console.log(this.props.user)
        // console.log(this.state.zipcode)
        // debugger
        fetch(`/home?nextPage=${nextPage}`, {
            method: 'GET',
            headers: {
            'Authorization': `Token ${Auth.getToken()}`,
            // token: Auth.getToken(),
            }
        }).then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes.pagination._links.next.href)
            console.log(parsedRes.animals)
            // debugger
            const animals = parsedRes.animals.map((animal, index) => { return {...animal, myId: index} })
            this.setState({
                listOfAnimals: animals,
                displayAnimal: animals[0],
                nextApiPage: parsedRes.pagination._links.next.href
            })
        }).catch(err => console.log(err))
    }

    handlePetSubmit() {
        // console.log(this.state.displayAnimal)
        // debugger
        if (this.state.displayAnimal.primary_photo_cropped) {
            fetch('/pet_users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${Auth.getToken()}`,
                    token: Auth.getToken(),
                },
                body: JSON.stringify({
                    pet_user: {
                        name: this.state.displayAnimal.name,
                        species: this.state.displayAnimal.species,
                        breed: this.state.displayAnimal.breeds.primary,
                        age: this.state.displayAnimal.age,
                        gender: this.state.displayAnimal.gender,
                        size: this.state.displayAnimal.size,
                        photo: this.state.displayAnimal.primary_photo_cropped.small,
                        description: this.state.displayAnimal.description,
                        contact: this.state.displayAnimal.contact.email,
                        user_id: this.state.user_id
                    }
                }),
            }).then(res => res.json())
            .then(res => {
                console.log('trying to create a pet for user' + res)
            //   this.setState({
            //     fireRedirect: true,
            //   })
            }).catch(err => console.log(err))
        } else {
            fetch('/pet_users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${Auth.getToken()}`,
                    token: Auth.getToken(),
                },
                body: JSON.stringify({
                    pet_user: {
                        name: this.state.displayAnimal.name,
                        species: this.state.displayAnimal.species,
                        breed: this.state.displayAnimal.breeds.primary,
                        age: this.state.displayAnimal.age,
                        gender: this.state.displayAnimal.gender,
                        size: this.state.displayAnimal.size,
                        description: this.state.displayAnimal.description,
                        contact: this.state.displayAnimal.contact.email,
                        user_id: this.state.user_id
                    }
                }),
            }).then(res => res.json())
            .then(res => {
                console.log('trying to create a pet for user' + res)
            //   this.setState({
            //     fireRedirect: true,
            //   })
            }).catch(err => console.log(err))
        }
      }

    handleAnswer(event) {
        // debugger
        // event.preventDefault()
        const answer = event.target.innerText

        let matchpoint = 0
        if (answer === "Yes") {
            if (this.props.user.has_yard === true) {
                matchpoint += 1
            }
            if (this.props.user.has_yard === false && this.state.displayAnimal.size === 'small'){
                matchpoint += 1
            }
            if (this.props.user.has_yard === false && this.state.displayAnimal.size === 'medium') {
                matchpoint += 1
            }
            if (this.props.user.has_cats === this.state.displayAnimal.environment.cats) {
                matchpoint += 1
            }
            if (this.props.user.has_cats === false) {
                matchpoint += 1
            }
            if (this.props.user.has_dogs === this.state.displayAnimal.environment.dogs) {
                matchpoint += 1
            }
            if (this.props.user.has_dogs === false) {
                matchpoint += 1
            }
            if (this.props.user.has_child === this.state.displayAnimal.environment.children) {
                matchpoint += 1
            }
            if (this.props.user.has_child === false) {
                matchpoint += 1
            }
            if (matchpoint >= 3) {
                alert("It's a match!")
                console.log(matchpoint)
                this.handlePetSubmit()
             } 
        } 
        // else {
        //     // do something
        // }

        if (this.state.displayAnimal.myId === (this.state.listOfAnimals.length - 1)) {
            console.log(this.state.nextApiPage)
            // debugger
            this.getAnimals(this.state.nextApiPage)
        } else {
            this.setState({
                displayAnimal: this.state.listOfAnimals.find((animal) => {
                    return animal.myId === (this.state.displayAnimal.myId + 1)
                })
            })
        }
    }

    render() {
        return (
            <div className="home-page">
                {this.props.userAuth
                    ?
                    <div className="animal-box">
                        <div className="display-headshot">
                            {this.state.displayAnimal.primary_photo_cropped 
                                ? 
                            <img src={this.state.displayAnimal.primary_photo_cropped.small} alt="Headshot" /> 
                            : null}
                        </div>
                        <div className="display-details">
                            <h3>{this.state.displayAnimal.name}</h3>
                            {!this.state.displayAnimal.primary_photo_cropped 
                                ? 
                            <p>Species: {this.state.displayAnimal.species}</p> : null}
                            <p>Age: {this.state.displayAnimal.age}</p>
                            <p>Gender: {this.state.displayAnimal.gender}</p>
                            <p>Breed: {this.state.displayAnimal.breeds.unknown ? <span>Unknown</span> : this.state.displayAnimal.breeds.mixed ? <span>Mixed {this.state.displayAnimal.breeds.primary}</span> : <span>{this.state.displayAnimal.breeds.primary}</span>}</p>
                            <p>Size: {this.state.displayAnimal.size}</p>
                            <p>About me: {this.state.displayAnimal.description}</p>
                            <p>Good with Children: {this.state.displayAnimal.environment.children === null ? <span>Unknown</span> : this.state.displayAnimal.environment.children ? <span>Yes</span> : <span>No</span>}</p>
                            <p>Good with Cats: {this.state.displayAnimal.environment.cats === null ? <span>Unknown</span> : this.state.displayAnimal.environment.cats ? <span>Yes</span> : <span>No</span>}</p>
                            <p>Good with Dogs: {this.state.displayAnimal.environment.dogs === null ? <span>Unknown</span> : this.state.displayAnimal.environment.dogs ? <span>Yes</span> : <span>No</span>}</p>
                            <p>Status: {this.state.displayAnimal.status}</p>
                            <p>Contact: {this.state.displayAnimal.contact.email}</p>
                        </div>
                        <div className="user-response">
                            <button onClick={this.handleAnswer}>No</button>
                            <button onClick={this.handleAnswer}>Yes</button>
                        </div>
                    </div>
                    :
                    <div>
                        <h1>Welcome to Rescue Match</h1>
                        <div className="user-nav">
                            {/* <div> */}
                                <h3><Link to='/login'>Login</Link></h3>
                                <h3><Link to='/register'>Register</Link></h3>
                            {/* </div> */}
                        </div>
                    </div>
                }
            </div>
        )
    }
}