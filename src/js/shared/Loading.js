import React from 'react'

export default class Loading extends React.Component {
  render() {
    const {short} = this.props
    return (
      <div class={'loading-pane' + (short ? " short":"")}>
        <img src='/img/loading.gif'/>
      </div>
    )
  }
}
