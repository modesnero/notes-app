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
    console.log(active[0] + ' ' + variant[0])
    return (
      <Col>
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
      <label className='mb-2'>Выбор цвета</label>
      <br />
      <Row className="mb-3">{list}</Row>
    </>
  )
}
