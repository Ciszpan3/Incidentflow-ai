import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { router } from './app/router.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
const root = document.getElementById('root')
if(!root) throw new Error("Missing #root element")

createRoot(root).render(
  <StrictMode><RouterProvider router={router}/></StrictMode>
)
