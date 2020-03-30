import React, { Component } from 'react'
import Header from '../header'
import NotesList from '../notes-list'
import SearchView from '../search-view'
import AddPage from '../add-page'
import { Container } from 'react-bootstrap'

// Mock notes data
const getItem = id => {
  return {
    id,
    title: 'Название' + id,
    subTitle: 'Подзаголовок' + id,
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
  }
  return data
}

export default class NotesPage extends Component {
  constructor () {
    super()
    const notes = getData(3)
    this.state = {
      notes,
      searchValue: '',
      page: 'home'
    }
  }

  deleteNote = deleteId => {
    this.setState(({ notes }) => {
      const newNotes = notes.filter(el => (el.id !== deleteId ? el : null))
      return { notes: newNotes }
    })
  }

  setSearchValue = searchValue => this.setState({ searchValue })

  setPage = page => this.setState({ page })

  render () {
    const { setToken } = this.props
    const { notes, page, searchValue } = this.state
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

          {page === 'home' ? (
            <NotesList
              notes={notes}
              deleteNote={this.deleteNote}
              searchValue={searchValue}
            />
          ) : null}

          {page === 'add' ? <AddPage /> : null}
        </Container>
      </>
    )
  }
}
