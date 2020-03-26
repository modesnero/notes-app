import React, { Component } from 'react'
import Auth from '../auth'

export default class App extends Component {

  state = {
    isAuth: false
  }

  render () {
    const {isAuth} = this.state
    if (!isAuth) return <Auth />
  }
}
