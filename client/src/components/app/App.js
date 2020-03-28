import React, { Component } from 'react'
import AuthPage from '../auth-page'
import NotesPage from '../notes-page'

export default class App extends Component {
  constructor () {
    super()
    const { token: savedToken } = localStorage

    this.state = {
      token: savedToken ? savedToken : ''
    }
  }

  setToken = token => this.setState({ token })

  render () {
    const { token } = this.state
    const authPage = <AuthPage setToken={this.setToken} />
    const notesPage = <NotesPage token={token} />

    return <>{!token ? authPage : notesPage}</>
  }
}
