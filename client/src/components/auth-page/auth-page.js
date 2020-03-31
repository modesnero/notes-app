import React, { Component } from 'react'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'

import ApiService from '../../api-service'
import FormInput from '../form-input'
import Alert from '../alert'

export default class AuthPage extends Component {
  state = {
    isLogin: true,
    formValue: { email: '', pass: '', confirm: '' },
    btnTitle: { submitBtn: 'Авторизация', toggleBtn: 'Регистрация' },
    alert: { variant: '', message: '', isShow: false }
  }

  apiService = new ApiService()

  onFieldChange = (event, fieldName) => {
    const { email, pass, confirm } = this.state.formValue

    let formValue
    const newValue = event.target.value
    switch (fieldName) {
      case 'email':
        formValue = { email: newValue, pass, confirm }
        break
      case 'pass':
        formValue = { pass: newValue, email, confirm }
        break
      case 'confirm':
        formValue = { confirm: newValue, email, pass }
        break
      default:
        console.error('Unexpected field name')
    }

    this.setState({ formValue })
  }

  toggleStatus = () => {
    this.setState(({ btnTitle, isLogin }) => {
      const { toggleBtn, submitBtn } = btnTitle
      return {
        btnTitle: { submitBtn: toggleBtn, toggleBtn: submitBtn },
        alert: { variant: '', message: '', isShow: false },
        isLogin: !isLogin
      }
    })
  }

  register = async (email, password, confirm) => {
    if (password !== confirm) {
      const message = 'Пароли не совпадают, повторите попытку'
      return this.setState({
        alert: { isShow: true, variant: 'danger', message }
      })
    }

    try {
      const {
        result: { message },
        status
      } = await this.apiService.auth('register', { email, password })

      const variant = status === 400 || status === 500 ? 'danger' : 'success'
      this.setState({ alert: { isShow: true, variant, message } })
    } catch (err) {
      console.error(err)
    }
  }

  login = async (email, password) => {
    try {
      const {
        result: { token, message },
        status
      } = await this.apiService.auth('login', { email, password })

      if (token) this.props.setToken(token)

      if (message) {
        const variant = status === 400 || status === 500 ? 'danger' : 'success'
        this.setState({ alert: { isShow: true, variant, message } })
      }
    } catch (err) {
      console.error(err)
    }
  }

  onSubmit = async event => {
    event.preventDefault()
    const {
      isLogin,
      formValue: { email, pass, confirm }
    } = this.state

    this.setState({
      formValue: { email: '', pass: '', confirm: '' },
      alert: { variant: '', message: '', isShow: false }
    })

    isLogin ? this.login(email, pass) : this.register(email, pass, confirm)
  }

  setShowAlert = isShow => {
    this.setState(({ alert }) => {
      const { variant, message } = alert
      return { alert: { variant, message, isShow } }
    })
  }

  render () {
    const { isLogin, btnTitle, formValue, alert } = this.state

    return (
      <Container>
        <Row className='justify-content-md-center mt-5'>
          <Col lg='6'>
            <Form onSubmit={this.onSubmit}>
              <h1 className='text-center'>{btnTitle.submitBtn}</h1>

              <FormInput
                type='email'
                field='email'
                title='Email'
                placeholder='Введите email'
                value={formValue.email}
                onFieldChange={this.onFieldChange}
              />

              <FormInput
                type='password'
                field='pass'
                title='Пароль'
                placeholder='Введите пароль'
                value={formValue.pass}
                onFieldChange={this.onFieldChange}
              />

              {!isLogin ? (
                <FormInput
                  type='password'
                  field='confirm'
                  title='Проверка пароля'
                  placeholder='Повторите пароль'
                  value={formValue.confirm}
                  onFieldChange={this.onFieldChange}
                />
              ) : null}

              <Button type='submit' variant='primary' className='mb-3' block>
                {btnTitle.submitBtn}
              </Button>

              <Button variant='secondary' onClick={this.toggleStatus} block>
                {btnTitle.toggleBtn}
              </Button>
            </Form>

            {alert.isShow ? (
              <Alert
                setShowAlert={this.setShowAlert}
                variant={alert.variant}
                message={alert.message}
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    )
  }
}
