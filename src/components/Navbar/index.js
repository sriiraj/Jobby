import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Navbar = props => {
  const OnLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-large-screen">
        <Link to="/">
          <img
            className="nav-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-list">
          <li className="nav-list-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="logout-button" type="button" onClick={OnLogout}>
          Logout
        </button>
      </div>
      <div className="nav-mobile-screen">
        <Link to="/">
          <img
            className="nav-logo-mobile"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-list-mobile">
          <li className="nav-list-item-mobile">
            <Link to="/">
              <AiFillHome className="nav-icons" />
            </Link>
          </li>
          <li className="nav-list-item-mobile">
            <Link to="/">
              <BsFillBriefcaseFill className="nav-icons" />
            </Link>
          </li>
          <li className="nav-list-item-mobile">
            <Link to="/">
              <FiLogOut className="nav-icons" onClick={OnLogout} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Navbar)
