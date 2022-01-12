import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

const ProfileApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profileDetails: {},
    apiStatus: ProfileApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: ProfileApiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const ProfileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(ProfileUrl, options)
    if (response.ok) {
      const FetchData = await response.json()
      this.setState({
        profileDetails: FetchData.profile_details,
        apiStatus: ProfileApiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: ProfileApiStatusConstants.failure})
    }
  }

  OnProfileRetry = () => {
    this.getProfileDetails()
  }

  ProfileRenderSuccess = () => {
    const {profileDetails} = this.state
    return (
      <div className="profile-main-container">
        <div className="profile-container">
          <img
            className="profile-img"
            src={profileDetails.profile_image_url}
            alt="profile"
          />
          <h1 className="profile-name">{profileDetails.name}</h1>
          <p className="profile-description">{profileDetails.short_bio}</p>
        </div>
      </div>
    )
  }

  ProfileRenderLoading = () => (
    <div className="Profile-main-load-failure">
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  ProfileRenderFailure = () => (
    <div className="Profile-main-load-failure">
      <button
        type="button"
        className="profile-failure-button"
        onClick={this.OnProfileRetry}
      >
        Retry
      </button>
    </div>
  )

  RenderAllProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case ProfileApiStatusConstants.success:
        return this.ProfileRenderSuccess()
      case ProfileApiStatusConstants.failure:
        return this.ProfileRenderFailure()
      case ProfileApiStatusConstants.inProgress:
        return this.ProfileRenderLoading()
      default:
        return null
    }
  }

  render() {
    return <> {this.RenderAllProfile()}</>
  }
}
export default Profile
