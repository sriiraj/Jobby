import './index.css'

const FilterGroup = props => {
  const RenderEmploymentType = () => {
    const {employmentTypesList} = props
    return (
      <div className="Employment-container">
        <h1 className="sidebar-heading">Type of Employment</h1>
        <ul className="employement-list">
          {employmentTypesList.map(i => {
            const {CheckedEmploymentType} = props
            const OnSelectCheckbox = event => {
              CheckedEmploymentType(event)
            }
            return (
              <li className="employment-list-item" key={i.employmentTypeId}>
                <input
                  type="checkbox"
                  id={`Employment-checkbox-${i.employmentTypeId}`}
                  name={i.employmentTypeId}
                  value={i.employmentTypeId}
                  className="employment-item-input"
                  onChange={OnSelectCheckbox}
                />
                <label
                  className="employment-item-label"
                  htmlFor={`Employment-checkbox-${i.employmentTypeId}`}
                >
                  {i.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const RenderSalary = () => {
    const {salaryRangesList} = props
    return (
      <div className="salary-Range-container">
        <h1 className="sidebar-heading">Salary Range</h1>
        <ul className="salary-list">
          {salaryRangesList.map(i => {
            const {ChangeSalaryRange} = props
            const OnSelectSalary = event => {
              ChangeSalaryRange(event.currentTarget.value)
              console.log(event.currentTarget.value)
            }
            return (
              <li className="salary-list-item" key={i.label}>
                <input
                  type="radio"
                  id={i.salaryRangeId}
                  name="salary-range-radio"
                  value={i.salaryRangeId}
                  className="salary-item-input"
                  onChange={OnSelectSalary}
                />
                <label className="salary-item-label" htmlFor={i.salaryRangeId}>
                  {i.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <>
      {RenderEmploymentType()}
      <hr className="hr-line" />
      {RenderSalary()}
    </>
  )
}
export default FilterGroup
