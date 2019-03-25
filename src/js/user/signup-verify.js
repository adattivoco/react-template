import React from 'react'
import { connect } from "react-redux"
import { verifyEmail, verifyResend } from 'actions/AuthActions'

@connect((store) => {
  return {
    error: store.auth.error,
    user: store.auth.user,
    token: store.auth.token
  };
})
export default class SignupVerify extends React.Component {
  state = {
    code: ''
  }
  componentDidMount(){
    if (!this.props.user || this.props.user.status != 'pending') {
      this.props.history.push('/user/signup')
    }
    $('#signupVerifyForm').validator().on('submit', this.onSubmit)
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

  onResend = (e) => {
    this.props.dispatch(verifyResend(this.props.user.id))
    this.setState({code: ''})
  }

  onSubmit = (e) => {
    if (!e.isDefaultPrevented()) {
      e.preventDefault()
      this.props.dispatch(verifyEmail(this.props.user.id, this.state.code))
    }
  }

  render() {
    const {code} = this.state
    const {error} = this.props

    return (
      <div class='signup-wrap'>
        <h1>Almost there! A verification code has been sent to your inbox</h1>

        { error &&
          <div class='alert alert-danger'>{error}</div>
        }

        <form id='signupVerifyForm' data-toggle="validator" role="form">
          <div class='form-pane'>
            <div class={'form-group' + (error ? ' has-error' : '')}>
              <label for='code' class='control-label'>Enter Code</label>
              <input
                type='text'
                maxLength="6"
                data-minlength="6"
                id='code'
                name='code'
                class='form-control'
                value={code}
                onChange={this.onChange}
                required />
              <div class='help-block with-errors'></div>
            </div>
          </div>

          { error &&
            <button class='btn btn-lg' type='button' onClick={this.onResend}>Resend Code</button>
          }

          <button class='btn btn-primary btn-lg' type='submit'>Verify Email</button>
        </form>
      </div>
    )
  }
}
