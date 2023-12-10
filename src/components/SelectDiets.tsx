import Form from 'react-bootstrap/Form'

const diets = ['diet1, a_diet2, b_diet3']

const SelectDiets: React.FC = () => {
  return (
    <>
      <h1>2. Which diets are you on?</h1>
      <Form.Check type={'checkbox'} id={'id'} label="Vegan" />
      <Form.Check type={'checkbox'} id={'id'} label="Vegetarian" />
      <h3>Other diets</h3>
      <ul>
        <li>no data</li>
      </ul>
      <Form>
        <Form.Control type="text" placeholder="Search for a diet" />
      </Form>
    </>
  )
}

export default SelectDiets
