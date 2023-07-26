import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import espchartLogo from './assets/espchlogo.png'
import './App.css'

//Components 
import Player from "./Components/Player/Player"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <div>
        <img src={espchartLogo} className='logo' alt="logo"/>
      </div>
        <Player />
      </div>
    </>
  )
}

export default App
