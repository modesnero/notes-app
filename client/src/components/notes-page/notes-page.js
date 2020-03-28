import React, { Component } from 'react'
import Header from '../header'
import NoteCard from '../note-card'

export default class NotesPage extends Component {
  render () {
    const { token, setToken } = this.props
    return (
      <>
        <Header setToken={setToken} />
      </>
    )
  }
}
