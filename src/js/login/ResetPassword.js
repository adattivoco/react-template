import React from "react"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import * as Helpers from "helpers"
import {requestReset, resetPW} from 'actions/AuthActions'

@connect((store) => {
  return {
    error: store.auth.error,
    resetSuccess: store.auth.resetSuccess
  }
})
export default class ResetPassword extends React.Component {
  state = {
    emailSent: false,
    email: '',
    password: '',
    password_confirmation: ''
  }
  constructor() {
    super()
    Helpers.setSEOSettings('forgot-password')
    const query = Helpers.getQueryParams()
    this.resetToken = query['token']
  }

  componentDidMount(){
    if (this.resetToken) {
      $('#passwordForm').validator().on('submit', this.onSubmitPW)
    } else {
      $('#emailForm').validator().on('submit', this.onSubmitEmail)
    }
  }

  componentDidUpdate() {
    if (this.props.resetSuccess) {
      setTimeout(() => {
        this.props.history.push('/login')
      }, 5000)
    }
  }
  onSubmitPW = (e) => {
    if (!e.isDefaultPrevented()) {
      e.preventDefault()
      this.props.dispatch(resetPW(this.resetToken, this.state.password))
    }
  }

  onSubmitEmail = (e) => {
    if (!e.isDefaultPrevented()) {
      e.preventDefault()
      this.props.dispatch(requestReset(this.state.email, window.location.href))
      this.setState({emailSent: true})
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const {emailSent} = this.state
    return (
      <div class="login-wrapper">
        { this.resetToken ?
          <div class="reset-pane">
            <h1 class="header-text">Reset Password</h1>
              { this.props.resetSuccess &&
                <div class="alert alert-success">
                  Your password has been reset! Now redirecting back to login.
                </div>
              }
              { this.props.error &&
                <div class="alert alert-danger">
                  Unable to reset password: invalid or expired token.
                </div>
              }
            <div class="header-desc">Enter your new password and please confirm it and then we'll update your password.</div>
            <br/>
            <form id="passwordForm" data-toggle="validator">
              <div class="form-group">
                <label for="password" class="control-label">New Password</label>
                <input
                  type="password"
                  name="password"
                  id='password'
                  autoComplete="new-password"
                  onChange={this.onChange}
                  value={this.state.password}
                  data-minlength="6"
                  class="form-control"
                  data-error="A minimum 6 character password is required"
                  required />
                <div class="help-block with-errors"></div>
              </div>

              <div class="form-group">
                <label for="password_confirmation" class="control-label">Confirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  autoComplete="new-password"
                  onChange={this.onChange}
                  value={this.state.password_confirmation}
                  class="form-control"
                  data-minlength="6"
                  data-match="#password"
                  data-error="A minimum 6 character password is required"
                  data-match-error="Whoops, these don't match"
                  required />
                <div class="help-block with-errors"></div>
              </div>

              { this.props.error &&
                  <a href='/reset-password' class="btn btn-lg">Resend Email</a>
              }

              <input class="btn btn-lg btn-primary" type="submit" value="Update Password"/>
            </form>
          </div>
        :
          <div class="reset-pane">
            <h1 class="header-text">Reset Password</h1>
            { emailSent &&
              <div class="alert alert-success">
                We will send reset instructions to the supplied email if it matches one of our users.
              </div>
            }
            { this.props.error &&
              <div class="alert alert-danger">
                Error submitting email. Please try again.
              </div>
            }
            <div class="header-desc">Please enter your email and we will send you instructions on how to reset it.</div>
            <br/>
            <form id="emailForm" data-toggle="validator">
              <div class="form-group">
                <label for="inputEmailAddress" class="control-label">Email Address</label>
                <input type="text" pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" class="form-control" name="email" onChange={this.onChange} value={this.state.email} data-error="A valid email is required" required />
                <div class="help-block with-errors"></div>
              </div>
              <div class="actions">
                <input class="btn btn-lg btn-primary" type="submit" value="Send Reset Instructions"/>
              </div>
            </form>
          </div>
        }
      </div>
    )
  }
}
