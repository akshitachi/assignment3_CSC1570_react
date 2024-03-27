import React from 'react'
import './CompanyLogo.css'
function CompanyLogo ({logoUrl})  {
  return (
    <img src={logoUrl} alt='Company Logo' className={`company_logo${window.innerWidth > 844 ? '' : 'big'}`}/>
  )
}

export default CompanyLogo