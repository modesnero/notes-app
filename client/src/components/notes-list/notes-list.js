import React from 'react'
import { Row, Col } from 'react-bootstrap'
import NoteCard from '../note-card'

export default function NotesList (props) {
  const { notes, deleteNote } = props

  let { searchValue } = props
  searchValue = searchValue.toLowerCase()

  const filter = (title, subTitle, text) => {
    console.log(title, searchValue)
    const filterResult =
      searchValue === '' ||
      title.toLowerCase().includes(searchValue) ||
      subTitle.toLowerCase().includes(searchValue) ||
      text.toLowerCase().includes(searchValue)
    return filterResult
  }

  const items = notes.map(note => {
    const { title, subTitle, text, id } = note
    const filterResult = filter(title, subTitle, text)
    console.log(filterResult)

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
      <Row>
        <Col>{items}</Col>
      </Row>
    </>
  )
}
