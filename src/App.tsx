import IntlProviderWrapper from './components/IntlProviderWrapper'
import { SessionProvider } from '@inrupt/solid-ui-react'

const App: React.FC = () => {
  return (
    <SessionProvider>
      <IntlProviderWrapper />
    </SessionProvider>
  )
}

export default App
