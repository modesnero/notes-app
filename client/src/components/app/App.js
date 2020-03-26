import React, { Component } from 'react'
import AuthPage from '../auth-page'

export default class App extends Component {
  state = {
    token: ''
  }

  setToken = token => this.setState({ token })

  render () {
    const { token } = this.state
    if (!token) return <AuthPage setToken={this.setToken} />
    else return <h1>{token}</h1>
  }
}
