import { components, MenuProps } from 'react-select'
import Option from './optionType'

const CustomSelectMenu = ({ children, ...props }: MenuProps<Option, true>) => {
  if (props.selectProps.inputValue.length === 0) {
    return null
  }

  return <components.Menu {...props}>{children}</components.Menu>
}

export default CustomSelectMenu
