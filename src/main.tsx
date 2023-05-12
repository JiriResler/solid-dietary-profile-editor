import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import I18n from "./I18n";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <I18n render={(setLocale) => <App onLocaleChanged={setLocale} />} />
  </React.StrictMode>
)
