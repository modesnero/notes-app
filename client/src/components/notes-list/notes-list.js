import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NoteCard from '../note-card'

export default function NotesList (props) {
  const { notes, deleteNote } = props

  const filter = (searchValue, title, subTitle, text) => {
    return (
      searchValue === '' ||
      title.indexOf(searchValue) ||
      subTitle.indexOf(searchValue) ||
      text.indexOf(searchValue)
    )
  }

  const items = notes.map(note => {
    const { searchValue, title, subTitle, text, id } = note
    const filterResult = filter(searchValue, title, subTitle, text)

    const item = (
      <NoteCard
        deleteNote={deleteNote}
        title={title}
        subTitle={subTitle}
        text={text}
        key={id}
        id={id}
      />
    )

    return filterResult ? item : null
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
