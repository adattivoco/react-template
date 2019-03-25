import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import AdminNav from 'admin/AdminNav'
import AdminMain from 'admin/Main'
import AdminTeam from 'admin/Team'

@connect((store) => {
  return {
    token: store.auth.token,
    user: store.auth.user
  }
})
export default class AdminLayout extends React.Component {
  constructor(props) {
    super(props)
    this.checkFlow()
  }
  checkFlow = () => {
    if (!this.props.token || !this.props.user) {
      this.props.history.push('/login')
    } else if (this.props.user.type !== 'admin') {
      this.props.history.push('/dashboard')
    }
  }
  render() {
    const {user, token} = this.props
    return (
      <div class='admin-wrap'>
        <AdminNav />

        <div class='admin-main'>
          <Switch>
            <Route
              exact
              path='/admin'
              render={(props) => <AdminMain {...props} user={user} />}
            />
            <Route
              exact
              path='/admin/team'
              render={(props) => <AdminTeam {...props} user={user} />}
            />
            <Redirect to='/admin' />
          </Switch>
        </div>
      </div>
    )
  }
}
