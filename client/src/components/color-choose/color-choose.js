import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

export default function ColorChoose ({ colorChange, active }) {
  const variants = [
    ['primary', 'Основной'],
    ['secondary', 'Темный'],
    ['success', 'Успшено'],
    ['warning', 'Предупреждение'],
    ['danger', 'Опасность'],
    ['info', 'Инфо']
  ]
  const list = variants.map((variant, index) => {
    return (
      <Col xl={2} lg={4} md={4} sm={6} col={12} className='mb-3'>
        <Button
          block
          key={index}
          variant={variant[0]}
          onClick={() => colorChange(variant[0])}
          className={variant[0] === active ? null : 'disabled'}
        >
          {variant[1]}
        </Button>
      </Col>
    )
  })
  return (
    <>
      <label className='mb-2'>Выбор цвета</label> <br />
      <Row>{list}</Row>
    </>
  )
}
