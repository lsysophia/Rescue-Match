import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import dotenv from '../../.env'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            listOfAnimals: [],
            displayAnimal: {
                name: '',
                gender: '',
                age: '',
                breed: '',
                description: '',
                contact: '',
                photo: '',
                status: '',
                size: '',
                goodWithCats: '',
                goodWithDogs: '',
                goodWithKids: ''
            },
            nextApiPage: "",
        }

        this.handleAnswer = this.handleAnswer.bind(this)
        this.getAnimals = this.getAnimals.bind(this)
    }

    componentDidMount() {
        // debugger
        this.getAnimals()
    }

    getAnimals(nextPage = `/v2/animals?location=${this.props.userZipcode}`) {
        fetch(`https://api.petfinder.com${nextPage}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0eFB2dmxZc3pQWjZLdGR0dGFVVGJMbjRFbWxoc0V1eGJDMlFhelpHM0lGWTZQSzFOMiIsImp0aSI6IjBmNTRlMzllMDJiZGQ3NTgxNGE4MWE5Mjc3M2VkZTdhMGM3OGYyMWY4ZDA3ZGNiODRjMWMwZTc2YzRmODFjODE3ZGM2YjQzZDc5NTMzYmJiIiwiaWF0IjoxNjAwNjQ2MTQyLCJuYmYiOjE2MDA2NDYxNDIsImV4cCI6MTYwMDY0OTc0Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.CWdgZ4gcWurJiAdnrdMjKl3lau6ygEvF-bEJpwyWsVj_WQVzz4AcBZXa8i6BapO1xee3hALFvP_YrVGQZXSDQyx0_uNTsIUuWlWn0tgE2CTRQQcfjojpNVT5WBscNjUWy5C3KZJ3XZuFOxC0XPB32CC4WUek7GEdxv-g8iV46fOLRzZJ3DSyzhopU8uSlKc-aFVfahm54J20TQ3jj1pFPTWxGPXRccYskYl1qB7gShU9fe4ycnuNdr6QrnEH3YaOS3KeI2B7MAKWhifgRBlOtTwFjBFoRg7mecLYvvTfG0-vw2Zdzc1GigaorMSXfuvMi__u0r2FdKTxGylmTCcS6w'
            }, 
        }).then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes.animals)
            const animals = parsedRes.animals.map((animal, index) => { return {...animal, myId: index} })
            this.setState({
                listOfAnimals: animals,
                displayAnimal: animals[0],
                nextApiPage: parsedRes.pagination._links.next.href
            })
        }).catch(err => console.log(err))
    }

    handleAnswer(event) {
        // debugger
        const answer = event.target.innerText

        if (answer === "Yes") {
            // do something
        } else {
            // do something
        }

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

    render() {
        return (
            <div className="home-page">
                <div>
                    <h1>Welcome to Rescue Match</h1>
                </div>
                {this.props.userAuth
                    ?
                    <div className="animal-box">
                        <h3>{this.state.displayAnimal.name}</h3>
                        <button onClick={this.handleAnswer}>No</button>
                        <button onClick={this.handleAnswer}>Yes</button>
                    </div>
                    :
                    <div>
                        <div className="user-box">
                            <h3><Link to='/login'>Login</Link></h3>
                            <h3><Link to='/register'>Register</Link></h3>
                        </div>
                        <div className="user-box">
                            <h3><Link to="/search">Search Page</Link></h3>
                        </div>
                    </div>
                }
            </div>
        )
    }
}