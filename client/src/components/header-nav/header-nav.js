import React from 'react'
import { Nav } from 'react-bootstrap'

export default function HeaderNav ({ setPage, setSearchValue, setToken }) {
  const ckickPage = page => {
    setPage(page)
    setSearchValue('')
  }

  return (
    <Nav className='mr-auto'>
      <Nav.Link onClick={() => ckickPage('home')}>Каталог</Nav.Link>
      <Nav.Link onClick={() => ckickPage('fill')}>Добавить</Nav.Link>
      <Nav.Link onClick={() => setToken('')}>Выйти</Nav.Link>
    </Nav>
  )
}
