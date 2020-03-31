import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'

export default function ColorChoose ({ colorChange, active }) {
  const variants = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info'
  ]
  const list = variants.map(variant => {
    return (
      <Button variant={variant} onClick={() => colorChange(variant)}>
        {variant === active ? 'Выбран' : 'Выбрать'}
      </Button>
    )
  })
  return (
    <>
      <label className='mb-2'>Выбор цвета</label>
      <br />
      <ButtonGroup className='mb-3'>{list}</ButtonGroup>
    </>
  )
}
