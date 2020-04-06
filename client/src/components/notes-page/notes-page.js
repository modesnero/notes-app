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
    alert: { isShow: false, message: '', color: '' },
    alertInterval: null,
    editNote: {},
    searchValue: ''
  }

  apiService = new ApiService()

  componentDidMount = async () => this.loadNotes()

  setPage = page => this.setState({ page })

  setSearchValue = searchValue => this.setState({ searchValue })

  setAlert = (isShow, message, color) => {
    const { alert, alertInterval } = this.state
    if (alert.isShow) clearTimeout(alertInterval)

    this.setState({
      alert: { isShow, message, color },
      alertInterval: setTimeout(() => this.setAlert(false, '', ''), 5000)
    })
  }

  loadNotes = async () => {
    try {
      const { result: notes } = await this.apiService.getNote(this.props.token)
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
      await this.apiService.deleteNote(this.props.token, deleteId)
      await this.loadNotes()
      this.setAlert(true, 'Заметка была удалена', 'danger')
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    const { setToken, token } = this.props
    const { notes, page, searchValue, alert, editNote } = this.state
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

          {alert.isShow && page === 'home' ? (
            <Alert
              message={alert.message}
              variant={alert.color}
              setAlert={this.setAlert}
              setAlertInterval={this.setAlertInterval}
            />
          ) : null}

          {page === 'home' ? (
            <NotesList
              notes={notes}
              setPage={this.setPage}
              deleteNote={this.deleteNote}
              editNote={this.clickEdit}
              searchValue={searchValue}
            />
          ) : null}

          {page === 'add' ? (
            <AddPage
              token={token}
              setPage={this.setPage}
              loadNotes={this.loadNotes}
              setAlert={this.setAlert}
            />
          ) : null}

          {page === 'edit' ? (
            <EditPage
              token={token}
              setPage={this.setPage}
              loadNotes={this.loadNotes}
              setAlert={this.setAlert}
              editNote={editNote}
            />
          ) : null}
        </Container>
      </>
    )
  }
}
