import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

import ApiService from '../../services/api-service'
import Header from '../header'
import NotesList from '../notes-list'
import SearchView from '../search-view'
import AddPage from '../add-page'
import EditPage from '../edit-page'
import Alert from '../alert'

export default class NotesPage extends Component {
  state = {
    notes: [],
    page: localStorage.page ? localStorage.page : 'home',
    editNote: {},
    searchValue: '',
    alertShow: false
  }

  apiService = new ApiService()

  componentDidMount = async () => this.loadNotes()

  setSearchValue = searchValue => this.setState({ searchValue })

  setShowAlert = alertShow => this.setState({ alertShow })

  loadNotes = async () => {
    try {
      const { token } = this.props
      const { result: notes } = await this.apiService.getNote(token)
      this.setState({ notes })
    } catch (err) {
      console.error(err)
    }
  }

  clickEdit = editId => {
    const { notes } = this.state
    const editNote = notes.find(item => (item._id === editId ? true : false))
    this.setState({ editNote })
    this.setPage('edit')
  }

  deleteNote = async deleteId => {
    try {
      const { token } = this.props
      await this.apiService.deleteNote(token, deleteId)
      this.loadNotes()
    } catch (err) {
      console.error(err)
    }
  }

  setPage = page => {
    this.setState({ page })
  }

  render () {
    const { setToken, token } = this.props
    const { notes, page, searchValue, alertShow, editNote } = this.state
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
              editNote={this.clickEdit}
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

          {page === 'edit' ? (
            <EditPage
              loadNotes={this.loadNotes}
              editNote={editNote}
              setPage={this.setPage}
              token={token}
            />
          ) : null}
        </Container>
      </>
    )
  }
}
