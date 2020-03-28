import React, { Component } from 'react'
import Header from '../header'
import NotesList from '../notes-list'

const getItem = id => {
  return {
    id,
    title: 'Название',
    subTitle: 'Подзаголовок',
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
      notes
    }
  }

  deleteNote = deleteId => {
    this.setState(({ notes }) => {
      const newArr = []
      notes.forEach(item => {
        if (item.id !== deleteId) newArr.push(item)
      })
      return { notes: newArr }
    })
  }

  render () {
    const { setToken } = this.props
    const { notes } = this.state
    return (
      <>
        <Header setToken={setToken} />
        <NotesList notes={notes} deleteNote={this.deleteNote} />
      </>
    )
  }
}
