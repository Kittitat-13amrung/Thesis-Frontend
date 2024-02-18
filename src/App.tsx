import './App.css'
import TabVisualiser from './pages/TabViewer/Index'
import Index from './pages/Index'
// import TabVisualiser from '@pages/TabVisualiser'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>

          <Route path="/tab-visualiser" element={<TabVisualiser />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
