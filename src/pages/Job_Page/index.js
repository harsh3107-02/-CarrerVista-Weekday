import React, { useState, useEffect } from 'react';
import Index from "../SearchBar/Index";
import JobCard from '../../Components/Job_Card';
import "../../styles/Job_Page.css"
import ShimmerBoxes from '../../Components/Shimmer_UI';

const JobTable = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [OriginalData,Set_OriginalData]=useState([])

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        limit: 20,
                        offset: 2
                    })
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                setJobs(data.jdList);
                Set_OriginalData(data.jdList)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchJobs();
    }, []);

    const JobFilter = ({Role,Remote,Company_Name}) => {

        let filteredData = [...OriginalData]; // Cloning the jobs array
    
        if (Role) {
            filteredData = filteredData.filter(item => item.jobRole.toLowerCase() === Role.toLowerCase());
        }
    
        if (Remote) {
            filteredData = filteredData.filter(item => item.location.toLowerCase() === Remote.toLowerCase());
        }
        if(Company_Name){
            filteredData=filteredData.filter(item=>item.companyName.toLowerCase()===Company_Name.toLowerCase())
        }
    
        return setJobs(filteredData);
    }


    return (
        <>
            <Index JobFilter={JobFilter} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {loading ? (
                <p><ShimmerBoxes/></p>
            ) : (
                <div className="Inside_Container">
                        {jobs.map(job => (
                            <div className='Container'><JobCard job={job}/></div>
                        ))}
                    </div>
            )}
        </div>
        </>
    );
};

export default JobTable;
