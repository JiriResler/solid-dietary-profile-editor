import { SessionProvider } from '@inrupt/solid-ui-react'
import IntlProviderWrapper from './components/IntlProviderWrapper'
import ApplicationRouter from './components/ApplicationRouter'

const App: React.FC = () => {
  return (
    <SessionProvider>
      <IntlProviderWrapper>
        <ApplicationRouter />
      </IntlProviderWrapper>
    </SessionProvider>
  )
}

export default App
