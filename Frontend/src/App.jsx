import { useState } from 'react'
import CrearTicketTajeta from './components/CrearTicketTajeta'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-red-500'>Hola</h1>
      <div className='w-full flex items-start justify-center p-2'>
          <CrearTicketTajeta/>
        </div>

    </>
  )
}

export default App
