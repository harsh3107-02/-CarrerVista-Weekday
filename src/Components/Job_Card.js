import React, { useState } from "react";
import "../styles/Job_Card.css";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import TimerIcon from "@mui/icons-material/Timer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

const JobCard = ({ job }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="JobPostContainer" style={{ overflowWrap: "break-word" }}>
      <div className="JobPostMeta">
        <p className="PostedDate">
          <TimerIcon />
          Posted on 10 days
        </p>
        <div className="Internal_CompanyInfo">
          <img src={job.logoUrl} alt="Company Logo" className="CompanyLogo" />
          <div className="CompanyDetails">
            <p className="CompanyName">{job.companyName}</p>
            <p className="JobRole">
              {job.jobRole.replace(/\b\w/g, (char) => char.toUpperCase())}
            </p>
            <p className="JobLocation">
              {job.location.replace(/\b\w/g, (char) => char.toUpperCase())}
            </p>
          </div>
        </div>
        <p className="SalaryRange">
          Estimated Salary: ₹ {job.minJdSalary==null?"0":job.minJdSalary} - {job.maxJdSalary} LPA
        </p>
        <div className="AboutCompany">
          <p style={{ lineHeight: "0rem" }}>About Company :</p>
          <p style={{ lineHeight: "0rem" }}>About us</p>
          <p className="JobDescription" style={{ lineHeight: "1.2rem" }}>
            {job.jobDetailsFromCompany}
          </p>
          {job.jobDetailsFromCompany.length > 100 && (
            <span className="SeeMoreButton" onClick={toggleShowMore}>
              {showMore ? "See Less" : "See More"}
            </span>
          )}
        </div>
        <div className="ExperienceInfo">
          <p
            className="ExperienceLabel"
            style={{ lineHeight: "0", color: "grey", fontWeight: "600" }}
          >
            Minimum Experience
          </p>
          <p
            className="ExperienceValue"
            style={{ lineHeight: "0", color: "black" }}
          >
            {job.minExp===null?"0":job.minExp} years
          </p>
        </div>
        <a href={job.jdLink} target="_blank" rel="noopener noreferrer">
          <button className="ApplyButton">
            <FlashOnIcon style={{ color: "gold", fontSize: "25px" }} /> Easy
            Apply
          </button>
        </a>
        <br />
        <button className="SaveButton">
          <AccountCircleIcon style={{ fontSize: "20px" }} />
          <SupervisedUserCircleIcon style={{ fontSize: "20px" }} />
          Unlock referral asks
        </button>
      </div>
    </div>
  );
};

export default JobCard;
