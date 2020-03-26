import React from 'react'
import { Form } from 'react-bootstrap'

export default function AuthField (props) {
  const { onFieldChange, type, field, title, value, placeholder } = props
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={event => onFieldChange(event, field)}
      />
    </Form.Group>
  )
}
