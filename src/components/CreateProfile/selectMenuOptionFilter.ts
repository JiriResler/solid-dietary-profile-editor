import SelectMenuOption from './selectMenuOptionType'

const selectMenuOptionFilter = (option: SelectMenuOption, searchText: string) => {
  if (option.label.toLowerCase().startsWith(searchText.toLowerCase())) {
    return true
  }

  return false
}

export default selectMenuOptionFilter
