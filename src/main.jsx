import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './screens/Home/Home.jsx'

import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
