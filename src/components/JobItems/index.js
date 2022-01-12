import './index.css'
import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'

const JobItems = props => {
  const {JobItemsList} = props
  const {
    id,
    title,
    rating,
    companyLogoUrl,
    location,
    jobDescription,
    packagePerAnnum,
    employmentType,
  } = JobItemsList
  return (
    <li>
      <Link to={`/jobs/${id}`} className="job-item-container">
        <div className="job-item-inner">
          <div className="job-item-header">
            <img
              className="job-item-company-logo"
              src={companyLogoUrl}
              alt="company logo"
            />
            <div className="job-item-header-description">
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <BsFillStarFill className="rating-star" />
                <p className="rating-value">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-body-info">
            <div className="job-item-body-info-left">
              <div className="icon-container">
                <MdLocationOn className="icon-img" />
                <p className="icon-label">{location}</p>
              </div>
              <div className="icon-container employmentType-container">
                <BsFillBriefcaseFill className="icon-img" />
                <p className="icon-label">{employmentType}</p>
              </div>
            </div>
            <p className="job-lpa">{packagePerAnnum}</p>
          </div>
          <div className="job-item-description-container">
            <h1 className="job-item-description-heading">Description</h1>
            <p className="job-item-description">{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default JobItems
