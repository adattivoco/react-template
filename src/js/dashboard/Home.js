import React from 'react'

export default class Home extends React.Component {
  render() {
    return (
      <div class='home-wrap'>
        Home for {this.props.user.firstName}
      </div>
    )
  }
}
