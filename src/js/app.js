import prototypes from 'shared/prototypes'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Redirect, Router, Switch } from 'react-router-dom'
import AdminLayout from 'admin/AdminLayout'
import DashboardLayout from 'dashboard/DashboardLayout'
import Header from 'shared/Header'
import Footer from 'shared/Footer'
import Explore from 'explore/Explore'
import Login from 'login/Login'
import ResetPassword from 'login/ResetPassword'
import MenuPane from 'shared/MenuPane'
import UserSignup from 'user/signup'
import UserSignupVerify from 'user/signup-verify'
import store from './store'
import history from 'shared/history'

//import Loadable from 'react-loadable'
// const DashboardLayout = Loadable({
//   loader: () => import('dashboard/DashboardLayout'),
//   loading: Loading
// })

import 'sass/app'

render((
  <Provider store={store}>
    <Router history={history}>
      <React.Fragment>
        <MenuPane/>
        <Header/>
        <Switch>
          <Route path='/explore' component={Explore}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/reset-password' component={ResetPassword}/>
          <Route exact path='/user/signup' component={UserSignup}/>
          <Route exact path='/user/signup/verify' component={UserSignupVerify}/>
          <Route path='/dashboard' render={({match}) =>
            store.getState().auth.token ?
              <DashboardLayout match={match}/>
            :
              <Login match={match}/>
          }/>
          <Route path='/admin' render={({match}) =>
            store.getState().auth.token ?
              <AdminLayout match={match} />
            :
              <Login match={match} />
          }/>
        </Switch>
        <Footer/>
      </React.Fragment>
    </Router>
  </Provider>
), document.getElementById('app'))
