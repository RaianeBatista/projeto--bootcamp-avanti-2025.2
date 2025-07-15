import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)
  const [check, setCheck] = useState(true)

  const usuarios = [
    {id: 1,nome: "Anderson", idade: 23},
    {id: 2, nome: "Joeldo", idade: 19},
    {id: 3, nome: "Alyne", idade: 30},
    {id: 4, nome: "Raimundo", idade: 32},
  ]

  return (
    <>
    
      <Card nome={ "Anderson"} idade={18} />
      <Card nome={"Jheyelle"} idade={18} />
      
      {usuarios.map(usuario => <Card key={usuario.id} nome={usuario.nome} idade={usuario.idade} />)}
      
      {check ? <p>VERDADEIRO </p> : <p>FALSO</p>}
    
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
