import React from 'react'
import Landing from './pages/landiing'
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
  )
}
export default App