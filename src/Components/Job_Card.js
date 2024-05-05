import React from 'react';
import "../styles/Job_Card.css"
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TimerIcon from '@mui/icons-material/Timer';

const JobCard = ({ job }) => {
    return (
        <>
        <div className='JobPostContainer'>
    <div className='JobPostMeta'>
        <p className='PostedDate'style={{"line-height":"0px"}}><TimerIcon/>Posted on 10 days</p>
        <div className='Internal_CompanyInfo'>
            <img src={job.logoUrl} alt="Company Logo" className='CompanyLogo' />
            <div className='CompanyDetails'>
                <p className='CompanyName'>{job.companyName}</p>
                <p className='JobRole' >{job.jobRole}</p>
                <p className='JobLocation'>{job.location}</p>
            </div>
        </div>
            <p className='SalaryRange'>Estimated Salary: ₹ {job.minJdSalary} - {job.maxJdSalary} LPA</p>
            <div className='AboutCompany'>
                <p>About Company :</p>
                <p>About us</p>
                <p></p>
            </div>
        <div className='ExperienceInfo'>
            <p className='ExperienceLabel' style={{"line-height":"0px", color: "grey", fontWeight:"600"}}>Minimum Experience</p>
            <p className='ExperienceValue' style={{"line-height":"0px", color:"black"}}>{job.minExp} years</p>
        </div>
        <a href={job.jdLink}><button className='ApplyButton'><FlashOnIcon style={{color:"gold", fontSize:"20px"}}/> Easy Apply</button></a><br/>
        <button className='SaveButton'>Unlock referral asks</button>
    </div>
</div>

        </>
    );
};

export default JobCard;
