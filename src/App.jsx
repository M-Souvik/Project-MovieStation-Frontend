import { useState } from 'react'
import { Outlet } from 'react-router'
import AppRoutes from './routes/routes.jsx'
import Headers from './components/Headers.jsx'
import { ThemeProvider } from './components/ThemeProvider.jsx'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const [count, setCount] = useState(0)
  // const queryClient = new QueryClient()
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

          <Headers/>
        <main className="w-full h-full">
        {/* <QueryClientProvider client={queryClient}> */}
          <Outlet />
          {/* </QueryClientProvider> */}
        </main>
        <AppRoutes/>
    </ThemeProvider>
    </>
  )
}

export default App
