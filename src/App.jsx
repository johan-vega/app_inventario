import { useState } from 'react'
import Dashboard from './Dashboard'
import LoginPage from './components/login/LoginPage'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('login')

  if (currentView === 'dashboard') {
    return (
      <main className="app-view">
        <Dashboard />
      </main>
    )
  }

  return (
    <main className="app-view">
      <LoginPage onLogin={() => setCurrentView('dashboard')} />
    </main>
  )
}

export default App
