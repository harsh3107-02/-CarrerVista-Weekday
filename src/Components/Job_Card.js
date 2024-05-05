// Importing required dependencies
import React, { useState } from 'react';
import "../styles/Job_Card.css";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TimerIcon from '@mui/icons-material/Timer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

// Defining the JobCard component
const JobCard = ({ job }) => {
   // State variable to handle job details expansion
   let [expand, setExpand] = useState(true);
   // Truncate job details if expanded
   let text = expand ? job.jobDetailsFromCompany.substring(0, 300) : job.jobDetailsFromCompany;

   // Returning the JSX for rendering job card
   return (
       <div className='JobPostContainer' style={{ overflowWrap: 'break-word' }}>
           <div className='JobPostMeta'>
               <p className='PostedDate'><TimerIcon /> Posted on 10 days</p>
               <div className='Internal_CompanyInfo'>
                   <img src={job.logoUrl} alt="Company Logo" className='CompanyLogo' />
                   <div className='CompanyDetails'>
                       <p className='CompanyName'>{job.companyName}</p>
                       <p className='JobRole'>{job.jobRole.replace(/\b\w/g, char => char.toUpperCase())}</p>
                       <p className='JobLocation'>{job.location.replace(/\b\w/g, char => char.toUpperCase())}</p>
                   </div>
               </div>
               <p className='SalaryRange'>Estimated Salary: ₹ {job.minJdSalary} - {job.maxJdSalary} LPA</p>
               <div className='AboutCompany' >
                   <p style={{ "line-height": "0rem", fontWeight: 500, color: "black" }}>About Company :</p>
                   <p style={{ "line-height": "0rem", fontWeight: 700, color: "black" }}>About us</p>
                   <p className={expand ? "JobDescription" : ""} style={{ "line-height": "1.2rem", fontSize: "15px", color: "black" }}>{text}</p>
               </div>
               {/* Button to expand/collapse job description */}
               <div className='see-more-btn'>
                   <span style={{ lineHeight: "0rem" }} onClick={() => setExpand(!expand)}>{expand ? "See More" : "See less"}</span>
               </div>
               <div className='ExperienceInfo'>
                   <p className='ExperienceLabel' style={{ lineHeight: "0", color: "grey", fontWeight: "600" }}>Minimum Experience</p>
                   <p className='ExperienceValue' style={{ lineHeight: "0", color: "black" }}>{job.minExp} years</p>
               </div>
               {/* Button to apply for the job */}
               <a href={job.jdLink} target="_blank" rel="noopener noreferrer">
                   <button className='ApplyButton'><FlashOnIcon style={{ color: "gold", fontSize: "25px" }} /> Easy Apply</button>
               </a>
               <br />
               {/* Button to unlock referral asks */}
               <button className='SaveButton'>
                   <AccountCircleIcon style={{ fontSize: "20px" }} />
                   <SupervisedUserCircleIcon style={{ fontSize: "20px" }} />
                   Unlock referral asks
               </button>
           </div>
       </div>
   );
};

// Exporting the JobCard component as default
export default JobCard;
