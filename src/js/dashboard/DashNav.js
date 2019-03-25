import React from 'react'
import { Link } from 'react-router-dom'

export default class DashNav extends React.Component {
  tabList = [
    { 'name': 'home', 'url': '/dashboard', icon: 'fas fa-home' },
    { 'name': 'support', 'url': '/dashboard/support', icon: 'fas fa-life-ring' }
  ]
  isCurrent(tabUrl) {
    var path = location.pathname.replace('/dashboard/', '');
    tabUrl = tabUrl.replace('/dashboard/', '');
    return path.indexOf(tabUrl) >= 0;
  }
  render() {
    return(
      <div class='nav-pane'>
        <ul>
          {this.tabList.map((tab, key) => {
            return (
              <li key={key} class={this.isCurrent(tab.url) ? 'current' : ''}>
                <Link to={tab.url} className='btn dash-nav-btn'>
                  <i class={tab.icon}></i>
                  {tab.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
