import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'
import About from './About'
import { LoginMethodContext } from './LoginMethodContext'
// import { useContext } from 'react'

function App() {
  return (
    <LoginMethodContext.Provider value={'default-context'}>
      <BrowserRouter
        basename={import.meta.env.DEV ? '/' : '/solid-dietary-profile-editor/'}
      >
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LoginMethodContext.Provider>
  )
}

export default App
