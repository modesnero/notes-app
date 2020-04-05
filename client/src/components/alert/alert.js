import React, { Component } from 'react'
import { Alert as AlertBootstrap } from 'react-bootstrap'

export default class Alert extends Component {
  componentDidMount = () => {
    const { timeout, setAlert } = this.props
    setTimeout(() => setAlert(false, '', ''), timeout)
  }

  render () {
    const { variant, message } = this.props
    return (
      <AlertBootstrap className='mt-5' variant={variant}>
        <p className='text-center mb-0'>{message}</p>
      </AlertBootstrap>
    )
  }
}
