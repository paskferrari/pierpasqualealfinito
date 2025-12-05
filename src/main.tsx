import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CVPage from './App'
import MyProjects from './MyProjects'

function Root() {
  const path = window.location.pathname
  if (path === '/myprojects' || path.startsWith('/myprojects/')) return <MyProjects />
  return <CVPage />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
