import Option from './optionType'

const selectMenuOptionFilter = (option: Option, searchText: string) => {
  if (option.label.toLowerCase().startsWith(searchText.toLowerCase())) {
    return true
  }

  return false
}

export default selectMenuOptionFilter
