import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import './SelectAllergens.css'

const SelectAllergens: React.FC = () => {
  return (
    <>
      <Stack>
        <h1>1. What are you allergic to?</h1>
        <p>
          A number in brackets is the number of the allergen given by the law.
        </p>
        <Stack direction="horizontal" gap={2}>
          <input type="checkbox"></input>
          <div>Allergen (x)</div>
          <div>i</div>
        </Stack>
      </Stack>
      <div className="mt-5">1/3</div>
      <Button>Next step</Button>
    </>
  )
}

export default SelectAllergens