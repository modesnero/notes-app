import React, { Component } from 'react'
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap'
import ApiService from '../../api-service'
const apiService = new ApiService()

export default class Auth extends Component {
  state = {
    token: '',
    isLogin: true,
    formData: { email: '', pass: '', confirm: '' },
    btnTitle: { submitBtn: 'Авторизация', toggleBtn: 'Регистрация' },
    validationFail: { email: false, pass: false, confirm: false },
    errorMsg: { email: '', pass: '', confirm: '' },
    alert: { variant: '', message: '', isShow: false }
  }

  onEmailChange = event => {
    const {
      formData: { pass, confirm }
    } = this.state

    this.setState({
      formData: { email: event.target.value, pass, confirm }
    })
  }

  onPassChange = event => {
    const {
      formData: { email, confirm }
    } = this.state

    this.setState({
      formData: { pass: event.target.value, email, confirm }
    })
  }

  onConfirmChange = event => {
    const {
      formData: { email, pass }
    } = this.state

    this.setState({
      formData: { confirm: event.target.value, email, pass }
    })
  }

  toggleStatus = () => {
    this.setState(({ isLogin }) => ({ isLogin: !isLogin }))

    this.setState(({ btnTitle }) => {
      const submitBtn = btnTitle.toggleBtn
      const toggleBtn = btnTitle.submitBtn

      return { btnTitle: { submitBtn, toggleBtn } }
    })
  }

  register = async (email, password, confirm) => {
    if (password !== confirm) {
      this.setState({
        validationFail: { email: false, pass: true, confirm: true },
        errorMsg: {
          email: '',
          pass: 'Пароли не совпадают, повторите попытку',
          confirm: 'Пароли не совпадают, повторите попытку'
        }
      })
      return 'Passwords is not equals'
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

      if (token) {
        this.setState({ token })
        alert('успешная авторизация')
      }

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
      formData: { email, pass, confirm }
    } = this.state

    this.setState({
      formData: { email: '', pass: '', confirm: '' },
      validationFail: { email: false, pass: false, confirm: false },
      errorMsg: { email: '', pass: '', confirm: '' },
      alert: { variant: '', message: '', isShow: false }
    })

    const result = (await isLogin)
      ? this.login(email, pass)
      : this.register(email, pass, confirm)
  }

  render () {
    const {
      errorMsg,
      validationFail,
      isLogin,
      btnTitle,
      formData,
      alert
    } = this.state

    const confirmView = (
      <Form.Group>
        <Form.Label>Подтверждение пароля</Form.Label>
        <Form.Control
          type='password'
          placeholder='Подтвердите пароль'
          value={formData.confirm}
          isInvalid={validationFail.confirm}
          onChange={this.onConfirmChange}
        />
        <Form.Control.Feedback type='invalid'>
          {errorMsg.confirm}
        </Form.Control.Feedback>
      </Form.Group>
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
              <h1 className='text-center'>Авторизация</h1>

              <Form.Group>
                <Form.Label>Email адрес</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Введите email'
                  value={formData.email}
                  isInvalid={validationFail.email}
                  onChange={this.onEmailChange}
                />
                <Form.Control.Feedback type='invalid'>
                  {errorMsg.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Введите пароль'
                  value={formData.pass}
                  isInvalid={validationFail.pass}
                  onChange={this.onPassChange}
                />
                <Form.Control.Feedback type='invalid'>
                  {errorMsg.pass}
                </Form.Control.Feedback>
              </Form.Group>

              {!isLogin ? confirmView : null}

              <Button type='submit' variant='primary' className='mr-3'>
                {btnTitle.submitBtn}
              </Button>

              <Button
                variant='secondary'
                className='mx-auto'
                onClick={this.toggleStatus}
              >
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
