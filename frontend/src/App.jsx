import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LandingPage from './Landing/LandingPage'
import Dashboard from './Pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
<BrowserRouter>
<Routes>
<Route exact path="/" element={<LandingPage/>} />
<Route exact path="/dashboard" element={<Dashboard/>} />
</Routes>
</BrowserRouter>
  )
}

export default App
