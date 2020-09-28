import React, { Component } from 'react';
import Auth from './modules/Auth'
import { Route, Redirect } from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Nav from './components/Nav'
import Profile from './components/Profile'
import UserEdit from './components/UserEdit'
import Footer from './components/Footer'
import About from './components/About'


class App extends Component {
  constructor() {
    super()
    this.state = {
      auth: Auth.isUserAuthenticated(),
      loginUserName: '',
      loginPassword: '',
      fireRedirect: false,
      redirectPath: null,
      username: '',
      password: '',
      email: '',
      name: '',
      zipcode: '',
      has_cats: false,
      has_dogs: false,
      has_child: false,
      has_yard: false,
      user: {},
      user_pets: [],
      user_id: '',
    }
    // this.resetFireRedirect = this.resetFireRedirect.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.toggleLoginRegister = this.toggleLoginRegister.bind(this)
    this.logout = this.logout.bind(this)
    this.getUserDetails = this.getUserDetails.bind(this)
    this.removeMatch = this.removeMatch.bind(this)
  }

  // resetFireRedirect() {
  //   this.setState({
  //     fireRedirect: !this.state.fireRedirect
  //   })
  // }

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

  handleRegisterSubmit(e) {
    e.preventDefault()
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          name: this.state.name,
          zipcode: this.state.zipcode,
          has_cats: this.state.has_cats,
          has_dogs: this.state.has_dogs,
          has_child: this.state.has_child,
          has_yard: this.state.has_yard
        }
      }),
    }).then(res => res.json())
      .then(parsedRes => {
        if (parsedRes.token) {
          Auth.authenticateToken(parsedRes.token)
          this.setState({
            auth: Auth.isUserAuthenticated(),
          })
        }
      }).catch(err => console.log(err))
  }

  handleLoginSubmit(e) {
    e.preventDefault()
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.loginUserName,
        password: this.state.loginPassword,
      }),
    }).then(res => res.json())
      .then(parsedRes => {
        if (parsedRes.token) {
          Auth.authenticateToken(parsedRes.token);
          this.setState({
            auth: Auth.isUserAuthenticated(),
            loginUserName: '',
            loginPassword: '',
          })
        }
      }).catch(err => console.log(err))
  }

  handleUserEditSubmit(e, data, id) {
    e.preventDefault()
    fetch(`/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${Auth.getToken()}`,
        token: `${Auth.getToken()}`,
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(parsedRes => {
        this.setState({
          user: parsedRes,
          fireRedirect: true,
          redirectPath: '/profile',
        })
      }).catch(err => console.log(err))
  }

  getUserDetails() {
    fetch('/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: `${Auth.getToken()}`,
      }
    }).then(res => res.json())
    .then(res => {
      this.setState({
        user: res.user,
        user_pets: res.pets,
      })
    }).catch(err => console.log(err))
  }

  logout() {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then(res => {
      Auth.deauthenticateUser();
      this.setState({
        auth: Auth.isUserAuthenticated(),
        loginUserName: '',
        loginPassword: '',
      })
    }).catch(err => console.log(err))
  }

  toggleLoginRegister() {
    this.setState({
      fireRedirect: true,
      redirectPath: '/register'
    })
  }

  removeMatch(id) {
    fetch(`/pet_users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
    }).then(() => {
      this.getUserDetails()
    })
  }

  render() {
    return (
    <div className="App">
       <Nav logout={this.logout} userAuth={this.state.auth} />
       <div className="container">
          <Route exact path='/'
            render={() => (
              <Home userAuth={this.state.auth} user={this.state.user} getUserDetails={this.getUserDetails}/>
            )}
          />
          <Route exact path='/login'
            render={() => (
              this.state.auth
                ? <Redirect to='/users/profile' />
                : <Login handleInputChange={this.handleInputChange} handleLoginSubmit={this.handleLoginSubmit} toggleLoginRegister={this.toggleLoginRegister} />
            )}
          />
          <Route exact path='/register'
            render={() => (
              this.state.auth
                ? <Redirect to='/users/profile' />
                : <Register handleCheckboxChange={this.handleCheckboxChange} handleInputChange={this.handleInputChange} handleRegisterSubmit={this.handleRegisterSubmit} />
            )}
          />
          <Route exact path='/users/profile'
            render={() => (
              !this.state.auth
                ? <Redirect to='/login' />
                : <Profile user={this.state.user} userPets={this.state.user_pets} getUserDetails={this.getUserDetails} removeMatch={this.removeMatch}/>
            )}
          />

          <Route exact path='/user/edit'
            render={() => (
              this.state.auth
                ? <UserEdit handleUserEditSubmit={this.handleUserEditSubmit} user={this.state.user} getUserDetails={this.getUserDetails} handleInputChange={this.handleInputChange} />
                : <Redirect to='/users/profile' />
            )}
          />

          <Route exact path='/about'
            render={() => <About /> }
          />
           </div>
        <Footer />
    </div>
    )
  };
}

export default App;
