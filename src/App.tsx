import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'
import About from './About'
import { ImageSizeContext } from './Context.js'
import { useContext } from 'react'

function App() {
  return (
    <ImageSizeContext.Provider value={1000}>
      <BrowserRouter
        basename={import.meta.env.DEV ? '/' : '/solid-dietary-profile-editor/'}
      >
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <PlaceImage />
        </div>
      </BrowserRouter>
    </ImageSizeContext.Provider>
  )
}

function PlaceImage() {
  const imageSize = useContext(ImageSizeContext)
  return <p>{imageSize}</p>
}

export default App
