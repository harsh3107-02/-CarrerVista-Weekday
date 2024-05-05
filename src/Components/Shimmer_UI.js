import React from "react";
import "../styles/Shimmer.css";

const Shimmer = () => {
  return (
    <div className="Shimmers">
      {Array(12)
        .fill("")
        .map((_, index) => (
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

export default Shimmer;
