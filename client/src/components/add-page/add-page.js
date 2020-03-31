import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

import FormInput from '../form-input'
import ColorChoose from '../color-choose'
import FormTextarea from '../form-textarea'

export default class AddPage extends Component {
  state = {
    id: 0,
    title: '',
    text: '',
    date: null,
    color: ''
  }

  onFieldChange = (event, fieldName) => {
    if (fieldName === 'title') {
      this.setState({ title: event.target.value })
    } else if (fieldName === 'text') {
      this.setState({ text: event.target.value })
    }
  }

  colorChange = color => this.setState({ color })

  submit = event => {
    event.preventDefault()
    const { addNote, setPage } = this.props

    this.setState({ date: new Date(), id: Number(localStorage.lastId) + 1 })
    const { id, title, text, date, color } = this.state
    const note = { id, title, text, date, color }

    addNote(note)
    setPage('home')
  }

  render () {
    const { title, text, color } = this.state

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
