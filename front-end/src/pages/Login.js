import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from '../components/atoms/TextField'
import logo from '../imgs/logo.jpg'

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAccount: false,
      email: 'finance@gmail.com',
      password: 'asdfasdf',
      loading: false
    }
  }

 submitToAuth = (callback) => {
  // Get values from the field
  const email = this.state.email
  const password = this.state.password
  // Call the callback function with our values
  callback({ email, password })
  }

  //handle user input and set password and email state
  onInputChange = (e, newValue) => {
    this.setState({
      [e.target.id]: newValue
    })
  }

  handleAccountChange = () => this.setState({
    createAccount: !this.state.createAccount
  })

  changeLoading = (loading) => {
    this.setState({
      loading
    })
  }

  componentDidMount() {
    // init google auth
    // oauthApi.start(this.changeLoading, this.props.setToken,this.props.handleErrors)
  }

  render() {
    return (
      <div className='login-background'>
        <div className='conctr-footer-box'>
          <div className='conctr-footer-text'>School Project</div>
          {/* <a href='https://conctr.com/'>
            <img
              src={ conctrLogo }
              alt='conctr logo'
              className='conctr-footer-logo'
            />
          </a> */}
        </div>
        <div className='welcome-container'>
          { this.state.loading ? (
            <CircularProgress />
            ) : (
              <div className='login-dialog'>
                <img
                  src={ logo }
                  alt='logo'
                  className='wimo-login-logo' />
                <div>
                  <div className='element'></div>
                  <div className='login-text-fields'>
                    <TextField
                      id='email'
                      floatingLabelText='Email'
                      fullWidth={ true }
                      onChange={ this.onInputChange }
                      onEnterKeyDown={
                        () => this.submitToAuth(this.props.onSignIn)
                      }
                      value={ this.state.email }
                      hintText='Email'
                    />
                    <TextField
                      id='password'
                      floatingLabelText='Password'
                      fullWidth={ true }
                      onChange={ this.onInputChange }
                      onEnterKeyDown={
                        () => this.submitToAuth(this.props.onSignIn)
                      }
                      value={ this.state.password }
                      hintText='Password'
                      type='password'
                    />
                  </div>
                  <RaisedButton
                    className='login-button'
                    label='Log in'
                    onClick={
                      () => this.submitToAuth(this.props.onSignIn)
                    }
                  />
                  <div className='login-divider'>
                    <Divider />
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}
