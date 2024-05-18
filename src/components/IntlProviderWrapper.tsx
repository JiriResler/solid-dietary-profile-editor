import { IntlProvider } from 'react-intl'
import { useState } from 'react'
import LanguageContext from '../LanguageContext'
import { PropsWithChildren } from 'react'

type Messages = {
  manageYourProfileLoginScreenHeading: string
}

const messagesInSlovak: Messages = {
  manageYourProfileLoginScreenHeading: 'Spravujte svoj osobny dietny profil',
}

// const cs_messages: Messages = {
  
// }

const IntlProviderWrapper: React.FC<PropsWithChildren> = (props) => {
  const [languageLocale, setLanguageLocale] = useState('en')
  const languageContextInitialValue = { language: languageLocale, setLanguage: setLanguageLocale }

  function getCurrentLocaleMessages(locale: string) {
    if (locale === 'sk') {
      return messagesInSlovak
    }

    // if (locale === 'cs') {
    //   return cs_messages
    // }

    return {}
  }

  return (
    <LanguageContext.Provider value={languageContextInitialValue}>
      <IntlProvider
        messages={getCurrentLocaleMessages(languageLocale)}
        locale={languageLocale}
      >
        {props.children}
      </IntlProvider>
    </LanguageContext.Provider>
  )
}

export default IntlProviderWrapper
