import React from 'react'

export default class MenuPane extends React.Component {
  hideModal = () => {
    var element = document.getElementById('menuModal')
    element.className = element.className.replace(/\b in\b/g, '')
    element.style.display = 'none'
    document.body.className = document.body.className.replace(/\b modal-open\b/g, '')
  }
  render() {
    return (
      <div class='modal menu-modal fade right' id='menuModal' role='dialog'>
        <div class='modal-dialog modal-full' role='document'>
          <div class='modal-content'>
            <div class='modal-body'>
              <div class='menu-logo'>
                <a href='/'>
                  <img src='/' alt='Adattivo' />
                </a>
                <button type="button" class="close" onClick={this.hideModal} aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div class='menu-items'>
                <ul>
                  <li class='menu-item'>
                    <a href='/'>Home</a>
                  </li>
                  <li class='menu-item'>
                    <a href='/explore'>Explore</a>
                  </li>
                  <li class='menu-item'>
                    <a href='/why.html'>Why</a>
                  </li>
                  <li class='menu-item'>
                    <a href='/how.html'>How it Works</a>
                  </li>
                  <li class='menu-item'>
                    <a href='/contact.html'>Contact</a>
                  </li>
                  <li class='menu-item'>
                    <a href='/login'>Log In</a>
                  </li>
                  <li class='menu-item'>
                    <a href='/user/signup'>Sign Up</a>
                  </li>
                </ul>
              </div>

              <div class='menu-footer'>
                <div class='social-icons'>
                  <a href='/blog' target='_blank'><i class='fab fa-wordpress'></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
