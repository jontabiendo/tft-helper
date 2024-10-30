import React from "react";
import { useSelector } from "react-redux";

function RecentStats({rankedStats}) {
  
  return (
    <div id="recent-stats-div">
      <h4>Recent 20 Games<span> (FeatureComing Soon)</span></h4>
      <div id="stat-sections-container">
        <div className="stat-section-div">
          <h6>Champions</h6>
        </div>
        <div className="stat-section-div">
          <h6>Traits</h6>
        </div>
        <div className="stat-section-div">
          <h6>Augments</h6>
        </div>
      </div>
    </div>
  )
};

export default RecentStats;