import './index.css'
import {MdLocationOn} from 'react-icons/md'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobs = props => {
  const {SimilarJobItems} = props
  const {
    title,
    rating,
    companyLogoUrl,
    location,
    jobDescription,
    employmentType,
  } = SimilarJobItems
  return (
    <li className="similar-job-item">
      <div className="similar-job-inner">
        <div className="similar-job-header">
          <img
            className="similar-job-company-logo"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="similar-job-header-description">
            <h1 className="similar-job-title">{title}</h1>
            <div className="rating-container">
              <BsFillStarFill className="rating-star" />
              <p className="rating-value">{rating}</p>
            </div>
          </div>
        </div>
        <div className="similar-job-description-container">
          <h1 className="similar-job-heading">Description</h1>
          <p className="similar-job-description">{jobDescription}</p>
        </div>
        <div className="similar-job-body-info">
          <div className="similar-job-icon-container">
            <MdLocationOn className="similar-job-icon-img" />
            <p className="similar-job-icon-label">{location}</p>
          </div>
          <div className="similar-job-icon-container similar-job-employmentType-container">
            <BsFillBriefcaseFill className="similar-job-icon-img" />
            <p className="similar-job-icon-label">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
