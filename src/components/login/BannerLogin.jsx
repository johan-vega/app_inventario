import stockflowLogo from '../../assets/stockflow.png'
import './BannerLogin.css'

function BannerLogin() {
  return (
    <div className="banner-login-panel">
      <img
        src={stockflowLogo}
        alt="StockFlow"
        className="img-fluid banner-login-logo"
      />
    </div>
  )
}

export default BannerLogin
