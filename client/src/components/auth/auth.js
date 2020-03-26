import React, { Component } from 'react'
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap'
import ApiService from '../../api-service'
const apiService = new ApiService()

function AuthField (props) {
  const { onFieldChange, type, field, title, value, placeholder } = this.props
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={event => onFieldChange(event, field)}
      />
    </Form.Group>
  )
}

export default class Auth extends Component {
  state = {
    token: '',
    isLogin: true,
    formData: { email: '', pass: '', confirm: '' },
    btnTitle: { submitBtn: 'Авторизация', toggleBtn: 'Регистрация' },
    alert: { variant: '', message: '', isShow: false }
  }

  onFieldChange = (event, fieldName) => {
    const {
      formData: { email, pass, confirm }
    } = this.state

    let formData
    switch (fieldName) {
      case 'email':
        formData = { email: event.target.value, pass, confirm }
        break
      case 'pass':
        formData = { pass: event.target.value, email, confirm }
        break
      case 'confirm':
        formData = { confirm: event.target.value, email, pass }
        break
    }

    this.setState({ formData })
  }

  toggleStatus = () => {
    this.setState(({ isLogin }) => ({ isLogin: !isLogin }))
    this.setState(({ btnTitle }) => {
      return {
        btnTitle: {
          submitBtn: btnTitle.toggleBtn,
          toggleBtn: btnTitle.submitBtn
        }
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

    isLogin ? this.login(email, pass) : this.register(email, pass, confirm)
  }

  render () {
    const { isLogin, btnTitle, formData, alert } = this.state

    const confirmView = (
      <AuthField
        type='password'
        field='confirm'
        title='Проверка пароля'
        placeholder='Повторите пароль'
        value={formData.confirm}
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

              <Form.Group>
                <Form.Label>Email адрес</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Введите email'
                  value={formData.email}
                  onChange={event => this.onFieldChange(event, 'email')}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Введите пароль'
                  value={formData.pass}
                  onChange={event => this.onFieldChange(event, 'pass')}
                />
              </Form.Group>

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
