import { useState } from 'react'
import Dashboard from './Dashboard'
import BannerLogin from './components/login/BannerLogin'
import LoginForm from './components/login/LoginForm'
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
    <section className="login-page container-fluid">
      <div className="login-wrapper">
        <p className="login-tag mb-2">LOGIN</p>

        <div className="login-card row g-0 overflow-hidden">
          <div className="col-lg-5">
            <BannerLogin />
          </div>
          <div className="col-lg-7">
            <LoginForm onLogin={() => setCurrentView('dashboard')} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
