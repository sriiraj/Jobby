import './index.css'
import Navbar from '../Navbar'

const NotFound = () => (
  <div>
    <Navbar />
    <div className="Not-Found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="Not-Found-img"
      />
      <div className="Not-Found-content-container">
        <h1 className="Not-Found-heading">Page Not Found</h1>
        <p className="Not-Found-description">
          we&apos;re sorry, the page you requested could not be found
        </p>
      </div>
    </div>
  </div>
)

export default NotFound
