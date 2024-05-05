import React, { useEffect, useState } from "react";
import "../../styles/search.css";

// SearchBar component for filtering job criteria
const SearchBar = (props) => {
    // State to hold job criteria
    const [jobCriteria, setJobCriteria] = useState({
        Role: "",
        Salary_Currency: "",
        Min_Experience: "",
        Remote: "",
        Min_Salary: "",
        Company_Name: "",
    });

    // Handler for input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Updating job criteria state
        setJobCriteria((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handler for search button click
    const handleSearch = async () => {
        await props.JobFilter(jobCriteria); // Calling parent component's filter function
    };

    // Effect to trigger search after a short delay when Company_Name changes
    useEffect(() => {
        let timerOut = setTimeout(() => {
            props.JobFilter(jobCriteria); // Calling parent component's filter function
        }, 800);
        return () => clearTimeout(timerOut); // Clearing timeout to avoid memory leaks
    }, [jobCriteria.Company_Name]); // Dependency array to run the effect only when Company_Name changes

    // JSX for SearchBar component
    return (
        <div className="Search_Container">
            {/* Dropdown for selecting job role */}
            <select name="Role" onChange={handleChange} onClick={handleSearch} value={jobCriteria.Role} className="Selectab">
                <option value="">Roles</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Tech Lead">Tech Lead</option>
                <option value="Android">Android</option>
                <option value="IOS">IOS</option>
            </select>
            {/* Dropdown for selecting minimum experience */}
            <select name="Min_Experience" onChange={handleChange} onClick={handleSearch} value={jobCriteria.Min_Experience} className="Selectab">
                <option value="">Min Experience</option>
                <option value="0">Intern</option>
                <option value="2">Entry Level</option>
                <option value="3">Associate</option>
                <option value="4">Senior</option>
                <option value="6">Director</option>
            </select>
            {/* Dropdown for selecting salary currency */}
            <select name="Salary_Currency" onChange={handleChange} onClick={handleSearch} value={jobCriteria.Salary_Currency} className="Selectab">
                <option value="">Salary Currency</option>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
            </select>
            {/* Dropdown for selecting job location */}
            <select name="Remote" onChange={handleChange} onClick={handleSearch} value={jobCriteria.Remote} className="Selectab">
                <option value="">Location</option>
                <option value="on-Site">on-Site</option>
                <option value="Remote">Remote</option>
            </select>
            {/* Dropdown for selecting minimum salary */}
            <select name="Min_Salary" onChange={handleChange} onClick={handleSearch} value={jobCriteria.Min_Salary} className="Selectab">
                <option value="">Minimum Salary</option>
                <option value="25">25 Lakhs</option>
                <option value="40">40 Lakhs</option>
                <option value="70">70 Lakhs</option>
                <option value="100">100 Lakhs</option>
            </select>
            {/* Input for searching company name */}
            <input placeholder="Search Company Name" name="Company_Name" onChange={handleChange} onClick={handleSearch} value={jobCriteria.Company_Name} className="Selectab" />
        </div>
    );
};

export default SearchBar;