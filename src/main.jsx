import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './app/store'
import { NuqsAdapter } from 'nuqs/adapters/react'

// const store = configureStore()

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NuqsAdapter>
  <BrowserRouter>
    {/* <StrictMode> */}
      <App />
    {/* </StrictMode> */}
  </BrowserRouter>
  </NuqsAdapter>
  </Provider>
)
