import { components, MenuProps } from 'react-select'
import selectSearchOptionType from './selectSearchOptionType'

const CustomSelectMenu = ({
  children,
  ...props
}: MenuProps<selectSearchOptionType, true>) => {
  if (props.selectProps.inputValue.length === 0) {
    return null
  }

  return <components.Menu {...props}>{children}</components.Menu>
}

export default CustomSelectMenu
