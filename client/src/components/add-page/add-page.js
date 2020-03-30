import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import FormInput from '../form-input'
import FormTextarea from '../form-textarea'

export default class AddPage extends Component {
  state = {
    formValue: {
      title: '',
      subTitle: '',
      text: ''
    }
  }

  onFieldChange = (event, fieldName) => {
    const {
      formValue: { title, subTitle, text }
    } = this.state

    let formValue
    const newValue = event.target.value
    switch (fieldName) {
      case 'title':
        formValue = { title: newValue, subTitle, text }
        break
      case 'subTitle':
        formValue = { subTitle: newValue, title, text }
        break
      case 'text':
        formValue = { text: newValue, title, subTitle }
        break
      default:
        console.error('Unexpected field name')
    }

    this.setState({ formValue })
  }

  submit = event => {
    event.preventDefault()
    const { addNote } = this.props
    const { formValue: note } = this.state
    const id = Number(localStorage.lastId) + 1
    note.id = id
    addNote(note)
  }

  render () {
    const { title, subTitle, text } = this.state.formValue
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
              <FormInput
                type='text'
                field='subTitle'
                title='Подзаголовок'
                placeholder='Введите подзаголовок'
                value={subTitle}
                onFieldChange={this.onFieldChange}
                mutedText='* Необязательное поле'
              />
              <FormTextarea
                field='text'
                rows='5'
                title='Текст заметки'
                placeholder='Введите текст заметки'
                value={text}
                onFieldChange={this.onFieldChange}
              />
              
              {/* <Button variant='primary'>Primary</Button>{' '}
              <Button variant='secondary'>Secondary</Button>{' '}
              <Button variant='success'>Success</Button>{' '}
              <Button variant='warning'>Warning</Button>{' '}
              <Button variant='danger'>Danger</Button>{' '}
              <Button variant='info'>Info</Button>{' '} */}

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
