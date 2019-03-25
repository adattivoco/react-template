import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import DashNav from 'dashboard/DashNav'
import Home from 'dashboard/Home'
import Support from 'dashboard/Support'

@connect((store) => {
  return {
    token: store.auth.token,
    user: store.auth.user
  }
})
export default class DashboardLayout extends React.Component {
  constructor(props) {
    super(props)
    this.checkFlow()
  }
  checkFlow = () => {
    if (!this.props.token || !this.props.user) {
      this.props.history.push('/login')
    } else if (this.props.user.type === 'admin') {
      this.props.history.push('/admin')
    }
  }
  render() {
    const {user, token} = this.props
    return (
      <div class='dashboard-wrap'>
        <DashNav />

        <div class='dashboard-main'>
          <Switch>
            <Route
              exact
              path='/dashboard'
              render={(props) => <Home {...props} user={user} />}
            />
            <Route
              exact
              path='/dashboard/support'
              render={(props) => <Support {...props} user={user} />}
            />
            <Redirect to='/dashboard' />
          </Switch>
        </div>
      </div>
    )
  }
}
