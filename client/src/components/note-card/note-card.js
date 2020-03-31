import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function NoteCard ({ id, title, color, text, deleteNote }) {
  return (
    <>
      <Card className='mb-4' bg={color}>
        <Card.Header>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>date</Card.Subtitle>
        </Card.Header>

        <Card.Body>
          <Card.Text>{text}</Card.Text>
        </Card.Body>

        <Card.Footer>
          <Button variant='light' size='sm' className="mr-3">
            Редактировать
          </Button>
          <Button variant='light' size='sm' onClick={() => deleteNote(id)}>
            Удалить
          </Button>
        </Card.Footer>
      </Card>
    </>
  )
}
