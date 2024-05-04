import { useState, useEffect } from 'react';

const useJobListings = () => {
    const [jobListings, setJobListings] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchJobListings = async () => {
        try {
            const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    limit: 10,
                    offset: (page - 1) * 10 // Adjust offset based on page number
                })
            });
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setJobListings(prevListings => [...prevListings, ...data]);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleInfiniteScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            setLoading(true);
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        fetchJobListings();
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }, []);

    return { jobListings, loading };
};

export default useJobListings;
