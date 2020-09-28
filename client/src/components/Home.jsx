import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../modules/Auth'

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
            zipcode: this.props.user.zipcode,
            match: "none",
        }
        this.handleAnswer = this.handleAnswer.bind(this)
        this.getAnimals = this.getAnimals.bind(this)
        this.handlePetSubmit = this.handlePetSubmit.bind(this)
        this.showMatchAnimation = this.showMatchAnimation.bind(this)
    }

    componentDidMount() {
        this.props.getUserDetails()
        if (this.state.zipcode) {
            this.getAnimals()
        }
    }

    getAnimals(nextPage = `/v2/animals?location=${this.state.zipcode}`) {
        fetch(`/home?nextPage=${encodeURIComponent(nextPage)}`, {
            method: 'GET',
            headers: {
            'Authorization': `Token ${Auth.getToken()}`,
            }
        }).then(res => res.json())
        .then(parsedRes => {
            const animals = parsedRes.animals.map((animal, index) => { return {...animal, myId: index} })
            this.setState({
                listOfAnimals: animals,
                displayAnimal: animals[0],
                nextApiPage: parsedRes.pagination._links.next.href
            })
        }).catch(err => console.log(err))
    }

    handlePetSubmit() {
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
            }).catch(err => console.log(err))
        }
      }

    handleAnswer(event) {
        const answer = event.target.innerText

        let matchpoint = 0
        if (answer === "Like") {
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
            if (this.props.user.has_cats === false && this.state.displayAnimal.environment.cats === null) {
                matchpoint += 1
            }
            if (this.props.user.has_cats === false && this.state.displayAnimal.environment.cats === true) {
                matchpoint += 1
            }
            if (this.props.user.has_cats === true && this.state.displayAnimal.environment.cats === false) {
                matchpoint -= 1
            }
            if (this.props.user.has_dogs === this.state.displayAnimal.environment.dogs) {
                matchpoint += 1
            }
            if (this.props.user.has_dogs === false && this.state.displayAnimal.environment.dogs === null) {
                matchpoint += 1
            }
            if (this.props.user.has_dogs === false && this.state.displayAnimal.environment.dogs === true) {
                matchpoint += 1
            }
            if (this.props.user.has_dogs === true && this.state.displayAnimal.environment.dogs === false) {
                matchpoint -= 1
            }
            if (this.props.user.has_child === this.state.displayAnimal.environment.children) {
                matchpoint += 1
            }
            if (this.props.user.has_child === false && this.state.displayAnimal.environment.children === null) {
                matchpoint += 1
            }
            if (this.props.user.has_child === false && this.state.displayAnimal.environment.children === true) {
                matchpoint += 1
            }
            if (this.props.user.has_child === true && this.state.displayAnimal.environment.children === false) {
                matchpoint -= 1
            }
            if (matchpoint > 3) {
                this.showMatchAnimation()
                this.handlePetSubmit()
            }
        }

        if (matchpoint <= 3) {
            if (this.state.displayAnimal.myId === (this.state.listOfAnimals.length - 1)) {
                this.getAnimals(this.state.nextApiPage)
            } else {
                this.setState({
                    displayAnimal: this.state.listOfAnimals.find((animal) => {
                        return animal.myId === (this.state.displayAnimal.myId + 1)
                    })
                })
            }
        }
    }

    showMatchAnimation() {
        this.setState({
            match: "inline"
        })

        setTimeout(() => {
            this.setState({
                match: "none"
            })

            if (this.state.displayAnimal.myId === (this.state.listOfAnimals.length - 1)) {
                this.getAnimals(this.state.nextApiPage)
            } else {
                this.setState({
                    displayAnimal: this.state.listOfAnimals.find((animal) => {
                        return animal.myId === (this.state.displayAnimal.myId + 1)
                    })
                })
            }
        }, 2000)
    }

    render() {
        return (
            <div className="home-page">
                <div style={{position: "absolute", right: 150, display: this.state.match, color: "red"}}>MATCH!</div>
                <lottie-player
                    src="https://assets8.lottiefiles.com/packages/lf20_sXVZLv.json"
                    background="transparent"
                    speed="1"
                    style={{width: 500, height: 500, position: "absolute", right: 110, display: this.state.match}}
                    loop
                    autoplay>
                </lottie-player>
                {this.props.userAuth
                    ?
                    <div className="animal-box">
                        <div className="display-headshot">
                            {this.state.displayAnimal.primary_photo_cropped
                                ?
                            <img src={this.state.displayAnimal.primary_photo_cropped.small} alt="Headshot" />
                            : <img src="https://agriculture.ny.gov/sites/g/files/oee1031/files/styles/mobile_lead/public/media/2019/09/Dogs%20and%20Cats%20hero.jpg?h=bf52df92&itok=OcvyBcDT" alt="Default" />}
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
                            <button onClick={this.handleAnswer}>Nope</button>
                            <button onClick={this.handleAnswer}>Like</button>
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