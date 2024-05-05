import { useState, useEffect } from "react";

/**
* Custom hook to fetch and filter job data
* @returns {Object} Containing job data, loading state, page number, fetch function, and filter function
*/
const useJobData = () => {
 const [jobs, setJobs] = useState([]); // State for job data
 const [loading, setLoading] = useState(true); // Loading state
 const [page, setPage] = useState(1); // Current page number
 const [originalData, setOriginalData] = useState([]); // Original job data

 /**
  * Function to fetch jobs based on the page number
  * @param {number} pageNumber - The page number to fetch
  */
 const fetchJobs = async (pageNumber) => {
   try {
     const response = await fetch(
       "https://api.weekday.technology/adhoc/getSampleJdJSON",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           limit: pageNumber === 1 ? pageNumber * 12 : (pageNumber - 1) * 12,
           offset: (pageNumber - 1) * 12,
         }),
       }
     );

     if (!response.ok) {
       throw new Error("Failed to fetch data");
     }

     const data = await response.json();
     if (pageNumber === 1) {
       setJobs(data.jdList);
       setOriginalData(data.jdList);
     } else {
       setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
       setOriginalData((prevData) => [...prevData, ...data.jdList]);
     }
     setLoading(false);
   } catch (error) {
     console.error("Error fetching data:", error);
   }
 };

 /**
  * Function to filter jobs based on given criteria
  * @param {Object} filters - Object containing filtering criteria
  */
 const filterJobs = ({
   Role,
   Remote,
   Company_Name,
   Min_Experience,
   Salary_Currency,
   Min_Salary,
 }) => {
   let filteredData = [...originalData];

   if (Role) {
     filteredData = filteredData.filter(
       (item) => item.jobRole.toLowerCase() === Role.toLowerCase()
     );
   }

   if (Remote) {
     if (Remote === "Remote") {
       filteredData = filteredData.filter((item) =>
         item.location.toLowerCase().includes(Remote.toLowerCase())
       );
     } else {
       filteredData = filteredData.filter(
         (item) => item.location.toLowerCase() !== "remote"
       );
     }
   }

   if (Salary_Currency) {
     filteredData = filteredData.filter((item) =>
       item.salaryCurrencyCode.toLowerCase().includes(Salary_Currency.toLowerCase())
     );
   }

   if (Min_Experience) {
     filteredData = filteredData.filter(item => item.minExp !== null && item.minExp >= Min_Experience);
   }

   if (Min_Salary) {
     filteredData = filteredData.filter(item => item.minJdSalary !== null && item.minJdSalary >= Min_Salary);
   }

   if (Company_Name) {
     filteredData = filteredData.filter(
       (item) => item.companyName.toLowerCase() === Company_Name.toLowerCase()
     );
   }

   setJobs(filteredData);
 };

 useEffect(() => {
   fetchJobs(page);
 }, [page]);

 return { jobs, loading, page, fetchJobs, filterJobs };
};

export default useJobData;