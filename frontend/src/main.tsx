import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DonezoProvider from './hooks/DonezoContextProvider.tsx'
import UserContextProvider from './hooks/UserContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <UserContextProvider>
  <DonezoProvider>
    <App />
  </DonezoProvider>  
  </UserContextProvider>
  </StrictMode>,
)
