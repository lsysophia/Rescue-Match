import React, { Component } from 'react';
import Auth from './modules/Auth'
import { Route, Redirect } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Nav from './components/Nav'
// import User from './components/User'
// import Footer from './components/Footer'


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
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.toggleLoginRegister = this.toggleLoginRegister.bind(this)
    this.logout = this.logout.bind(this)
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
    debugger
  }

  handleRegisterSubmit(e) {
    e.preventDefault()
    debugger
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

  render() {
    return (
    <div className="App">
       <Nav logout={this.logout} userAuth={this.state.auth} />
       <div className="container">
          <Route exact path='/'
            render={() => (
              <Home userAuth={this.state.auth} userZipcode={this.state.zipcode}/>
            )}
          />
          <Route exact path='/login'
            render={() => (
              this.state.auth
                ? <Redirect to='/user' />
                : <Login handleInputChange = {this.handleInputChange} handleLoginSubmit={this.handleLoginSubmit} toggleLoginRegister={this.toggleLoginRegister} />
            )}
          />
          <Route exact path='/register'
            render={() => (
              this.state.auth
                ? <Redirect to='/user' />
                : <Register handleCheckboxChange = {this.handleCheckboxChange} handleInputChange = {this.handleInputChange} handleRegisterSubmit={this.handleRegisterSubmit} />
            )}
          />
          {/* <Route exact path='/user'
            render={() => (
              !this.state.auth
                ? <Redirect to='/login' />
                : <User user={this.state.user} auth={this.state.auth} logout={this.logout} />
            )}
          /> */}

          {/* <Route exact path='/user/edit'
            render={() => (
              this.state.auth
                ? <UserEdit handleUserEditSubmit={this.handleUserEditSubmit} user={this.state.user} />
                : <Redirect to='/user' />
            )}
          /> */}

          {/* <Route exact path='/search/'
            render={() => (<SearchController user={this.state.user} selectedPoster={this.selectedPoster} pageStatus='initial' />)}
          /> */}
           </div>
        {/* <Footer /> */}
    </div>
    )
  };
}

export default App;
