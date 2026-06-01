import { useState } from 'react'
import './LoginForm.css'

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      className="login-form-input-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function EyeIcon({ visible }) {
  if (visible) {
    return (
      <svg
        aria-hidden="true"
        className="login-form-input-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      className="login-form-input-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3 21 21" />
      <path d="M10.6 10.7a3 3 0 0 0 4 4" />
      <path d="M9.9 5.1A10.5 10.5 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.2" />
      <path d="M6.6 6.6A17.5 17.5 0 0 0 2 12s3.6 7 10 7a9.8 9.8 0 0 0 5.4-1.6" />
    </svg>
  )
}

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin?.()
  }

  return (
    <div className="login-form-panel">
      <div className="login-form-content">
        <header className="mb-5">
          <h1 className="login-form-title mb-2">BIENVENIDO</h1>
          <p className="login-form-subtitle mb-0">
            INGRESA CON TU USUARIO Y CONTRASENA PARA CONTINUAR
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="form-label login-form-label">
              USUARIO:
            </label>
            <div className="input-group login-form-input-group">
              <span className="input-group-text login-form-input-addon">
                <UserIcon />
              </span>
              <input
                id="username"
                type="text"
                className="form-control login-form-input"
                placeholder="USUARIO"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-label login-form-label">
              PASSWORD:
            </label>
            <div className="input-group login-form-input-group">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-control login-form-input login-form-password-input"
                placeholder="*************"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="input-group-text login-form-input-addon login-form-eye-button"
                onClick={() => setShowPassword((currentValue) => !currentValue)}
                aria-label={
                  showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'
                }
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
            <button type="button" className="btn btn-link login-form-forgot px-0">
              Olvidaste tu contrasena?
            </button>
          </div>

          <div className="pt-4">
            <button type="submit" className="btn login-form-submit-button">
              INGRESAR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
