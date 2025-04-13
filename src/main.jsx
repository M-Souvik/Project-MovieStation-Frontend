import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './app/store'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// const store = configureStore()
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NuqsAdapter>
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>

      <App />

  </QueryClientProvider>
    {/* <StrictMode> */}
    {/* </StrictMode> */}
  </BrowserRouter>
  </NuqsAdapter>
  </Provider>
)
