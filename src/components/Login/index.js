import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLoginButton = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {username, password}
    const LoginURL = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(LoginURL, options)
    const FetchData = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccessFlow(FetchData.jwt_token)
    } else {
      this.onSubmitFailureFlow(FetchData.error_msg)
    }
  }

  onSubmitSuccessFlow = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailureFlow = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="login-container">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="form-container" onSubmit={this.onSubmitLoginButton}>
            <div className="input-container">
              <label className="input-field-label" htmlFor="usernameID">
                USERNAME
              </label>
              <input
                className="input-field"
                id="usernameID"
                placeholder="Username"
                type="text"
                onChange={this.onChangeUserName}
                value={username}
              />
            </div>
            <div className="input-container">
              <label className="input-field-label" htmlFor="PasswordID">
                PASSWORD
              </label>
              <input
                className="input-field"
                id="PasswordID"
                placeholder="Password"
                type="password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button type="submit" className="Login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
