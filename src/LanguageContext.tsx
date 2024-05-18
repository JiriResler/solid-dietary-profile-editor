import React, { Dispatch } from 'react'

interface LanguageContext {
  language: string
  setLanguage: Dispatch<React.SetStateAction<string>>
}

// Context for currently selected language by the user.
const LanguageContext = React.createContext<LanguageContext>({
  language: '',
  setLanguage: () => {},
})

export default LanguageContext
