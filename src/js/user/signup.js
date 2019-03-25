import React from 'react'
import { connect } from "react-redux"
import { signup } from 'actions/AuthActions'

@connect((store) => {
  return {
    error: store.auth.error,
    token: store.auth.token,
    user: store.auth.user
  }
})
export default class Signup extends React.Component {
  state = {
    user: {
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      state: '',
      phone: '',
      password: '',
      month: 1,
      day: 1,
      year: 1980
    },
    ageAlert: false
  }

  componentDidMount(){
    $('#signupForm').validator().on('submit', this.onSubmit)
  }

  componentDidUpdate(prevProps) {
    const {user,token} = this.props
    if (user && !token) {
      this.props.history.push('/user/signup/verify')
    }
  }

  onChange = (e) => {
    const {user} = this.state;
    user[e.target.name] = e.target.value
    this.setState({ user })
  }

  notOldEnough = (user) => {
    const birthdate = new Date(user.year, parseInt(user.month)-1, parseInt(user.day))
    var diff_ms = Date.now() - birthdate.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970) < 18;
  }

  onSubmit = (e) => {
    if (!e.isDefaultPrevented()) {
      e.preventDefault()
      const notOldEnough = this.notOldEnough(this.state.user)
      if (!notOldEnough) {
        this.setState({ ageAlert: notOldEnough})
        this.props.dispatch(signup(this.state.user))
      } else {
        this.setState({ ageAlert: notOldEnough})
      }
    }
  }

  render() {
    const {user, ageAlert, signupFailed} = this.state
    const {error} = this.props

    return (
      <div class='signup-wrap'>
        <h1>Sign up with your email address</h1>
        { error &&
          <div class='alert alert-danger'>{error}</div>
        }

        <form id='signupForm' data-toggle="validator" role="form">
          <div class='form-pane'>
            <div class='form-group'>
              <label for='firstName' class='control-label'>First Name</label>
              <input
                type='text'
                name='firstName'
                class='form-control'
                value={user.firstName}
                onChange={this.onChange}
                required />
              <div class='help-block with-errors'></div>
            </div>

            <div class='form-group'>
              <label for='lastName' class='control-label'>Last Name</label>
              <input
                type='text'
                name='lastName'
                class='form-control'
                value={user.lastName}
                onChange={this.onChange}
                required />
              <div class='help-block with-errors'></div>
            </div>
            <div class={'form-group' + ((error && error.indexOf('email') >= 0)?' has-error':'')}>
              <label for='email' class='control-label'>Email Address</label>
              <input
                type='text'
                name='email'
                id='email'
                pattern='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
                class='form-control'
                value={user.email}
                onChange={this.onChange}
                required />
              <div class='help-block with-errors'></div>
            </div>

            <div class='form-group'>
              <label for='password' class='control-label'>Password</label>
              <input
                type='password'
                name='password'
                class='form-control'
                onChange={this.onChange}
                value={user.password}
                data-minlength='6'
                autoComplete='off'
                required />
                <div class='help-block with-errors'></div>
            </div>

            <div class='form-group'>
              <label for='city' class='control-label'>City</label>
              <input
                type='text'
                name='city'
                class='form-control'
                value={user.city}
                onChange={this.onChange}
                required />
              <div class='help-block with-errors'></div>
            </div>

            <div class='form-group'>
              <label for='state' class='control-label'>State</label>
              <input
                type='text'
                name='state'
                class='form-control'
                value={user.state}
                onChange={this.onChange}
                required />
              <div class='help-block with-errors'></div>
            </div>

            <div class='form-group'>
              <label for='phone' class='control-label'>Phone</label>
              <input
                type='text'
                name='phone'
                class='form-control'
                value={user.phone}
                onChange={this.onChange}
                required />
              <div class='help-block with-errors'></div>
            </div>
          </div>
          <h3>Oops, it looks like you are not older than 18.</h3>
          { ageAlert &&
            <div class='alert alert-danger'>hold on...you are too young!</div>
          }
          <div class='form-pane thirds'>
            <div class='form-group'>
              <label for='month' class='control-label'>Month</label>
              <input
                type='number'
                min='1'
                max='12'
                name='month'
                class='form-control'
                value={user.month}
                onChange={this.onChange}
                required />
              <div class='help-block with-errors'></div>
            </div>

            <div class='form-group'>
              <label for='day' class='control-label'>Day</label>
              <input
                type='number'
                min='1'
                max='31'
                name='day'
                class='form-control'
                value={user.day}
                onChange={this.onChange}
                required />
              <div class='help-block with-errors'></div>
            </div>

            <div class='form-group'>
              <label for='year' class='control-label'>Year</label>
              <input
                type='number'
                max='2019'
                name='year'
                class='form-control'
                value={user.year}
                onChange={this.onChange}
                required />
              <div class='help-block with-errors'></div>
            </div>
          </div>

          <div class="checkbox">
            <label>
              <input name="agree" type="checkbox" required/> I agree to the Adattivo <a href='/terms.html' target='blank'>terms and conditions</a> and <a href='/privacy.html' target='blank'>privacy policy</a>.
            </label>
          </div>

          <button class='btn btn-primary btn-lg' type='submit'>Create Account</button>
        </form>
      </div>
    )
  }
}
