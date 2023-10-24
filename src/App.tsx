import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Home'
import About from './About'
import SignInMethodComparison from './SignInMethodComparison'
import './styles/LoginScreen.css'

const App: React.FC = () => {
  return (
    <BrowserRouter
      basename={import.meta.env.DEV ? '/' : '/solid-dietary-profile-editor/'}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="sign-in-methods-comparison"
          element={<SignInMethodComparison />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
