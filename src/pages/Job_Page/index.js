import React, { useEffect } from "react";
import Index from "../SearchBar/Index";
import JobCard from "../../Components/Job_Card";
import "../../styles/Job_Page.css";
import ShimmerBoxes from "../../Components/Shimmer_UI";
import useJobData from "../../utils/hooks/useFetchJobs";

// Define the JobTable functional component
const JobTable = () => {
  // Destructure values from the custom hook useJobData
  const { jobs, loading, fetchJobs, filterJobs } = useJobData();

  // Add an event listener for infinite scrolling when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  // Function to fetch more jobs when reaching the bottom of the page
  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      fetchJobs();
    }
  };

  // Render Index component with filtering functionality
  // Render loading shimmer effect while fetching data
  // Render job cards for each job received
  return (
    <>
      <Index JobFilter={filterJobs} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="Container"
      >
        {loading ? (
          <p>
            <ShimmerBoxes />
          </p>
        ) : (
          <div>
            {jobs.length === 0 ? (
              <div>
                <h1>!Not Found</h1>
              </div>
            ) : (
              // Map through the jobs array and render JobCard component
              <div className="Inside_Container">
                {jobs.map((job, index) => (
                  <div key={index} className="Container">
                    <JobCard job={job} index={index} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};


export default JobTable;
