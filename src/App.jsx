import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Lock from './components/Lock'
import Menu from './components/Menu'
import Gallery from './pages/Gallery'
import Timeline from './pages/Timeline'
import ClickSpark from './components/ClickSpark'
import Puzzle from './pages/Puzzle'
import LoveNote from './pages/LoveMessage'

function App() {
  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lock" element={<Lock />} />
        <Route path="/menu" element={<Menu />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path="/Timeline" element={<Timeline/>} />
        <Route path="/puzzle" element={<Puzzle />} />
        <Route path="/note" element={<LoveNote />} />
      </Routes>
    </ClickSpark>
  )
}

export default App
