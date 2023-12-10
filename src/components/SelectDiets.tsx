import Form from 'react-bootstrap/Form'
import Select from 'react-select'

const SelectDiets: React.FC = () => {
  return (
    <>
      <h1>2. Which diets are you on?</h1>
      <Form.Check type={'checkbox'} id={'id'} label="Vegan" />
      <Form.Check type={'checkbox'} id={'id'} label="Vegetarian" />
      <h3>Other diets</h3>
      <Select
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          ClearIndicator: () => null,
        }}
        isMulti
        openMenuOnClick={false}
        options={[
          { value: 1, label: 'foo' },
          { value: 2, label: 'bar' },
        ]}
      />
    </>
  )
}

export default SelectDiets
