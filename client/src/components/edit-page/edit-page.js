import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

import ApiService from '../../services/api-service'
import FormInput from '../form-input'
import ColorChoose from '../color-choose'
import FormTextarea from '../form-textarea'

export default class EditPage extends Component {
  constructor ({ title, text, color }) {
    super()
    this.state = { title, text, color }
  }

  apiService = new ApiService()

  onFieldChange = (event, fieldName) => {
    if (fieldName === 'title') {
      this.setState({ title: event.target.value })
    } else if (fieldName === 'text') {
      this.setState({ text: event.target.value })
    }
  }

  colorChange = color => this.setState({ color })

  submit = async event => {
    event.preventDefault()
  }

  render () {
    return (
      <>
        <Row>
          <Col>
            <Form onSubmit={this.submit}>
              <FormInput
                type='text'
                field='title'
                title='Название'
                placeholder='Введите название'
                value={title}
                onFieldChange={this.onFieldChange}
              />
              <FormTextarea
                field='text'
                rows='5'
                title='Текст заметки'
                placeholder='Введите текст заметки'
                value={text}
                onFieldChange={this.onFieldChange}
              />

              <ColorChoose colorChange={this.colorChange} active={color} />

              <Button type='submit' variant='primary' block>
                Добавить заметку
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}
