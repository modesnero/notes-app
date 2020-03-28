import React from 'react'
import { Card } from 'react-bootstrap'

export default function NoteCard (props) {
  const { id, title, subTitle, text, deleteNote } = props
  return (
    <>
      <Card className='mb-4'>
        <Card.Header>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>{subTitle}</Card.Subtitle>
        </Card.Header>

        <Card.Body>
          <Card.Text>{text}</Card.Text>
        </Card.Body>

        <Card.Footer>
          <Card.Link href='#'>Редактировать</Card.Link>
          <Card.Link onClick={() => deleteNote(id)} href='#'>
            Удалить
          </Card.Link>
        </Card.Footer>
      </Card>
    </>
  )
}
