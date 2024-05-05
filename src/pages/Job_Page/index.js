import React, { useState, useEffect } from 'react';
import Index from "../SearchBar/Index";
import JobCard from '../../Components/Job_Card';
import "../../styles/Job_Page.css";
import ShimmerBoxes from '../../Components/Shimmer_UI';

const JobTable = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [originalData, setOriginalData] = useState([]);

    const handleInfiniteScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const fetchJobs = async (pageNumber) => {
        try {
            const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    limit: (page===1?page* 12:(page-1)*12),
                    offset: ((page-1)*12),
                })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            if (pageNumber === 1) {
                setJobs(data.jdList);
                setOriginalData(data.jdList);
            } else {
                setJobs(prevJobs => [...prevJobs, ...data.jdList]);
                setOriginalData(prevData => [...prevData, ...data.jdList]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const jobFilter = ({ Role, Remote, Company_Name }) => {
        let filteredData = [...originalData];
        if (Role) {
            filteredData = filteredData.filter(item => item.jobRole.toLowerCase() === Role.toLowerCase());
        }
        if (Remote) {
            filteredData = filteredData.filter(item => item.location.toLowerCase() === Remote.toLowerCase());
        }
        if (Company_Name) {
            filteredData = filteredData.filter(item => item.companyName.toLowerCase() === Company_Name.toLowerCase());
        }
        setJobs(filteredData);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }, []); // Add event listener on mount and remove on unmount

    useEffect(() => {
        fetchJobs(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]); // Fetch data when page number changes

    return (
        <>
            <Index JobFilter={jobFilter} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='Container'>
                {loading ? (
                    <p><ShimmerBoxes/></p>
                ) : (<div>
                    {jobs.length===0?<div>
                        <h1>!Not Found</h1>
                        </div>:
                    <div className="Inside_Container">
                        {jobs.map((job, index) => (
                            <div key={index} className='Container'><JobCard job={job} index={index}/></div>
                        ))}
                    </div>
}</div>)}
            </div>
        </>
    );
};

export default JobTable;
