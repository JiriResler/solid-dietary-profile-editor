import { IntlProvider } from 'react-intl'
import { useState } from 'react'
import LanguageContext from '../LanguageContext'
import RouterWrapper from './RouterWrapper'

const sk_messages = {
  app_name: 'Editor diétneho profilu',
  about_application: 'O aplikácii',
  sign_in_with: 'Prihlásiť sa cez',
  or: 'alebo',
  email_and_password: 'Email a heslo',
  what_is_the_difference: 'Aký je v tom rozdiel?',
  select_id_provider: 'Vyberte svojho poskytovateľa identity',
  log_in: 'Prihlásiť sa',
  go_back: 'Naspäť',
}

const cs_messages = {
  app_name: 'Editor dietního profilu',
  about_application: 'O aplikaci',
  sign_in_with: 'Přihlásit se přes',
  or: 'nebo',
  email_and_password: 'Email a heslo',
  what_is_the_difference: 'Jaký je v tom rozdíl?',
  select_id_provider: 'Zvolte svého poskytovatele identity',
  log_in: 'Přihlásit',
  go_back: 'Zpátky',
}

function IntlProviderWrapper() {
  const [language, setLanguage] = useState('en')
  const languageContextInitialValue = { language, setLanguage }

  function getCurrentLocaleMessages(locale: string) {
    if (locale === 'sk') {
      return sk_messages
    }

    if (locale === 'cs') {
      return cs_messages
    }

    return {}
  }
  return (
    <LanguageContext.Provider value={languageContextInitialValue}>
      <IntlProvider
        messages={getCurrentLocaleMessages(language)}
        locale={language}
      >
        <RouterWrapper />
      </IntlProvider>
    </LanguageContext.Provider>
  )
}

export default IntlProviderWrapper
