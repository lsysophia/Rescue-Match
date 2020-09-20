import React, { Component } from 'react';
import Auth from './modules/Auth'


class App extends Component {
  constructor() {
    super()
    this.state = {
      auth: Auth.isUserAuthenticated(),
      loginUserName: '',
      loginPassword: '',
      fireRedirect: false,
      redirectPath: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
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

  handleRegisterSubmit(e, data) {
    e.preventDefault()
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {data}
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
        if (res.token) {
          Auth.authenticateToken(res.token);
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
              <Home userAuth={this.state.auth} />
            )}
          />
          <Route exact path='/login'
            render={() => (
              this.state.auth
                ? <Redirect to='/user' />
                : <Login handleLoginSubmit={this.handleLoginSubmit} toggleLoginRegister={this.toggleLoginRegister} />
            )}
          />
          <Route exact path='/register'
            render={() => (
              this.state.auth
                ? <Redirect to='/user' />
                : <Register handleRegisterSubmit={this.handleRegisterSubmit} />
            )}
          />
          <Route exact path='/user'
            render={() => (
              !this.state.auth
                ? <Redirect to='/login' />
                : <User deleteFromWatch={this.deleteFromWatch} watchList={this.state.watchList} getUserContent={this.getUserContent} deleteUser={this.deleteUser} user={this.state.user} auth={this.state.auth} logout={this.logout} selectedTitle={this.selectedPoster} />
            )}
          />

          <Route exact path='/user/edit'
            render={() => (
              this.state.auth
                ? <UserEdit handleUserEditSubmit={this.handleUserEditSubmit} user={this.state.user} />
                : <Redirect to='/user' />
            )}
          />

          {/* <Route exact path='/search/'
            render={() => (<SearchController user={this.state.user} selectedPoster={this.selectedPoster} pageStatus='initial' />)}
          /> */}
           </div>
        <Footer />
    </div>
    )
  };
}

export default App;
