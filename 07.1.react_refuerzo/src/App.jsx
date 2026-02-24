import './App.css'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const sumar = () => {
    if (count < 10) setCount(count + 1)
  }

  const restar = () => {
    if (count > 0) setCount(count - 1)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={sumar} disabled={count >= 10}>Sumar</button>
      <button onClick={restar} disabled={count <= 0}>Restar</button>
    </div>
  )
}

export default App
