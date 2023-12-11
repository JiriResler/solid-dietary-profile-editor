import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import { useState } from 'react'

type MyOption = { label: string; value: number }

const SelectDiets: React.FC = () => {
  const [options, setOptions] = useState<ReadonlyArray<MyOption>>([])

  function handleChange(value: ReadonlyArray<MyOption>) {
    setOptions(value)
  }

  return (
    <>
      <h1>2. Which diets are you on?</h1>
      <Form.Check type={'checkbox'} id={'id'} label="Vegan" />
      <Form.Check type={'checkbox'} id={'id'} label="Vegetarian" />
      <h3>Other diets</h3>
      <Select
        options={[
          { value: 1, label: 'aaa' },
          { value: 2, label: 'abb' },
          { value: 3, label: 'abc' },
          { value: 4, label: 'aba' },
        ]}
        value={options}
        onChange={(data) => {
          handleChange(data)
        }}
        isMulti
        openMenuOnClick={false}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          ClearIndicator: () => null,
        }}
        placeholder="Search for a diet"
      />
    </>
  )
}

export default SelectDiets
