import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

import ApiService from '../../services/api-service'
import Header from '../header'
import NotesList from '../notes-list'
import SearchView from '../search-view'
import AddPage from '../add-page'
import Alert from '../alert'

export default class NotesPage extends Component {
  state = {
    page: localStorage.page ? localStorage.page : 'home',
    notes: [],
    searchValue: '',
    alertShow: false
  }

  apiService = new ApiService()

  loadNotes = async () => {
    try {
      const { token } = this.props
      const { result: notes } = await this.apiService.getNote(token)
      this.setState({ notes })
    } catch (err) {
      console.error(err)
    }
  }

  componentDidMount = async () => this.loadNotes()

  setSearchValue = searchValue => this.setState({ searchValue })

  setShowAlert = alertShow => this.setState({ alertShow })

  deleteNote = deleteId => {
    this.setState(({ notes }) => {
      const newNotes = notes.filter(el => (el.id !== deleteId ? el : null))
      return { notes: newNotes }
    })
  }

  setPage = page => {
    this.setState({ page })
    localStorage.page = page
  }

  render () {
    const { setToken, token } = this.props
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
            <AddPage
              loadNotes={this.loadNotes}
              setPage={this.setPage}
              token={token}
            />
          ) : null}
        </Container>
      </>
    )
  }
}
