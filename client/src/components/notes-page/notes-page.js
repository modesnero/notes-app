import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

import Header from '../header'
import NotesList from '../notes-list'
import SearchView from '../search-view'
import AddPage from '../add-page'
import Alert from '../alert'

// Mock notes data
const getItem = id => {
  return {
    id,
    title: 'Название' + id,
    color: 'secondary',
    date: new Date(),
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
          repudiandae recusandae debitis eaque illum aut totam quos impedit
          suscipit voluptatum error, aspernatur praesentium laborum corporis!
          Quis minus nobis aut aliquid accusamus ex eum ratione. Unde non
          obcaecati deleniti officia. Soluta animi minima adipisci tempora vel
          corrupti, itaque obcaecati aperiam eaque modi dolore explicabo at,
          hic quaerat eligendi aliquam amet architecto maxime ullam quas sit?
          Id, laboriosam soluta nemo, necessitatibus et atque aliquam fugiat`
  }
}

const getData = num => {
  let data = []
  for (let i = 0; i < num; i++) {
    data.push(getItem(i))
    localStorage.lastId = i
  }
  return data
}

export default class NotesPage extends Component {
  state = {
    page: localStorage.page ? localStorage.page : 'home',
    notes: [],
    searchValue: '',
    alertShow: false
  }

  componentDidMount = () => this.setState({ notes: getData(3) })

  setSearchValue = searchValue => this.setState({ searchValue })

  setShowAlert = alertShow => this.setState({ alertShow })

  deleteNote = deleteId => {
    this.setState(({ notes }) => {
      const newNotes = notes.filter(el => (el.id !== deleteId ? el : null))
      return { notes: newNotes }
    })
  }

  addNote = note => {
    this.setState(({ notes }) => {
      const newNotes = notes.slice()
      newNotes.push(note)
      return { notes: newNotes }
    })
    this.setShowAlert(true)
  }

  setPage = page => {
    this.setState({ page })
    localStorage.page = page
  }

  render () {
    const { setToken } = this.props
    const { notes, page, searchValue, alertShow } = this.state
    return (
      <>
        <Header
          setToken={setToken}
          setSearchValue={this.setSearchValue}
          setPage={this.setPage}
        />

        <Container>
          {searchValue ? (
            <SearchView
              searchValue={searchValue}
              setSearchValue={this.setSearchValue}
            />
          ) : null}

          {alertShow ? (
            <Alert
              message='Заметка успешно добавлена'
              variant={'success'}
              timeout={5000}
              setShowAlert={this.setShowAlert}
            />
          ) : null}

          {page === 'home' ? (
            <NotesList
              notes={notes}
              deleteNote={this.deleteNote}
              searchValue={searchValue}
            />
          ) : null}

          {page === 'add' ? (
            <AddPage addNote={this.addNote} setPage={this.setPage} />
          ) : null}
        </Container>
      </>
    )
  }
}
