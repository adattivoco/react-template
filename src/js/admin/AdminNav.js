import React from 'react'
import { Link } from 'react-router-dom'

export default class AdminNav extends React.Component {
  render() {
    const tabList = [
      { name: 'home', url: '/admin' },
      { name: 'admins', url: '/admin/team' }
    ]
    return (
      <div class="nav-pane">
        <ul>
          { tabList.map((tab, key) => (
            <li key={key} class={tab.url === location.pathname ? 'current' : null}>
              <Link to={tab.url} className="btn dash-nav-btn">
                {tab.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
