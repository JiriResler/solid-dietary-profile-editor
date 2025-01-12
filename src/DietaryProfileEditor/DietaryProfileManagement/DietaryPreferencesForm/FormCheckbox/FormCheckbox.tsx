import './FormCheckbox.css'
import Form from 'react-bootstrap/Form'

type CheckboxProps = {
  label: string
}

/**
 * Renders a custom-styled Bootstrap checkbox for use in the dietary preferences form.
 */
const FormCheckbox: React.FC<CheckboxProps> = ({ label }) => {
  const checkboxId = label.replace(/\s/g, '-').toLowerCase() + '-checkbox'

  return (
    <Form.Check id={checkboxId}>
      <Form.Check.Input className="app-form-control app-form-checkbox" />
      <Form.Check.Label className="checkbox-label">{label}</Form.Check.Label>
    </Form.Check>
  )
}

export default FormCheckbox
