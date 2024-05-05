import React, { useEffect, useState } from "react";
import "../../styles/search.css";

const SearchBar = (props) => {
    const [JobCriteria, setJobCriteria] = useState({
        Role: "",
        No_Of_Employee: "",
        Experience: "",
        Remote: "",
        Min_Salary: "",
        Company_Name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobCriteria((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSearch = async () => {
        await props.JobFilter(JobCriteria);
    };
    useEffect(()=>{
      let timerOut=setTimeout(()=>{
         props.JobFilter(JobCriteria)
      },800)
      return ()=>clearTimeout(timerOut)
    },[JobCriteria.Company_Name])

    return (
        <div>
            <select name="Role" onChange={handleChange} onClick={handleSearch} value={JobCriteria.Role} className="Selectab">
                <option value="" disabled hidden>Roles |</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Tech Lead">Tech Lead</option>
                <option value="Android">Android</option>
                <option value="IOS">IOS</option>
            </select>
            <select name="No_Of_Employee" onChange={handleChange} value={JobCriteria.No_Of_Employee} className="Selectab">
                <option value="" disabled hidden>Number of Employees</option>
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>51-200 employees</option>
                <option>201-1000 employees</option>
                <option>1001+ employees</option>
            </select>
            <select name="Experience" onChange={handleChange} value={JobCriteria.Experience} className="Selectab">
                <option value="" disabled hidden>Experience</option>
                <option>Intern</option>
                <option>Entry Level</option>
                <option>Associate</option>
                <option>Senior</option>
                <option>Director</option>
            </select>
            <select name="Remote" onChange={handleChange} value={JobCriteria.Remote} className="Selectab">
                <option value="" disabled hidden>Remote</option>
                <option>on-Site</option>
                <option>Hybrid</option>
                <option>Remote</option>
            </select>
            <select name="Min_Salary" onChange={handleChange} value={JobCriteria.Min_Salary} className="Selectab">
                <option value="" disabled hidden>Minimum Base Pay Salary</option>
                <option>0-3 Lakhs</option>
                <option>3-10 Lakhs</option>
                <option>10-25 Lakhs</option>
                <option>25-40 Lakhs</option>
                <option>40-70 Lakhs</option>
                <option>70-100 Lakhs</option>
            </select>
            <input placeholder="Search Company Name" name="Company_Name" onChange={handleChange} onClick={handleSearch} value={JobCriteria.Company_Name} className="Selectab" />
        </div>
    );
};

export default SearchBar;
