import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { SessionProvider } from '@inrupt/solid-ui-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SessionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SessionProvider>,
)
