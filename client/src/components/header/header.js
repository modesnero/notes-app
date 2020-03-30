import React, { Component } from 'react'
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap'

export default class Header extends Component {
  state = {
    searchValue: ''
  }

  searchFieldChange = event => {
    this.setState({ searchValue: event.target.value })
  }

  ckickPage = page => {
    const { setSearchValue, setPage } = this.props
    setPage(page)
    setSearchValue('')
  }

  submit = event => {
    event.preventDefault()
    const { searchValue } = this.state
    this.props.setSearchValue(searchValue)
    this.setState({ searchValue: '' })
  }

  render () {
    const { setToken } = this.props
    const { searchValue } = this.state

    return (
      <>
        <Navbar
          className='mb-5'
          collapseOnSelect
          expand='lg'
          bg='primary'
          variant='dark'
        >
          <Navbar.Brand>Заметки</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />

          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link onClick={() => this.ckickPage('home')}>
                Мои заметки
              </Nav.Link>
              <Nav.Link onClick={() => this.ckickPage('add')}>
                Добавить заметку
              </Nav.Link>

              <Nav.Link onClick={() => setToken('')}>
                Выйти из аккаунта
              </Nav.Link>
            </Nav>

            <Form inline onSubmit={this.submit}>
              <FormControl
                type='text'
                placeholder='Поиск заметок'
                className='mt-2 mb-2 mr-2'
                value={searchValue}
                onChange={this.searchFieldChange}
              />

              <Button variant='secondary' className='mt-2 mb-2' type='submit'>
                Поиск
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}
