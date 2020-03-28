import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NoteCard from '../note-card'

export default function NotesList (props) {
  const { notes, deleteNote } = props

  const items = notes.map(note => {
    const { title, subTitle, text, id } = note
    return (
      <NoteCard
        deleteNote={deleteNote}
        title={title}
        subTitle={subTitle}
        text={text}
        key={id}
        id={id}
      />
    )
  })

  return (
    <>
      <Container>
        <Row>
          <Col>{items}</Col>
        </Row>
      </Container>
    </>
  )
}
