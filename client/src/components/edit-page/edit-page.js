import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

import ApiService from '../../services/api-service'
import FormInput from '../form-input'
import ColorChoose from '../color-choose'
import FormTextarea from '../form-textarea'

export default class EditPage extends Component {
  constructor ({ editNote }) {
    super()
    const { title, text, date, color } = editNote.note
    this.state = { title, text, date, color }
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

    const { editNote, token, loadNotes, setPage, setAlert } = this.props
    const { _id, email } = editNote
    const updatedNote = { _id, email, note: this.state }

    setPage('home')
    await loadNotes(this.apiService.updateNote, token, _id, updatedNote)
    setAlert(true, 'Заметка была отредактирована', 'info')
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
                Сохранить
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}
