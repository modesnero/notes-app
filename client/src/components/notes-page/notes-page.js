import React, { Component } from 'react'

export default class NotesPage extends Component {
  render () {
    const { token } = this.props
    return (
      <>
        <h1>Notes Page</h1>
        <p>{token}</p>
      </>
    )
  }
}
