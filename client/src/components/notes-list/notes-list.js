import React from 'react'
import { Row, Col } from 'react-bootstrap'
import NoteCard from '../note-card'

export default function NotesList ({ notes, deleteNote, searchValue }) {
  const filter = (title, subTitle, text) => {
    searchValue = searchValue.toLowerCase()
    return (
      searchValue === '' ||
      title.toLowerCase().includes(searchValue) ||
      subTitle.toLowerCase().includes(searchValue) ||
      text.toLowerCase().includes(searchValue)
    )
  }

  const items = notes.map(note => {
    const { title, subTitle, text, id } = note

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

    return filter(title, subTitle, text) ? item : null
  })

  return (
    <>
      <Row>
        <Col>{items}</Col>
      </Row>
    </>
  )
}
