import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {MdLocationOn, MdOpenInNew} from 'react-icons/md'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {Component} from 'react'
import Navbar from '../Navbar'
import SimilarJobs from '../SimilarJobs'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetail extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    JobDetails: {},
    Skills: [],
    LifeAtCompany: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.GetJobDetails()
  }

  JobDetailsResponseStructure = Obj => {
    const Template = {
      id: Obj.id,
      title: Obj.title,
      rating: Obj.rating,
      companyLogoUrl: Obj.company_logo_url,
      location: Obj.location,
      jobDescription: Obj.job_description,
      packagePerAnnum: Obj.package_per_annum,
      employmentType: Obj.employment_type,
      companyWebsiteUrl: Obj.company_website_url,
    }
    return Template
  }

  SimilarJobsResponseStructure = Obj => {
    const Template = {
      id: Obj.id,
      title: Obj.title,
      rating: Obj.rating,
      companyLogoUrl: Obj.company_logo_url,
      location: Obj.location,
      jobDescription: Obj.job_description,
      employmentType: Obj.employment_type,
    }
    return Template
  }

  GetJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const JobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(JobDetailsUrl, options)
    if (response.ok) {
      const FetchData = await response.json()
      const UpdateJobDetails = this.JobDetailsResponseStructure(
        FetchData.job_details,
      )
      const UpdateJobSkills = FetchData.job_details.skills.map(j => ({
        name: j.name,
        SkillImgUrl: j.image_url,
      }))
      const UpdateLifeAtCompany = {
        description: FetchData.job_details.life_at_company.description,
        LifeImageUrl: FetchData.job_details.life_at_company.image_url,
      }
      const UpdateSimilarJobs = FetchData.similar_jobs.map(i =>
        this.SimilarJobsResponseStructure(i),
      )
      this.setState({
        apiStatus: apiStatusConstants.success,
        JobDetails: UpdateJobDetails,
        Skills: UpdateJobSkills,
        LifeAtCompany: UpdateLifeAtCompany,
        similarJobs: UpdateSimilarJobs,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  OnRetry = () => {
    this.GetJobDetails()
  }

  RenderJobDetails = () => {
    const {JobDetails, Skills, LifeAtCompany} = this.state
    const {
      title,
      rating,
      location,
      jobDescription,
      companyLogoUrl,
      packagePerAnnum,
      employmentType,
      companyWebsiteUrl,
    } = JobDetails
    const {description, LifeImageUrl} = LifeAtCompany
    return (
      <div className="job-Detail-container">
        <div className="job-Detail-inner">
          <div className="job-Detail-header">
            <img
              className="job-Detail-company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="job-Detail-header-description">
              <h1 className="job-Detail-title">{title}</h1>
              <div className="rating-container">
                <BsFillStarFill className="rating-star" />
                <p className="rating-value">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-Detail-body-info">
            <div className="job-Detail-body-info-left">
              <div className="Job-Detail-icon-container">
                <MdLocationOn className="Job-Detail-icon-img" />
                <p className="Job-Detail-icon-label">{location}</p>
              </div>
              <div className="Job-Detail-icon-container Job-Detail-employmentType-container">
                <BsFillBriefcaseFill className="Job-Detail-icon-img" />
                <p className="Job-Detail-icon-label">{employmentType}</p>
              </div>
            </div>
            <p className="Job-Detail-lpa">{packagePerAnnum}</p>
          </div>
          <div className="job-Detail-description-container">
            <div className="Job-Detail-description-heading-container">
              <h1 className="job-Detail-heading">Description</h1>
              <a
                className="Job-Detail-visit"
                target="blank"
                href={companyWebsiteUrl}
              >
                Visit <MdOpenInNew />
              </a>
            </div>
            <p className="job-Detail-description">{jobDescription}</p>
          </div>
          <div className="Job-Detail-Skills-container">
            <h1 className="job-Detail-heading">Skills</h1>
            <ul className="Job-Detail-skill-list">
              {Skills.map(i => (
                <li className="Job-Detail-skill-item" key={i.name}>
                  <img src={i.SkillImgUrl} alt={i.name} className="skill-img" />
                  <p className="skill-name">{i.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="Job-Detail-Life-at-company">
            <h1 className="job-Detail-heading">Life at Company</h1>
            <div className="Job-Detail-Life-at-company-description-container">
              <p className="Job-Detail-Life-at-company-description">
                {description}
              </p>
              <img
                src={LifeImageUrl}
                className="Job-Detail-Life-at-company-img"
                alt="life at company"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  RenderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <div className="similar-job-container">
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(i => (
            <SimilarJobs key={i.id} SimilarJobItems={i} />
          ))}
        </ul>
      </div>
    )
  }

  RenderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  RenderJobFailure = () => (
    <div className="job-failure-container">
      <img
        className="job-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-failure-heading">Oops! Something Went Wrong</h1>
      <p className="job-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-failure-button"
        onClick={this.OnRetry}
      >
        Retry
      </button>
    </div>
  )

  RenderJobDetailPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <>
            {this.RenderJobDetails()}
            {this.RenderSimilarJobs()}
          </>
        )
      case apiStatusConstants.failure:
        return this.RenderJobFailure()
      case apiStatusConstants.inProgress:
        return this.RenderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="job-detail-main-container">
          {this.RenderJobDetailPage()}
        </div>
      </>
    )
  }
}
export default JobDetail
