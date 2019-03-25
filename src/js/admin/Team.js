import React from 'react'
import {connect} from 'react-redux'
import {getAdmins, removeAdmin, addAdmin} from "actions/UserActions";
import Loading from "shared/Loading";
import LoadingError from "shared/LoadingError";
import {formatDate} from "helpers";

@connect((store) => {
  return {
    users: store.users.users,
    loading: store.users.error,
    error: store.users.error
  };
})
export default class Team extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    showAdd: false
  }

  componentDidMount() {
    this.props.dispatch(getAdmins())
  }

  showAdd = () => {
    this.setState({showAdd: true, firstName: '', lastName: '', email: ''})
  }

  cancelAdd = () => {
    this.setState({showAdd: false, firstName: '', lastName: '', email: ''})
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    if (!e.isDefaultPrevented()) {
      e.preventDefault()
      this.cancelAdd()
      this.props.dispatch(
        addAdmin(this.state.firstName, this.state.lastName, this.state.email)
      )
    }
  }

  removeAdmin(id) {
    this.props.dispatch(removeAdmin(id))
  }

  render() {
    const {showAdd, firstName, lastName, email} = this.state,
          {user, users, loading, error} = this.props

    return (
      <div class="admin-column">
        <div class="admin-header">
          Team
          <button class="btn btn-success btn-sm" onClick={this.showAdd}>
            Add
          </button>
        </div>
        { showAdd ?
          <form id="addAdminForm" role="form" data-toggle="validator" onSubmit={this.onSubmit}>
            { error &&
              <div class='alert alert-danger'>{error.message}</div>
            }
            <div class="form-group">
              <label for="firstName" class="control-label required">First Name</label>
              <input
                type="text"
                class="form-control"
                name="firstName"
                onChange={this.onChange}
                value={firstName}
                data-error="Please enter a first name"
                required />
              <div class="help-block with-errors"></div>
            </div>

            <div class="form-group">
              <label for="lastName" class="control-label required">Last Name</label>
              <input
                type="text"
                class="form-control"
                name="lastName"
                onChange={this.onChange}
                value={lastName}
                data-error="Please enter a last name"
                required />
              <div class="help-block with-errors"></div>
            </div>

            <div class="form-group">
              <label for="email" class="control-label required">Email</label>
              <input
                type="text"
                pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                class="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
                data-error="A valid email address is required"
                required />
              <div class="help-block with-errors"></div>
            </div>

            <div class="save-buttons">
              <button type="submit" class="btn btn-primary">Add Admin</button>
              <input type="button" class="btn" value="Cancel" onClick={this.cancelAdd} />
            </div>
            <hr/>
          </form>
        :
          <React.Fragment>
            <div class="row admin-row-header">
              <div class="col-xs-3">Name</div>
              <div class="col-xs-4">Email</div>
              <div class="col-xs-2"># Signins</div>
              <div class="col-xs-3">Last Signin</div>
            </div>

            { error ?
              <LoadingError />
            : loading || users.length == 0 ?
                <Loading />
              :
                users.map((admin, key) => {
                  return (
                    <div key={key} class="row admin-row">
                      <div class="col-xs-3">{`${admin.firstName} ${admin.lastName}`}</div>
                      <div class="col-xs-4">{admin.email}</div>
                      <div class="col-xs-2">{admin.signInCount}</div>
                      <div class="col-xs-2">{admin.lastSignInAt ? formatDate(admin.lastSignInAt, 'mm/dd/yy hh:MM tt') : "n/a"}</div>
                      <div class="col-xs-1">
                        {users.length > 1 && user.email !== admin.email &&
                          <button class="btn btn-sm btn-primary" onClick={this.removeAdmin.bind(this,admin.id)}>x</button>
                        }
                      </div>
                    </div>
                  )
                })
            }
          </React.Fragment>
        }
      </div>
    )
  }
}
