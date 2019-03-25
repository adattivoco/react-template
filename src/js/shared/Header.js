import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import {logout} from 'actions/AuthActions'

@connect((store) => {
  return {
    user: store.auth.user,
    token: store.auth.token
  };
})
export default class Header extends React.Component {
  logOut = (e) => {
    this.props.dispatch(logout())
  }
  getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) {
      return 'Good morning'
    } else if (hour >= 12 && hour < 17) {
      return 'Good afternoon'
    } else if (hour >= 17) {
      return 'Good evening'
    }
  }
  showModal = () => {
    var element, arr
    element = document.getElementById('menuModal')
    arr = element.className.split(' ')
    if (arr.indexOf(name) === -1) {
      element.className += ' in'
    }
    element.style.display = 'block'

    element = document.body
    arr = element.className.split(' ')
    if (arr.indexOf(name) === -1) {
      element.className += ' modal-open'
    }
  }

  render() {
    const {user, token} = this.props

    return (
      <div class='header'>
        <div class='header-inner'>
          <div class='logo-col'>
            <a href='/'>
              Adattivo
            </a>
          </div>
          <div class='links-col'>
            <div class='hidden-xs hidden-sm'>
              { token ?
                <Link to={(user.admin === true) ? '/admin' : '/dashboard'} >
                  {this.getGreeting()}, {user.firstName}
                </Link>
              :
                <React.Fragment>
                  <Link to='/explore' class=''>Explore</Link>
                  <a href='/why.html' class="{{#ifpage 'why'}}selected{{/ifpage}}">Why</a>
                  <a href='/how.html' class="{{#ifpage 'how'}}selected{{/ifpage}}">How it Works</a>
                </React.Fragment>
              }
            </div>
          </div>
          <div class='actions-col'>
            { token ?
              <a class='btn btn-default' onClick={this.logOut}>Log&nbsp;out</a>
            :
              <React.Fragment>
                <Link to='/login' class='btn btn-default'>Log In</Link>
                <Link to='/user/signup' class='btn btn-primary'>Sign Up</Link>
              </React.Fragment>
            }
            <div class="menu-icon-span" onClick={this.showModal}>
              <i class="fas fa-bars"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
