import { useState } from 'react'
import './App.css';
import HomePage from '../Components/HomePage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="bg">
    <HomePage/>
    </div>
    </>
  )
}

export default App
