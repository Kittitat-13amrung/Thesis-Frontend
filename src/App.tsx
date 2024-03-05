import './App.css'
import TabVisualiser from './pages/TabViewer/Index'
import Index from './pages/Index';
import Login from './pages/Login/Index';
import Register from './pages/Register/Index';
// import TabVisualiser from '@pages/TabVisualiser'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import React from 'react';

export const AuthContext = React.createContext<{ isLoggedIn: boolean; setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }>({
  isLoggedIn: false,
  setIsLoggedIn: () => { },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('token'));

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/songs" element={<TabVisualiser />} />
          </Routes>

        </Router>
      </AuthContext.Provider>
    </>
  )
}

export default App
