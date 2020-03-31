import React, { Component } from 'react'
import { Alert as AlertBootstrap } from 'react-bootstrap'

export default class Alert extends Component {
  state = {
    progress: 100
  }

  componentDidMount = () => {
    const { timeout, setShowAlert } = this.props
    setTimeout(() => setShowAlert(false), timeout)
  }

  render () {
    const { variant, message } = this.props
    const { progress } = this.state
    return (
      <AlertBootstrap className='mt-5' variant={variant}>
        <p>{message}</p>
      </AlertBootstrap>
    )
  }
}
