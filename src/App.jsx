import { useState } from 'react'
import { Outlet } from 'react-router'
import AppRoutes from './routes/routes.jsx'
import Headers from './components/Headers.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <main className="">
          <Headers/>
          <Outlet />
        </main>
        <AppRoutes/>
    </>
  )
}

export default App
