import React from 'react'
import { Navbar } from 'react-bootstrap'

import HeaderSearchForm from '../header-search-form'
import HeaderNav from '../header-nav'

export default function Header ({ setSearchValue, setPage, setToken }) {
  return (
    <>
      <Navbar
        className='mb-5'
        collapseOnSelect
        expand='lg'
        bg='primary'
        variant='dark'
      >
        <Navbar.Brand>Мои Заметки</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />

        <Navbar.Collapse id='responsive-navbar-nav'>
          <HeaderNav
            setPage={setPage}
            setSearchValue={setSearchValue}
            setToken={setToken}
          />
          <HeaderSearchForm setSearchValue={setSearchValue} />
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
