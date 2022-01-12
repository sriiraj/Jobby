import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="Home-main-container">
        <Navbar />
        <div className="Home-container">
          <div className="Home-content-container">
            <h1 className="Home-heading">Find The Job That Fits Your Life</h1>
            <p className="Home-description">
              Millions of people are searching for jobs,salary information,
              company reviews. Find the job that fits your ability and potential
            </p>
            <Link to="/jobs">
              <button type="button" className="find-job-button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
