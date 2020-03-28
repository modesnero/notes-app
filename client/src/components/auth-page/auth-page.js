import React, { Component } from 'react'
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap'
import ApiService from '../../api-service'
import AuthField from '../auth-field'
const apiService = new ApiService()

export default class AuthPage extends Component {
  state = {
    isLogin: true,
    formValue: { email: '', pass: '', confirm: '' },
    btnTitle: { submitBtn: 'Авторизация', toggleBtn: 'Регистрация' },
    alert: { variant: '', message: '', isShow: false }
  }

  onFieldChange = (event, fieldName) => {
    const {
      formValue: { email, pass, confirm }
    } = this.state

    let formValue
    switch (fieldName) {
      case 'email':
        formValue = { email: event.target.value, pass, confirm }
        break
      case 'pass':
        formValue = { pass: event.target.value, email, confirm }
        break
      case 'confirm':
        formValue = { confirm: event.target.value, email, pass }
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
      } = await apiService.auth('register', { email, password })

      const variant = status === 400 || status === 500 ? 'danger' : 'success'
      this.setState({
        alert: { isShow: true, variant, message }
      })
    } catch (error) {
      console.error(error)
    }
  }

  login = async (email, password) => {
    try {
      const {
        result: { token, message },
        status
      } = await apiService.auth('login', { email, password })

      if (token) this.props.setToken(token)

      if (message) {
        const variant = status === 400 || status === 500 ? 'danger' : 'success'
        this.setState({
          alert: { isShow: true, variant, message }
        })
      }
    } catch (error) {
      console.error(error)
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

  render () {
    const { isLogin, btnTitle, formValue, alert } = this.state

    const confirmView = (
      <AuthField
        type='password'
        field='confirm'
        title='Проверка пароля'
        placeholder='Повторите пароль'
        value={formValue.confirm}
        onFieldChange={this.onFieldChange}
      />
    )

    const alertView = (
      <Alert className='mt-5' variant={alert.variant}>
        {alert.message}
      </Alert>
    )

    return (
      <Container>
        <Row className='justify-content-md-center mt-5'>
          <Col lg='6'>
            <Form onSubmit={this.onSubmit}>
              <h1 className='text-center'>{btnTitle.submitBtn}</h1>

              <AuthField
                type='email'
                field='email'
                title='Email'
                placeholder='Введите email'
                value={formValue.email}
                onFieldChange={this.onFieldChange}
              />

              <AuthField
                type='password'
                field='pass'
                title='Пароль'
                placeholder='Введите пароль'
                value={formValue.pass}
                onFieldChange={this.onFieldChange}
              />

              {!isLogin ? confirmView : null}

              <Button type='submit' variant='primary' className='mb-3' block>
                {btnTitle.submitBtn}
              </Button>

              <Button variant='secondary' onClick={this.toggleStatus} block>
                {btnTitle.toggleBtn}
              </Button>
            </Form>

            {alert.isShow ? alertView : null}
          </Col>
        </Row>
      </Container>
    )
  }
}
