import React from 'react'
import { Row, Col } from 'react-bootstrap'

import NoteCard from '../note-card'

export default function NotesList ({ notes, deleteNote, searchValue }) {
  const filter = (title, text) => {
    searchValue = searchValue.toLowerCase()
    return (
      searchValue === '' ||
      title.toLowerCase().includes(searchValue) ||
      text.toLowerCase().includes(searchValue)
    )
  }

  const items = notes.map(note => {
    const {
      _id: id,
      note: { title, text, color, date }
    } = note

    const item = (
      <NoteCard
        deleteNote={deleteNote}
        title={title}
        color={color}
        date={date}
        text={text}
        key={id}
        id={id}
      />
    )

    return filter(title, text) ? item : null
  })

  return (
    <>
      <Row>
        <Col>{items}</Col>
      </Row>
    </>
  )
}
