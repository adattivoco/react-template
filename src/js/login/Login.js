import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import * as Helpers from 'helpers'
import i18n from 'i18n'
import {login} from 'actions/AuthActions'

@connect((store) => {
  return {
    user: store.auth.user,
    token: store.auth.token,
    error: store.auth.error};
})
export default class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentDidMount(){
    Helpers.setSEOSettings('login')
    $('#loginForm').validator().on('submit', this.onSubmit)
  }
  componentDidUpdate(prevProps) {
    const {user,token} = this.props
    if (token && user) {
      this.props.history.push(user.type == 'admin'?'/admin':'/dashboard')
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    if (!e.isDefaultPrevented()) {
      e.preventDefault();
      this.props.dispatch(login(this.state.email, this.state.password));
    }
  }

  render() {
    return (
      <div class='login-wrapper'>
        <h1 class='header-text'>Log Into Adattivo</h1>

        { this.props.error &&
          <div class='alert alert-danger'>{i18n.login.loginError}</div>
        }

        <form id='loginForm' role='form' data-toggle='validator'>

          <div class='form-group'>
            <label for='email' class='control-label'>Email Address</label>
            <input
              type='text'
              name='email'
              pattern='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
              class='form-control'
              value={this.state.email}
              autoComplete="username"
              onChange={this.onChange}
              data-error={i18n.login.emailBlank}
              tabIndex='1'
              required />
            <div class='help-block with-errors'></div>
          </div>

          <div class='form-group'>
            <label for='email' class='control-label'>Password</label>
            <input
              type='password'
              name='password'
              class='form-control'
              autoComplete="current-password"
              onChange={this.onChange}
              value={this.state.password}
              data-minlength='6'
              data-error={i18n.login.pwBlank}
              tabIndex='2'
              required />
            <div class='help-block with-errors'></div>
          </div>
          <button class='btn btn-primary btn-lg' type='submit' tabIndex='3'>Log In</button>
        </form>
        <Link class='forgot-password' to='/reset-password' >Forgot Password</Link>
        <div class='version'>v{process.env.VERSION}</div>
      </div>
    )
  }
}
