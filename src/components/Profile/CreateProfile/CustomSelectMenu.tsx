import { components, MenuProps } from 'react-select'
import SelectMenuOption from './selectMenuOptionType'

const CustomSelectMenu = ({
  children,
  ...props
}: MenuProps<SelectMenuOption, true>) => {
  if (props.selectProps.inputValue.length === 0) {
    return null
  }

  return <components.Menu {...props}>{children}</components.Menu>
}

export default CustomSelectMenu
