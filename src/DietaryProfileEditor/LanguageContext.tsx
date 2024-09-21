import React, { Dispatch } from 'react'

interface LanguageContext {
  selectedLanguage: string
  setSelectedLanguage: Dispatch<React.SetStateAction<string>>
}

// Context for currently selected language by the user.
const LanguageContext = React.createContext<LanguageContext>({
  selectedLanguage: '',
  setSelectedLanguage: () => {},
})

export default LanguageContext
