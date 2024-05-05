// Import necessary libraries
import React from "react";
import "../styles/Shimmer.css";

// Define the Shimmer component
const Shimmer = () => {
 return (
   <div className="Shimmers">
     {Array(4)
       .fill("")
       .map((_, index) => (
         // Individual card structure
         <div className="cards" key={index}>
           <div className="image shimmer"></div>
           <div className="info">
             <div className="heading shimmer"></div>
             <div className="heading shimmer"></div>
             <div className="heading shimmer last_container"></div>
             <div className="heading shimmer last_container"></div>
           </div>
         </div>
       ))}
   </div>
 );
};

// Export the Shimmer component as the default
export default Shimmer;
