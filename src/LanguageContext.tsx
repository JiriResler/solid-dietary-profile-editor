import React, { Dispatch } from 'react'

interface LanguageContext {
  language: string
  setLanguage: Dispatch<React.SetStateAction<string>>
}

const LanguageContext = React.createContext<LanguageContext>({
  language: '',
  setLanguage: () => {},
})

export default LanguageContext
