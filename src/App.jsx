import { useState } from 'react'
import { Outlet } from 'react-router'
import AppRoutes from './routes/routes.jsx'
import Headers from './components/Headers.jsx'
import { ThemeProvider } from './components/ThemeProvider.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

          <Headers/>
        <main className="w-full h-full">
          <Outlet />
        </main>
        <AppRoutes/>
    </ThemeProvider>
    </>
  )
}

export default App
