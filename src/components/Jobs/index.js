import './index.css'
import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import JobItems from '../JobItems'
import FilterGroup from '../FilterGroup'
import Profile from '../Profile'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    JobItemsArray: [],
    InputSearch: '',
    SalaryRangeId: '',
    EmploymentId: [],
  }

  componentDidMount() {
    this.GetJobItems()
  }

  JobItemsResponseStructure = Obj => {
    const Template = {
      id: Obj.id,
      title: Obj.title,
      rating: Obj.rating,
      companyLogoUrl: Obj.company_logo_url,
      location: Obj.location,
      jobDescription: Obj.job_description,
      packagePerAnnum: Obj.package_per_annum,
      employmentType: Obj.employment_type,
    }
    return Template
  }

  GetJobItems = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {InputSearch, SalaryRangeId, EmploymentId} = this.state
    const EmploymentStr = EmploymentId ? EmploymentId.join() : undefined
    const jwtToken = Cookies.get('jwt_token')
    const FetchJobURL = `https://apis.ccbp.in/jobs?search=${InputSearch}&minimum_package=${SalaryRangeId}&employment_type=${EmploymentStr}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(FetchJobURL, options)
    if (response.ok) {
      const FetchData = await response.json()
      const updateData = FetchData.jobs.map(i =>
        this.JobItemsResponseStructure(i),
      )
      this.setState({
        JobItemsArray: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({InputSearch: event.target.value})
  }

  onClickSearchIcon = () => {
    this.GetJobItems()
  }

  OnRetry = () => {
    this.GetJobItems()
  }

  RenderSearchContainer = () => {
    const {InputSearch} = this.state
    return (
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="search"
            placeholder="Search"
            className="search-input"
            value={InputSearch}
            onChange={this.onChangeSearchInput}
          />
        </div>
        <div className="search-icon-container">
          <button
            type="button"
            className="search-button"
            onClick={this.onClickSearchIcon}
            testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
      </div>
    )
  }

  RenderJobItems = () => {
    const {JobItemsArray} = this.state
    const ShowAllProducts = JobItemsArray.length > 0
    return ShowAllProducts ? (
      <ul className="job-item-main-container">
        {JobItemsArray.map(i => (
          <JobItems key={i.id} JobItemsList={i} />
        ))}
      </ul>
    ) : (
      <div className="no-job-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-job-img"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-description">
          We could not find any jobs. Try other filters
        </p>
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

  ChangeSalaryRange = SalaryId => {
    this.setState({SalaryRangeId: SalaryId}, this.GetJobItems)
  }

  CheckedEmploymentType = event => {
    const {EmploymentId} = this.state
    if (event.target.checked) {
      this.setState(
        j => ({
          EmploymentId: [...j.EmploymentId, event.target.value],
        }),
        this.GetJobItems,
      )
    } else {
      const remove = EmploymentId.indexOf(event.target.value)
      this.setState(
        k => ({
          EmploymentId: k.EmploymentId.filter((_, i) => i !== remove),
        }),
        this.GetJobItems,
      )
    }
  }

  RenderAllJobLists = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.RenderJobItems()
      case apiStatusConstants.failure:
        return this.RenderJobFailure()
      case apiStatusConstants.inProgress:
        return this.RenderLoader()
      default:
        return null
    }
  }

  render() {
    const {SalaryRangeId, EmploymentId, UpdateCheckBoxArray} = this.state
    return (
      <>
        <Navbar />
        <div className="job-main-container">
          <div className="job-container">
            <div className="Filter-sidebar">
              <Profile />
              <hr className="hr-line" />
              <FilterGroup
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                SalaryRangeId={SalaryRangeId}
                ChangeSalaryRange={this.ChangeSalaryRange}
                EmploymentId={EmploymentId}
                CheckedEmploymentType={this.CheckedEmploymentType}
                UpdateCheckBoxArray={UpdateCheckBoxArray}
              />
            </div>
            <div className="job-profiles-container">
              <div className="search-main-container">
                {this.RenderSearchContainer()}
              </div>
              <div className="AllJobsList">{this.RenderAllJobLists()}</div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
