import BannerLogin from './BannerLogin'
import LoginForm from './LoginForm'
import './LoginPage.css'

function LoginPage({ onLogin }) {
  return (
    <section className="login-page container-fluid">
      <div className="login-wrapper">
        <p className="login-tag mb-2">LOGIN</p>

        <div className="login-card row g-0 overflow-hidden">
          <div className="col-lg-5">
            <BannerLogin />
          </div>
          <div className="col-lg-7">
            <LoginForm onLogin={onLogin} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
