import { useState, useEffect } from "react";

const useJobData = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [originalData, setOriginalData] = useState([]);

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

  const filterJobs = ({
    Role,
    Remote,
    Company_Name,
    Experience,
    No_Of_Employee,
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
    if (Experience) {
      filteredData = filteredData.filter((item) => item);
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

